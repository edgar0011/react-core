// @flow

import React, { PureComponent } from 'react'
import type { SwitchInputPropTypes } from './SwitchInput'
import SwitchInput from './SwitchInput'

type SwitchInputListPropTypes = SwitchInputPropTypes

/**
 * @class
 * @name SwitchInputList
 * @classdesc Displays switch input list.
 * @extends PureComponent
 *
 * @prop {function} render Render function must be specified unless RenderComponent is specified.
 * @prop {ComponentType} RenderComponent Render component must be specified unless render function is specified.
 * @prop {string|number|string[]|number[]} value Value.
 * @prop {Array<{ label: string, selected: boolean, totalNum: number, onClick: function, value: string|number }>}
 *  options Options data container.
 * @prop {boolean} disabled Disabled flag.
 * @prop {function} onChange Change event handler.
 * @prop {boolean} multiple View variations flag.
 * @prop {Object} components Render configuration container.
 * @prop {Object} components.option Option render configuration container.
 * @prop {function} components.option.render Option render function.
 * @prop {any} components.option.RenderComponent Option render component.
 */
export default class SwitchInputList extends PureComponent<SwitchInputListPropTypes> {
  constructor(props: SwitchInputListPropTypes) {
    super(props)
  }

  props: SwitchInputListPropTypes
  /**
   * Component render function.
   * @memberOf SwitchInputList
   * @method SwitchInputList#render
   * @returns {*}
   */
  render() {
    const { options, ...props }: SwitchInputListPropTypes = this.props
    const mappedOptions = options && options.map(option => ({ ...option, bordered: true }))
    return (
      <SwitchInput
        options={mappedOptions}
        style={{ margin: '10px' }}
        styleOption={{ margin: '10px', padding: '5px' }}
        {...props}
      />
    )
  }
}
