import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Flex } from '../../grid/flex'

const WrapperContainer = styled(Flex)`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 0px;
`

class ItemsListView extends PureComponent {
  static propTypes = {
    rows: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      items: PropTypes.arrayOf(PropTypes.object).isRequired,
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })).isRequired,
    components: PropTypes.shape({
      ItemsRowComponent: PropTypes.any,
      itemsRow: PropTypes.shape({
        render: PropTypes.function,
        RenderComponents: PropTypes.any,
      })
    })
  }

  render() {
    // console.log('ItemsList render')
    const { rows, components: { ItemsRowComponent, itemsRow } } = this.props
    const rowNodes = rows.map(row =>
      (<ItemsRowComponent
        {...row}
        {...itemsRow}
      />))
    return (
      <WrapperContainer>
        {rowNodes}
      </WrapperContainer>
    )
  }
}

export default ItemsListView
