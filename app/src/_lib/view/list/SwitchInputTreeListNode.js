// @flow

import React, { PureComponent } from 'react'
import type { Node } from 'react'
import type { HeadlessRender } from '../common/HeadlessComponentBase'
import type { OptionTypesWithValue, ValuesType } from './SwitchInput'

import SwitchInputList from './SwitchInputList'

type SwitchInputTreeListNodeProps = {
  key: string | number,
  nodeLabel: string,
  options: ?OptionTypesWithValue,
  value?: ValuesType,
  components: {
    option: HeadlessRender,
    select: HeadlessRender
  },
  onChange: ({ target: { value: ?any }}) => void
}
/**
 * @class
 * @name SwitchInputTreeListNode
 * @classdesc Switch input tree list node.
 * @extends PureComponent
 *
 * @prop {function} render Render function must be specified unless RenderComponent is specified.
 * @prop {ComponentType} RenderComponent Render component must be specified unless render function is specified.
 * @prop {string} nodeLabel Node label text.
 * @prop {Object} components Render configuration container.
 * @prop {Object} components.option Option render configuration container.
 * @prop {function} components.option.render Option render function.
 * @prop {any} components.option.RenderComponent Option render component.
 * @prop {Object} components.select Select render configuration container.
 * @prop {function} components.select.render Select render function.
 * @prop {any} components.select.RenderComponent Select render component.
 */
export default class SwitchInputTreeListNode extends PureComponent<SwitchInputTreeListNodeProps> {

  constructor(props: SwitchInputTreeListNodeProps) {
    super(props)
  }

  props: SwitchInputTreeListNodeProps

  /**
   * Click handler for switching selected options.
   * @memberOf SwitchInputTreeListNode
   * @method SwitchInputTreeListNode#clickHandler
   * @param {*} selected Selected flag.
   */
  clickHandler = (selected: boolean) => {
    if (this.props.options) {
      this.props.onChange({ target: { value: selected ? [] : this.props.options.map(opt => opt.value) } })
    }
  }

  /**
   * Component render function.
   * @memberOf SwitchInputTreeListNode
   * @method SwitchInputTreeListNode#render
   * @returns {*}
   */
  render() {
    const {
      nodeLabel, value, options, components: { select: { render, RenderComponent } }, ...props
    }: SwitchInputTreeListNodeProps = this.props

    const allSelected = options && value ? value.length === options.length : false

    let renderedSelect: Node
    const selectProps = {
      bordered: true,
      selected: allSelected,
      label: nodeLabel,
      onClick: this.clickHandler,
      style: { margin: '10px', marginRight: '0', padding: '5px' }
    }
    if (render) {
      renderedSelect = render(selectProps)
    } else {
      renderedSelect = RenderComponent ? <RenderComponent {...selectProps} /> : null
    }

    return (
      <div style={{ width: '100%' }}>
        <div>
          {renderedSelect}
        </div>
        <div style={{ paddingLeft: '20px' }}>
          <SwitchInputList
            {...props}
            multiple
            options={options}
            value={value}
          />
        </div>
      </div>
    )
  }
}
