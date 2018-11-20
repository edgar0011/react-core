import React from 'react'
import FormSimple from './FormSimple'
import Form from './Form'
import FormField from './FormField'
import ActionGroup from '../../button/ActionGroup'

describe('FormSimple', () => {
  it('should render FormSimple', () => {
    const fields = [
      {
        name: 'input1',
        label: 'Input1'
      }
    ]
    const fieldValues = {
      input1: 'Hello Form'
    }

    const formComponents = {
      FormComponent: Form,
      FormFieldComponent: FormField,
      ActionGroupComponent: ActionGroup
    }

    const translations = {}

    global.shallowSnapshot(
      <FormSimple
        fields={fields}
        fieldValues={fieldValues}
        translations={translations}
        components={formComponents}
      />)
  })
})
