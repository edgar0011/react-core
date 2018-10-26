import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// TODO: move to core-fe
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
export default class TreeListHeader extends PureComponent {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      label: PropTypes.string
    })).isRequired,
    title: PropTypes.string,
    nodeStyle: PropTypes.object,
    justify: PropTypes.string,
    render: PropTypes.func,
    RenderComponent: PropTypes.any
  }

  static defaultProps = {
    title: ''
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
