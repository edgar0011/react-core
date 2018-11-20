import React from 'react'
import Form from './Form'
import FormField from './FormField'

const renderFieldMethod = (field) => <FormField {...field} />

describe('Form', () => {
  it('should render Form', () => {
    const fields = [
      {
        name: 'input1',
        label: 'Input1'
      }
    ]
    const fieldValues = {
      input1: 'Hello Form'
    }

    global.shallowSnapshot(<Form fields={fields} fieldValues={fieldValues} renderFieldMethod={renderFieldMethod} />)
  })
})
