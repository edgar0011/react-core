// @flow
import React, { PureComponent } from 'react'
import type { Node, Element, ComponentType } from 'react'
import type { HeadlessRender } from '../../common/HeadlessComponentBase'

export type FormComponents = {
  FormComponent: ComponentType<any>,
  FormFieldComponent: ComponentType<any>,
  ActionGroupComponent: ComponentType<any>
}

export type FlexLayout = {
  direction?: string,
  align?: string,
  self?: string,
  justify?: string,
  size?: number | string,
  padding?: number | string,
  margin?: number | string,
  wrap?: boolean,
  width?: string,
  minWidth?: string,
  maxWidth?: string
}

export type FlexFieldLayout = FlexLayout & {
  minWidth?: string
}

export type Field = {
  name: string,
  label?: string,
  Component: ComponentType<any>,
  value: any,
  valueDecorator?: (value: any, field: Field) => any,
  onChange?: (name: string, newValue: any) => void,
  render?: Function
}

export type Error = {
  code: string,
  message?: string
}

export type Errors = Array<Error> | any

export type RenderFieldProps = {
  field: Field,
  flexFieldLayout: FlexFieldLayout,
  fieldValue: any,
  components: FormComponents,
  fields: Array<Field>
}

export type FormProps = {
  fields: Array<Field>,
  errors?: Errors,
  flexFieldLayout: FlexFieldLayout,
  components: FormComponents,
  renderFieldMethod: (props: RenderFieldProps) => Array<Element<any>>
} & HeadlessRender

// aka FormBody
class Form extends PureComponent<FormProps> {
  props: FormProps

  render() {
    const {
      fields, flexFieldLayout, errors, render, RenderComponent, renderFieldMethod, components, ...formProps
    }: FormProps = this.props

    const hasErrors = !!(errors && (errors.length || Object.values(errors).length))

    const fieldNodes =
      fields.map(field => renderFieldMethod({ field, flexFieldLayout, fieldValue: field.value, components, fields }))

    const passProps = {
      fieldNodes,
      hasErrors,
      errors,
      components,
      ...formProps
    }

    let rendered: Node
    if (render) {
      rendered = render(passProps)
    } else {
      rendered = RenderComponent ? <RenderComponent {...passProps} /> : null
    }
    return rendered
  }
}

export default Form
