// @flow
import React, { PureComponent } from 'react'
import type { Node } from 'react'
import type { HeadlessRender } from '../../common/HeadlessComponentBase'

type FormFieldProps = {

} & HeadlessRender

class FormField extends PureComponent<FormFieldProps> {

  props: FormFieldProps

  render() {
    const { render, RenderComponent, ...props }: FormFieldProps = this.props

    let rendered: Node
    if (render) {
      rendered = render(props)
    } else {
      rendered = RenderComponent ? <RenderComponent {...props} /> : null
    }
    return rendered
  }
}

export default FormField
