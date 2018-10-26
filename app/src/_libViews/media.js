/* eslint-disable no-param-reassign */

import { css } from 'styled-components'

export const sizes = {
  /*giant: 1280,
  desktop: 1024,
  tablet: 768,
  phone: 376*/
  /*giant: 1920,
  desktop: 1366,
  tablet: 1024,
  phone: 768*/
  giant: 1920,
  desktop: 1366,
  tablet: 1024,
  phone: 768
}

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})

export const mediaJS = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16
  accumulator[label] = () => window.matchMedia(`(max-width: ${emSize}em)`)
  return accumulator
}, {})

export const content = css`
  padding-left: 12%;
  padding-right: 12%;

  ${media.giant`
    padding-left: 10%;
    padding-right: 10%;
  `}
  ${media.desktop`
    padding-left: 5%;
    padding-right: 5%;
  `}
  ${media.tablet`
    padding-left: 20px;
    padding-right: 20px;
  `}
  ${media.phone`
    padding-left: 10px;
    padding-right: 10px;
  `}
`
