import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// TODO: move to core-fe
/**
 * @class
 * @name TreeListNodeList
 * @desc Tree List Node List component.
 * @prop {Object[]} data Required nodes to display.
 * @prop {function} render Render function must be specified unless RenderComponent is specified.
 * @prop {ComponentType} RenderComponent Render component must be specified unless render function is specified.
 */
export default class TreeListNodeList extends PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      label: PropTypes.string,
      collapsed: PropTypes.bool,
      columns: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object,
        PropTypes.string
      ])).isRequired,
      children: PropTypes.arrayOf(PropTypes.object)
    })).isRequired,
    render: PropTypes.func,
    RenderComponent: PropTypes.any
  }

  render() {
    const { render, RenderComponent, ...props } = this.props

    let rendered
    if (render) {
      rendered = render({ ...props })
    } else {
      rendered = (
        <RenderComponent
          {...props}
        />
      )
    }
    return rendered
  }
}
