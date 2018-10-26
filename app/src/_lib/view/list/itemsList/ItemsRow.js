// @flow
import React, { PureComponent } from 'react'
import type { Node } from 'react'

import type { HeadlessRender } from '../../common/HeadlessComponentBase'

export type Row = {
  id: number,
  key: number | string,
  items?: Array<Object>,
  align?: string,
  size?: number | string,
  demi?: boolean,
  bolder?: boolean,
  content?: boolean,
  justify?: boolean,
  header?: boolean,
  desktop?: boolean,
  tablet?: boolean,
  selected?: boolean,
  selectable?: boolean
}

export type ItemsRowProps = Row & HeadlessRender
/**
 * @class
 * @name ItemsRow
 * @classdesc Displays items as horizontal row.
 * @extends PureComponent
 *
 * @prop {function} render Render function must be specified unless RenderComponent is specified.
 * @prop {ComponentType} RenderComponent Render component must be specified unless render function is specified.
 * @prop {number|string} size View variations setting.
 * @prop {boolean} demi View variations flag.
 * @prop {boolean} bolder View variations flag.
 * @prop {boolean} content View variations flag.
 * @prop {boolean} justify View variations flag.
 * @prop {boolean} header View variations flag.
 * @prop {boolean} desktop View variations flag.
 * @prop {boolean} tablet View variations flag.
 * @prop {boolean} selected View variations flag.
 * @prop {boolean} selectable View variations flag.
 */
class ItemsRow extends PureComponent<ItemsRowProps> {

  constructor(props: ItemsRowProps) {
    super(props)
  }

  props: ItemsRowProps

  /**
   * Component render function.
   * @memberOf ItemsRow
   * @method ItemsRow#render
   * @returns {*}
   */
  render() {
    const { render, RenderComponent, ...props }: ItemsRowProps = this.props

    let rendered: Node
    if (render) {
      rendered = render(props)
    } else {
      rendered = RenderComponent ? <RenderComponent {...props} /> : null
    }
    return rendered
  }
}

export default ItemsRow
