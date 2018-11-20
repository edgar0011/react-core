// @flow
import React, { PureComponent } from 'react'
import type { Node } from 'react'
import type { HeadlessRender } from '../../common/HeadlessComponentBase'
import type { DataItem } from './TreeList'


type TreeListNodeListProps = {
  data: ?Array<DataItem>
} & HeadlessRender

/**
 * @class
 * @name TreeListNodeList
 * @desc Tree List Node List component.
 * @prop {Object[]} data Required nodes to display.
 * @prop {function} render Render function must be specified unless RenderComponent is specified.
 * @prop {ComponentType} RenderComponent Render component must be specified unless render function is specified.
 */
export default class TreeListNodeList extends PureComponent<TreeListNodeListProps> {

  props: TreeListNodeListProps

  render() {
    const { render, RenderComponent, ...props }: TreeListNodeListProps = this.props

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
