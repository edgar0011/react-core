// @flow

import React, { PureComponent } from 'react'
import { memoize } from 'lodash'
import type { ComponentType, Node } from 'react'
import type { OptionType } from './Option'
import type { HeadlessRender } from '../common/HeadlessComponentBase'

export type OptionsType = Array<OptionType>

type SwitchPropTypes = {
  options?: ?OptionsType,
  disabled?: boolean,
  onChange?: (id: number, options: OptionsType | Array<any>) => void,
  multiple?: boolean,
  unselectable?: boolean,
  components?: {
    OptionComponent?: ComponentType<any>,
    option?: HeadlessRender
  },
  minValue?: number
} & HeadlessRender

type State = {
  options?: ?OptionsType,
  clickHash?: ?string
}

/**
 * @class
 * @name Switch
 * @classdesc Displays switch component.
 * @extends PureComponent
 *
 * @prop {function} render Render function must be specified unless RenderComponent is specified.
 * @prop {ComponentType} RenderComponent Render component must be specified unless render function is specified.
 * @prop {Array<{ label: string, selected: boolean, totalNum: number, onClick: function }>}
 *  options Options data container.
 * @prop {boolean} disabled Disabled flag.
 * @prop {function} onChange Change event handler.
 * @prop {boolean} multiple View variations flag.
 * @prop {boolean} unselectable View variations flag.
 * @prop {Object} components Render configuration container.
 * @prop {any} components.OptionComponent Option render component.
 * @prop {Object} components.option Option render configuration container.
 * @prop {function} components.option.render Option render function.
 * @prop {any} components.option.RenderComponent Option render component.
 */
export default class Switch extends PureComponent<SwitchPropTypes, State> {

  static defaultProps = {
    unselectable: true
  }

  constructor(props: SwitchPropTypes) {
    super(props)
    this.memoizedClickHandler = memoize(this.clickHandler)
    this.state = { options: this.checkMultipleAndSelections(this.props.options) }
  }

  state = {
    options: null
  }


  /**
   * Component componentWillReceiveProps lifecycle hook.
   * @memberOf Switch
   * @method Switch#componentWillReceiveProps
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps: SwitchPropTypes): void {
    this.setState(prevState => ({ ...prevState, options: this.checkMultipleAndSelections(nextProps.options) }))
  }

  props: SwitchPropTypes
  memoizedClickHandler: Function

  /**
   * Checks multiple and selections.
   * @memberOf Switch
   * @method Switch#checkMultipleAndSelections
   * @function checkMultipleAndSelections
   * @param {Object} options
   * @returns {Object[]}
   */
  checkMultipleAndSelections = (options?: ?OptionsType): ?OptionsType => {
    let newOptions = options
    if (!this.props.multiple && newOptions && options) {
      let firstSelectionFound
      newOptions = options.map(option => {
        const newOption = option
        if (newOption.selected) {
          if (!firstSelectionFound) {
            firstSelectionFound = true
          } else {
            newOption.selected = false
          }
        }
        return newOption
      })
    }
    return newOptions
  }

  /**
   * Option click handler.
   * @memberOf Switch
   * @method Switch#clickHandler
   * @function clickHandler
   * @param {string|number} id Option identifier.
   * @returns {function}
   */
  clickHandler = (id: number) => () => {
    const options = this.state.options || []

    if (!this.props.unselectable && options && options[id].selected) {
      return
    }

    options[id] = { ...options[id], selected: !options[id].selected }

    if (!this.props.multiple) {
      options.forEach(
        (option, index) => {
          if (index !== id) {
            options[index] = !option.selected ? option : { ...options[index], selected: false }
          }
        }
      )
    }

    const minValue = this.props.minValue
    if (minValue !== undefined && minValue !== null && !isNaN(minValue) && !options.find(option => option.selected)) {
      options[minValue] = { ...options[minValue], selected: true }
    }

    const clickHash = options.map(({ selected }) => selected).join('-')
    this.setState((prevState: State) => ({ ...prevState, options, clickHash }))
    this.props.onChange && this.props.onChange(id, options)
  }

  /**
   * Component render function.
   * @memberOf Switch
   * @method Switch#render
   * @returns {*}
   */
  render() {
    const { options, clickHash }: State = this.state
    const { render, RenderComponent,
      unselectable, multiple, onChange, minValue, ...props }: SwitchPropTypes = this.props

    let rendered: Node
    if (render) {
      rendered = render({ ...props, clickHash, clickHandler: this.memoizedClickHandler, options })
    } else {
      rendered = RenderComponent ? (
        <RenderComponent
          {...props}
          options={options}
          clickHash={clickHash}
          clickHandler={this.memoizedClickHandler}
        />
      ) : null
    }
    return rendered
  }
}
