// @flow

import React, { PureComponent } from 'react'
import type { Node } from 'react'
import type { HeadlessRender } from '../../common/HeadlessComponentBase'
import type { DataItem } from './TreeList'

//TODO Podlipny ?
type NodeType = DataItem

type TreeListNodeProps = {
  node: NodeType,
  treeNodePadding?: number,
  onArrowClick?: Function,
  onCheckboxClick?: Function,
} & HeadlessRender

/**
 * @class
 * @name TreeListNode
 * @desc Tree List Node component.
 * @prop {NodeType} node Required node to display.
 * @prop {number} treeNodePadding Widht of three node padding and padding of nested tree nodes.
 * @prop {function} onArrowClick Event handler for collapsible Arrow click event.
 * @prop {function} onCheckboxClick Event handler for Checkbox click event - only in editable mode.
 * @prop {function} render Render function must be specified unless RenderComponent is specified.
 * @prop {ComponentType} RenderComponent Render component must be specified unless render function is specified.
 */
class TreeListNode extends PureComponent<TreeListNodeProps> {
  /*static propTypes = {
    node: PropTypes.object.isRequired,
    treeNodePadding: PropTypes.number,
    onArrowClick: PropTypes.func,
    onCheckboxClick: PropTypes.func,
    render: PropTypes.func,
    RenderComponent: PropTypes.any
  }*/

  static defaultProps = {
    treeNodePadding: 0
  }

  arrowClickHandler = (node: NodeType) => (event: SyntheticEvent<EventTarget>) => {
    const { onArrowClick } = this.props

    if (onArrowClick) {
      onArrowClick(node.id, node, event)
    }
  }

  checkboxClickHandler = (node: NodeType) => (id: number | string, value: any) => {
    const { onCheckboxClick } = this.props

    if (onCheckboxClick) {
      onCheckboxClick(node, id, value)
    }
  }

  render() {
    const { render, RenderComponent, ...props }: TreeListNodeProps = this.props

    let rendered: Node
    if (render) {
      rendered = render({
        arrowClickHandler: this.arrowClickHandler,
        checkboxClickHandler: this.checkboxClickHandler,
        ...props })
    } else {
      rendered = RenderComponent ? (
        <RenderComponent
          arrowClickHandler={this.arrowClickHandler}
          checkboxClickHandler={this.checkboxClickHandler}
          {...props}
        />
      ) : null
    }
    return rendered
  }
}

export default TreeListNode
