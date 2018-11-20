// @flow
import React, { PureComponent } from 'react'
import type { Element, ComponentType, Node } from 'react'
import type { HeadlessRender } from '../common/HeadlessComponentBase'

type ComponentWithLabel = {
  label: string,
  component?: ComponentType<any>
}
type ActionGroupProps = {
  data: Array<ComponentWithLabel>,
  preData: Array<ComponentWithLabel>,
  postData: Array<ComponentWithLabel>,
  resolveButton: (props: ?Object) => ComponentType<any>,
  justify?: string
} & HeadlessRender

type PassProps = {
  data: Array<ComponentWithLabel>,
  preData: Array<ComponentWithLabel>,
  postData: Array<ComponentWithLabel>,
  justify?: string,
  buttons: Array<Element<any>>
}
/**
 * @class
 * @name ActionGroup
 * @classdesc Displays row of buttons typically within a form.
 * @extends PureComponent
 *
 * @prop {function} render Render function must be specified unless RenderComponent is specified.
 * @prop {ComponentType} RenderComponent Render component must be specified unless render function is specified.
 * @prop {Array<{ label: string }>} data Buttons configuration data.
 * @prop {Array<{ label: string, Component: any }>} preData List od items to be displayed before buttons.
 * @prop {Array<{ label: string, Component: any }>} postData List od items to be displayed after buttons.
 * @prop {function} resolveButton Button type resolver function.
 * @prop {string} justify View variations modifier.
 */
export default class ActionGroup extends PureComponent<ActionGroupProps> {

  constructor(props: ActionGroupProps) {
    super(props)
  }

  /**
   * Rendering nodes with appropriate button type render component.
   * @memberOf ActionGroup
   * @method ActionGroup#renderNodes
   * @param {Array<*>} buttonsData Buttons data.
   * @returns {Array<*>}
   */
  renderNodes = (buttonsData: Array<ComponentWithLabel>): Array<Element<any>> =>
    buttonsData.map(({ label, ...buttonProps }: { label: string, ...any}) => {
      const { resolveButton }: ActionGroupProps = this.props
      const Component: ComponentType<any> = resolveButton(buttonProps)
      const key: string = `${Component.toString()}-${label || buttonProps.title}`
      return <Component key={key} {...buttonProps} label={label} >{label}</Component>
    })

  /**
   * Component render function.
   * @memberOf ActionGroup
   * @method ActionGroup#render
   * @returns {*}
   */
  render() {
    const { data, render, RenderComponent, resolveButton, ...props }: ActionGroupProps = this.props
    const buttons: ?Array<Element<any>> = data && data.length ? this.renderNodes(data) : null
    if (!buttons) {
      return null
    }
    const passProps: PassProps = { buttons, data, ...props }
    let rendered: Node
    if (render) {
      rendered = render(passProps)
    } else {
      rendered = RenderComponent ? <RenderComponent {...passProps} /> : null
    }
    return rendered
  }
}
