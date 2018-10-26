import React from 'react'
import SwitchInputTree from './SwitchInputTree'

describe('SwitchInputTree', () => {
  it('should render SwitchInputTree', () => {
    const props = {
      components: {
        option: {},
        select: {},
      }
    }
    global.shallowSnapshot(<SwitchInputTree {...props} />)
  })
})
