import React from 'react'
import ItemsList from './ItemsList'

describe('ItemsList', () => {
  it('should render ItemsList', () => {
    const props = {
      data: []
    }
    global.shallowSnapshot(<ItemsList {...props} />)
  })
})
