// TODO: move to core-fe
import React from 'react'
import ContextListItem from './ContextListItem'

describe('ContextListItem', () => {
  it('should render ContextListItem', () => {
    const props = {
      item: {},
      onItemClickHandler: jest.fn()
    }
    global.shallowSnapshot(<ContextListItem {...props} />)
  })
})
