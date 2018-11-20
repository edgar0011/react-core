import React from 'react'
import FilterTableComponent from './FilterTableComponent'

describe('FilterTableComponent', () => {
  it('should render FilterTableComponent', () => {
    const props = {
      components: {},
      labels: {},
      tableData: {},
      formData: {}
    }
    global.shallowSnapshot(<FilterTableComponent {...props} />)
  })
})
