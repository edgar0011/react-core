// @flow

import React, { PureComponent } from 'react'
import type { ComponentType } from 'react'
import type { HeadlessRender } from '../common/HeadlessComponentBase'

import Switch from './Switch'
import type { OptionType } from './Option'

export type ValueType = string | number
export type ValuesType = Array<ValueType>

export type OptionTypeWithValue = OptionType & { value: ValueType }
export type OptionTypesWithValue = Array<OptionTypeWithValue>

export type SwitchInputPropTypes = {
  value?: ValueType | ValuesType,
  options: ?OptionTypesWithValue,
  disabled?: boolean,
  onChange?: ({ target: { value: ?(ValueType | ValuesType)}}) => void,
  multiple?: boolean,
  components?: {
    OptionComponent?: ComponentType<any>,
    option?: HeadlessRender
  }
} & HeadlessRender
/**
 * @class
 * @name SwitchInput
 * @classdesc Displays switch input component.
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
export default class SwitchInput extends PureComponent<SwitchInputPropTypes> {
  constructor(props: SwitchInputPropTypes) {
    super(props)
  }

  props: SwitchInputPropTypes

  /**
   * Switch selected flag of option object by comparing value.
   * @memberOf SwitchInput
   * @method SwitchInput#optionsByValue
   * @param {string|number} value Value to be compared for selection.
   * @param {Object[]} options Available options list data.
   * @returns {Object[]}
   */
  optionsByValue = (value: ValueType, options: OptionTypesWithValue): OptionTypesWithValue => options.map(option => {
    if (option.value === value) {
      return { ...option, selected: true }
    }
    return { ...option, selected: false }
  })

  /**
   * Switch selected flag of option object by comparing array of possible values.
   * @memberOf SwitchInput
   * @method SwitchInput#optionsByValues
   * @param {string[]|number[]} values Value to be compared for selection.
   * @param {Object[]} options Available options list data.
   * @returns {Object[]}
   */
  optionsByValues = (values: ValuesType, options: OptionTypesWithValue): OptionTypesWithValue => options.map(option => {
    if (values.indexOf(option.value) > -1) {
      return { ...option, selected: true }
    }
    return { ...option, selected: false }
  })

  /**
   * Selected options change handler.
   * @memberOf SwitchInput
   * @method SwitchInput#changeHandler
   * @param {string|number} id Identifier.
   * @param {Object[]} options Available options list data.
   */
  changeHandler = (id: number, options: OptionTypesWithValue | Array<any>): void => {
    let foundSelected: ?(ValueType | ValuesType)
    let found: ?OptionTypesWithValue
    let foundOne: ?OptionTypeWithValue
    if (this.props.multiple) {
      found = options.filter((item: OptionTypeWithValue) => item.selected)
      if (found) {
        foundSelected = found.map(({ value }: OptionTypeWithValue) => (value: ValueType))
      }
    } else {
      foundOne = options.find((item: OptionTypeWithValue) => item.selected)
      if (foundOne) {
        foundSelected = foundOne.value
      }
    }
    this.props.onChange && this.props.onChange({ target: { value: foundSelected } })
  }

  /**
   * Component render function.
   * @memberOf SwitchInput
   * @method SwitchInput#render
   * @returns {*}
   */
  render() {
    const { options, value, onChange, ...props }: SwitchInputPropTypes = this.props
    let resolvedOptions: ?OptionTypesWithValue
    if (options) {
      if (Array.isArray(value)) {
        resolvedOptions = this.optionsByValues((value: ValuesType), options)
      } else {
        resolvedOptions = value ? this.optionsByValue(value, options) : null
      }
    }
    const mappedOptions: ?Array<OptionType>
      = resolvedOptions ? resolvedOptions.map((option: OptionTypeWithValue) => (option: OptionType)) : null
    return (
      <Switch options={mappedOptions} {...props} onChange={this.changeHandler} />
    )
  }
}
