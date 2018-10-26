import React, { PureComponent } from 'react'

export const withDefaultProps = (defaultProps, clazz) => class extends clazz {
  static defaultProps = {
    ...clazz.defaultProps,
    ...defaultProps
  }
  static propTypes = clazz.propTypes
  props = clazz.props
}

export const withDefaultPropsFuncComponent = (defaultProps, funcComponent) => function withProps(props) {
  /* eslint no-param-reassign:0 */
  funcComponent.defaultProps = funcComponent.defaultProps || {}
  funcComponent.defaultProps = { ...funcComponent.defaultProps, ...defaultProps }
  return funcComponent(props)
}

export const withDefaultPropsComponent = (defaultProps, Component) => class extends PureComponent {
  static defaultProps = {
    ...Component.defaultProps,
    ...defaultProps
  }

  render() {
    return <Component {...this.props} />
  }
}
