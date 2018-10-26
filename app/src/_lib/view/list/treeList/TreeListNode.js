import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// TODO: move to core-fe
/**
 * @class
 * @name TreeListNode
 * @desc Tree List Node component.
 * @prop {Object} node Required node to display.
 * @prop {number} treeNodePadding Widht of three node padding and padding of nested tree nodes.
 * @prop {function} onArrowClick Event handler for collapsible Arrow click event.
 * @prop {function} onCheckboxClick Event handler for Checkbox click event - only in editable mode.
 * @prop {function} render Render function must be specified unless RenderComponent is specified.
 * @prop {ComponentType} RenderComponent Render component must be specified unless render function is specified.
 */
class TreeListNode extends PureComponent {
  static propTypes = {
    node: PropTypes.object.isRequired,
    treeNodePadding: PropTypes.number,
    onArrowClick: PropTypes.func,
    onCheckboxClick: PropTypes.func,
    render: PropTypes.func,
    RenderComponent: PropTypes.any
  }
  static defaultProps = {
    treeNodePadding: 0
  }

  arrowClickHandler = (node) => (event) => {
    const { onArrowClick } = this.props

    if (onArrowClick) {
      onArrowClick(node.id, node, event)
    }
  }

  checkboxClickHandler = (node) => (id, value) => {
    const { onCheckboxClick } = this.props

    if (onCheckboxClick) {
      onCheckboxClick(node, id, value)
    }
  }

  render() {
    const { render, RenderComponent, ...props } = this.props

    let rendered
    if (render) {
      rendered = render({
        arrowClickHandler: this.arrowClickHandler,
        checkboxClickHandler: this.checkboxClickHandler,
        ...props })
    } else {
      rendered = (
        <RenderComponent
          arrowClickHandler={this.arrowClickHandler}
          checkboxClickHandler={this.checkboxClickHandler}
          {...props}
        />
      )
    }
    return rendered
  }
}

export default TreeListNode
