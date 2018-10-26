// @flow

import React, { PureComponent } from 'react'
import type { ComponentType, Node } from 'react'

export type HeadlessRender = {
  render?: (props?: Object) => Node,
  RenderComponent?: ComponentType<any>
}

class HeadlessComponentBase extends PureComponent<HeadlessRender> {
  props: HeadlessRender

  render() {
    const { render, RenderComponent, ...props } = this.props

    let rendered: Node
    if (render) {
      rendered = render(props)
    } else {
      rendered = RenderComponent ? <RenderComponent {...props} /> : null
    }
    return rendered
  }
}

export default HeadlessComponentBase
