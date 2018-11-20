// @flow

import React, { PureComponent } from 'react'
import type { Node } from 'react'
import type { HeadlessRender } from '../../common/HeadlessComponentBase'
import type { Column } from './TreeList'

type TreeListHeaderProps = {
  columns: Array<Column>,
  title?: string,
  nodeStyle?: Object,
  justify: string
} & HeadlessRender

/**
 * @class
 * @name TreeListHeader
 * @desc Tree List Header component.
 * @prop {Object[]} columns Required columns to display.
 * @prop {string} title Optional header title string.
 * @prop {object} nodeStyle Optional style of header node.
 * @prop {string} justify Optional flex justify representation.
 * @prop {function} render Render function must be specified unless RenderComponent is specified.
 * @prop {ComponentType} RenderComponent Render component must be specified unless render function is specified.
 */
export default class TreeListHeader extends PureComponent<TreeListHeaderProps> {

  static defaultProps = {
    title: ''
  }

  props: TreeListHeaderProps

  render() {
    const { render, RenderComponent, ...props }: TreeListHeaderProps = this.props

    let rendered: Node
    if (render) {
      rendered = render({ ...props })
    } else {
      rendered = RenderComponent ? (
        <RenderComponent
          {...props}
        />
      ) : null
    }
    return rendered
  }
}
