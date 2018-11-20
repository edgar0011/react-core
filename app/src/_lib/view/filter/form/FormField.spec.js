import React from 'react'
import FormField from './FormField'

describe('FormField', () => {
  it('should render FormField', () => {
    global.shallowSnapshot(<FormField />)
  })

  /* it ('Should confirm shallow render', () => {
    const wrapper = global.shallow(
      <FormField />
    )
    expect(wrapper).toMatchSnapshot()
  }) */
})
