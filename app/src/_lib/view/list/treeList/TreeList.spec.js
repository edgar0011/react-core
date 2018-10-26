// TODO: move to core-fe
import React from 'react'
import TreeList from './TreeList'

describe('TreeList', () => {
  it('should render TreeList', () => {
    global.shallowSnapshot(<TreeList />)
  })
})
