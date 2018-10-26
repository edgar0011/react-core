/* eslint-disable import/prefer-default-export,no-confusing-arrow */

import React from 'react'
import styled from 'styled-components'
import { is, ifElse } from 'ramda'
import PropTypes from 'prop-types'
import theme from '../theme'
import { media } from '../media'

const safeUnits = ifElse(
  is(Number),
  (n) => `${n}px`,
  (s) => s
)


export const Flex = styled(({ wrap, minWidth, maxWidth, ...rest }) => <div {...rest} />)`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'flex-start'};
  padding: ${({ padding }) => safeUnits(padding) || '0'};
  margin: ${({ margin }) => safeUnits(margin) || '0'};
  flex: ${({ size }) => size || '1'};
  flex-wrap: ${({ wrap }) => wrap ? 'wrap' : 'nowrap'};
  align-self: ${({ self }) => self || 'inherit'};
  width: ${({ width }) => width || 'auto'};
  max-width: ${({ maxWidth }) => maxWidth || 'none'};
  min-width: ${({ minWidth }) => minWidth || 'none'};
  order: ${({ order }) => order || '0'};
`

Flex.propTypes = {
  direction: PropTypes.string,
  align: PropTypes.string,
  self: PropTypes.string,
  justify: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  wrap: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
  order: PropTypes.string
}

Flex.defaultProps = {
  theme
}

export const FlexWrapper = styled(Flex)`
  ${media.tablet`display: block;`}
`
export const FlexWrapper2 = styled(Flex)`
  ${media.desktop`display: block;`}
`
