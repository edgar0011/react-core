import React from 'react'
import styled from 'styled-components'
import { pure } from 'recompose'
import theme from './theme'
import { errorColor, itemBackgroundColor, textColor, tableHeadLabel } from './theme/color'
import { Label as LabelCaption, Basic } from './typography'
import { Flex } from './grid/flex'

import { media } from './media'

const arrowUp = () => <span>ARROW UP</span>
const arrowDown = () => <span>ARROW DOWN</span>

const ArrowUpStyled = styled(arrowUp)`
  font-size: 20px;
  cursor: pointer;
`
const ArrowDownStyled = styled(arrowDown)`
  font-size: 20px;
  cursor: pointer;
`

export const Item = styled.div`
  display: flex;
  padding: 0.5rem 0;
  align-self: baseline;
  align-items: center;
`

Item.defaultProps = {
  theme
}

const Label = styled.div`
  display: flex;
  line-height: 1.5em;
  flex: 0.5 1 40%;
  padding: 0 5px 0 0;
`

const LabelText = styled(LabelCaption)`
  color: ${tableHeadLabel};
`

LabelText.defaultProps = {
  theme
}

const Value = styled.div`
  flex: 1 0.5 60%;
  word-break: break-word;
  ${media.tablet`text-align: right;`}
  button {
    margin: 0;
  }
`

const Alert = styled.label`
  display: block;
  text-align: center;
  color: ${errorColor};
`

Alert.defaultProps = {
  theme
}

export const Detail = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 25px 25px 10px;
  background: ${itemBackgroundColor};
`

Detail.defaultProps = {
  theme
}

export const DetailInfo = styled.div`
  width: 40%;
  float: left;
  padding: 24px;
  background: ${itemBackgroundColor};
`

const TitleWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 15px;
  color: ${textColor};
  span {
    display: inline-block;
    font-size: 24px;
    font-weight: 600;
    padding-right: 4px;
    position: relative;
    z-index: 2;
  }
  i {
    width: 40px;
    display: inline-block;
    vertical-align: middle;
  }
  button {
    margin: 0;
    i {
      width: initial;
    }
  }
`
TitleWrapper.defaultProps = {
  theme
}

const ButtonWrapper = styled.span`
  button {
    margin: 0;
    height: initial;
  }
`

export const RowWrapper = styled.div`
  width: 100%;
  display: table;
`


export const DetailHeader = pure(({
  header, icon, size, isOpen, collapsible, clickHandler
}) => (
  <TitleWrapper>
    <Label>
      { icon && <Flex size='initial'><i size={size}>{icon}</i></Flex>}
      <Flex justify='flex-start' align='center'>
        <span style={{ paddingLeft: icon ? '0' : '10px', width: '100%' }}>
          <Flex justify='flex-start'>{header}</Flex>
        </span>
      </Flex>
      {collapsible &&
      <Flex size={1} justify='flex-end' onClick={clickHandler}>
        <span>
          {isOpen && <ArrowUpStyled />}
          {!isOpen && <ArrowDownStyled />}
        </span>
      </Flex>}
    </Label>
  </TitleWrapper>
))

export const DetailError = pure(({ error }) => (
  <Item>
    <Alert>{error}</Alert>
  </Item>
))

export const DetailItem = pure(({
  label, children, border, button
}) => (
  <Item border={border}>
    {label &&
    <Label>
      <LabelText>
        {label}
      </LabelText>
    </Label>}
    <Value>
      <Basic>
        {children}
      </Basic>
      {button && <ButtonWrapper>{button}</ButtonWrapper>}
    </Value>
  </Item>
))

Detail.defaultProps = {
  theme
}
