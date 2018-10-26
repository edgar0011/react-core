import React, { PureComponent } from 'react'

import styled from 'styled-components'
import theme from '../../theme'

import { media } from '../../media'
import { Flex } from '../../grid/flex'
import { borderColor, headerColor, primaryColor, smallTextColor,
  secondaryTextColor, selectionColor, selectionColor2 } from '../../theme/color'

const fontWeight = (props) => {
  if (props.bolder) {
    return '1000'
  }
  return (props.demi ? '600' : '400')
}

const cursor = (props) => (props.header || !props.selectable ? 'auto' : 'pointer')

const ItemsRowStyled = styled(Flex)`
  display: flex;
  height: ${(props) => (props.selected ? '80px' : '60px')};
  font-size: 14px;
  color: ${secondaryTextColor};
  border-bottom: 1px solid ${borderColor};
  background-color: ${(props) => (props.selected ? selectionColor2 : headerColor)};
  -webkit-transition: background-color 400ms ease-out, height 300ms ease-out;
  -moz-transition: background-color 400ms ease-out, height 300ms ease-out;
  -o-transition: background-color 400ms ease-out, height 300ms ease-out;
  transition: background-color 400ms ease-out, height 300ms ease-out;
  &:hover {
    color: ${(props) => (props.header ? 'inherit' : primaryColor(props))};
    background-color: ${(props) => (props.selected ? selectionColor2 : selectionColor)};
  }
  &:last-child {
    border-bottom: 0;
  }
  padding: 0px 15px;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};
`

ItemsRowStyled.defaultProps = {
  theme
}

const ItemStyled = styled(Flex)`
  display: flex;
  font-weight: ${fontWeight};
  padding: 0 5px 0 0;
  color: ${(props) => (props.header ? smallTextColor(props) : 'inherit')};
  &:hover {
    cursor: ${cursor};
  }
  
  ${media.tablet`display: ${(props) => (props.desktop ? 'none' : 'flex')};`}
  ${media.phone`display: ${(props) => (props.tablet ? 'none' : 'flex')};`}
`

ItemStyled.defaultProps = {
  theme
}

export class Item extends PureComponent {
  render() {
    // console.log('Item render')
    const { size, demi, bolder, content, justify, header, desktop, tablet } = this.props
    return (
      <ItemStyled
        style={{ pointerEvents: 'inherit' }}
        size={size}
        demi={demi ? 1 : 0}
        bolder={bolder ? 1 : 0}
        justify={justify}
        header={header ? 1 : 0}
        desktop={desktop ? 1 : 0}
        tablet={tablet ? 1 : 0}
      >
        {content}
      </ItemStyled>
    )
  }
}

class ItemsRowView extends PureComponent {
  render() {
    const { items, ...props } = this.props
    const itemNodes = items.map(item => <Item key={`${props.id}-${item.id}`} {...item} />)
    return (
      <ItemsRowStyled {...props} selectable={props.selectable ? 1 : 0} >{itemNodes}</ItemsRowStyled>
    )
  }
}

export default ItemsRowView
