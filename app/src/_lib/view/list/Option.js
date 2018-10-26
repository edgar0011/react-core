// @flow

import React, { PureComponent } from 'react'
import type { Node } from 'react'
import type { HeadlessRender } from '../common/HeadlessComponentBase'

export type OptionType = {
  label: string,
  selected?: boolean,
  totalNum: ?number
}

type OptionProps = {
  option: OptionType,
  disabled: ?boolean,
  onClick: ?Function } & HeadlessRender
/**
 * @class
 * @name Option
 * @desc Displays single option.
 * @extends PureComponent
 *
 * @prop {?Function} render Render function must be specified unless RenderComponent is specified.
 * @prop {?React.ComponentType} RenderComponent Render component must be specified unless render function is specified.
 * @prop {Object} option Option data.
 * @prop {string} option.label Label text.
 * @prop {?boolean} option.selected Selected flag.
 * @prop {?number} option.totalNum Total number of options.
 * @prop {?boolean} disabled Option being disabled flag.
 * @prop {?Function} onClick Click event handler.
 */
export default class Option extends PureComponent<OptionProps, any> {

  constructor(props: OptionProps) {
    super(props)
  }

  props: OptionProps

  /**
   * Component render function.
   * @memberOf Option
   * @method Option#render
   * @returns {*}
   */
  render() {
    const { render, RenderComponent, option, ...props }: OptionProps = this.props
    let rendered: Node
    if (render) {
      rendered = render(props)
    } else {
      rendered = RenderComponent ? <RenderComponent {...option} {...props} /> : null
    }
    return rendered
  }
}
