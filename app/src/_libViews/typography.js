import React from 'react'
import styled from 'styled-components'


import { pure } from 'recompose'
import theme from './theme'
import { textColor, secondaryTextColor, highlitedTextColor, smallTextColor,
  primaryColor, secondaryColor, primaryTextColor, headersColor } from './theme/color'

const CloseIcon = () => <span>CLOSE</span>

export const Label = styled.label`
  color: ${textColor};
  font-size: 14px;
  font-weight: 500;
  line-height: 1.25em;
  letter-spacing: 0.0875em;
`

Label.defaultProps = {
  theme
}

export const Basic = styled.span`
  color: ${textColor};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5em;
  letter-spacing: 0.0375em;
`

Basic.defaultProps = {
  theme
}

export const BasicP = styled.p`
  color: ${textColor};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5em;
  letter-spacing: 0.0375em;
`

BasicP.defaultProps = {
  theme
}

export const BasicA = styled.a`
  color: ${textColor};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5em;
  letter-spacing: 0.0375em;
`

BasicA.defaultProps = {
  theme
}

export const BasicPhighlight = styled.p`
  color: ${highlitedTextColor};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5em;
  letter-spacing: 0.0375em;
`

BasicPhighlight.defaultProps = {
  theme
}

export const SmallText = styled.p`
  color: ${smallTextColor};
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5em;
  letter-spacing: 0.0375em;
`

SmallText.defaultProps = {
  theme
}

export const SmallTextHighlight = styled.p`
  color: ${highlitedTextColor};
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5em;
  letter-spacing: 0.0375em;
`

SmallTextHighlight.defaultProps = {
  theme
}

export const Header1 = styled.h1`
  margin: 0;
  padding: 50px 0;
  font-size: 36px;
  line-height: 1.5em;
  font-weight: 700;
  color: ${headersColor};
`

Header1.defaultProps = {
  theme
}

export const Header2 = styled.h2`
  margin: 0;
  padding: 30px 0;
  font-size: 32px;
  line-height: 1.5em;
  font-weight: 400;
  color: ${headersColor};
`

Header2.defaultProps = {
  theme
}

export const Header3 = styled.h3`
  margin: 0;
  padding: 30px 0;
  font-size: 28px;
  line-height: 1.5em;
  font-weight: 700;
  color: ${headersColor};
`

Header3.defaultProps = {
  theme
}

export const Header4 = styled.h4`
  margin: 0;
  padding: 20px 0;
  font-size: 22px;
  line-height: 1.5em;
  font-weight: 600;
  color: ${headersColor};
`

Header4.defaultProps = {
  theme
}

export const Header5 = styled.h5`
  margin: 0;
  padding: 0 0 10px 0;
  font-size: 18px;
  line-height: 1.5em;
  font-weight: 600;
  color: ${textColor};
`

Header5.defaultProps = {
  theme
}

export const Caption = styled.span`
  padding: 0.375em 0 0.125em;
  color: ${secondaryTextColor};
  font-size: 1em;
  font-weight: 400;
  line-height: 1.25em;
  letter-spacing: 0.0875em;
`

Caption.defaultProps = {
  theme
}

export const InfoBox = styled.span`
  box-sizing: border-box;
  line-height: 1.5em;
  color: ${secondaryColor};
  border: 1px solid ${secondaryColor};
  border-radius: 3px;
  padding: 8px 15px;
`

InfoBox.defaultProps = {
  theme
}

const BoxWrapper = styled.span`
  box-sizing: border-box;
  line-height: 1.5em;
  color: ${secondaryColor};
  border: 1px solid ${secondaryColor};
  border-radius: 3px;
  padding: 8px 35px 8px 15px;
  position: relative;
`

BoxWrapper.defaultProps = {
  theme
}

const Close = styled(CloseIcon)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  right: 8px;
  color: ${secondaryColor};
  &:hover {
    ${primaryColor}
  }
`

Close.defaultProps = {
  theme
}

export const ClosableBox = pure((props) => (
  <BoxWrapper >
    <span>{props.text}</span>
    <Close onClick={props.onClick} />
  </BoxWrapper>
))

ClosableBox.defaultProps = {
  theme
}

export const Badge = styled.span`
  box-sizing: border-box;
  line-height: 1.5em;
  border: 1px solid ${secondaryColor};
  border-radius: 50%;
  padding: 3px 8px;
  background: ${secondaryColor};
  color: ${primaryTextColor};
`

Badge.defaultProps = {
  theme
}
