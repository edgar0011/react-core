// @flow

import React, { PureComponent } from 'react'
import type { Node } from 'react'
import type { HeadlessRender } from '../common/HeadlessComponentBase'

type DetailWidgetCardRowProps = {
  opened?: boolean,
  collapsible?: boolean
} & HeadlessRender

type DetailWidgetCardRowViewProps = {
  isOpen?: boolean,
  clickHandler?: Function,
  opened?: boolean,
  collapsible?: boolean
}

type DetailWidgetCardRowState = {
  opened?: boolean,
  initialOpened?: boolean
}

/**
 * @class
 * @name DetailWidgetCardRow
 * @classdesc Displays detail data row.
 * @extends PureComponent
 *
 * @prop {function} render Render function must be specified unless RenderComponent is specified.
 * @prop {ComponentType} RenderComponent Render component must be specified unless render function is specified.
 * @prop {boolean} opened Flag for setting whether component is opened or collapsed on init.
 * @prop {boolean} collapsible Flag for rendering component as collapsible.
 */
class DetailWidgetCardRow extends PureComponent<DetailWidgetCardRowProps, DetailWidgetCardRowState> {

  constructor(props: DetailWidgetCardRowProps) {
    super(props)
    this.state = {
      opened: false,
      initialOpened: this.props.opened
    }
  }

  state: DetailWidgetCardRowState
  props: DetailWidgetCardRowProps

  /**
   * Click handler for switching opened state.
   * @memberOf DetailWidgetCardRow
   * @method DetailWidgetCardRow#clickHandler
   */
  clickHandler = () => {
    this.setState(prevState => ({
      opened: prevState.initialOpened ? false : !prevState.opened,
      initialOpened: false
    }))
  }

  /**
   * Component render function.
   * @memberOf DetailWidgetCardRow
   * @method DetailWidgetCardRow#render
   * @returns {*}
   */
  render() {
    const { render, RenderComponent, ...props }: DetailWidgetCardRowProps = this.props
    const { opened, initialOpened }: DetailWidgetCardRowState = this.state
    const isOpen: boolean = Boolean(opened || initialOpened)
    const viewProps: DetailWidgetCardRowViewProps = {
      isOpen,
      clickHandler: this.clickHandler,
      ...props
    }

    let rendered: Node
    if (render) {
      rendered = render(viewProps)
    } else {
      rendered = RenderComponent
        ? <RenderComponent {...viewProps} />
        : null
    }
    return rendered
  }
}

export default DetailWidgetCardRow
