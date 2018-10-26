import React from 'react'
import SwitchInputTreeListNode from './SwitchInputTreeListNode'

describe('SwitchInputTreeListNode', () => {
  it('should render SwitchInputTreeListNode', () => {
    const props = {
      components: {
        option: {},
        select: {},
      }
    }
    global.shallowSnapshot(<SwitchInputTreeListNode {...props} />)
  })
})
