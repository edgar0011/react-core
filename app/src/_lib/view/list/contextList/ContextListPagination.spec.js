// TODO: move to core-fe
import React from 'react'
import ContextListPagination from './ContextListPagination'

describe('ContextListPagination', () => {
  it('should render ContextListPagination', () => {
    global.shallowSnapshot(<ContextListPagination />)
  })
})
