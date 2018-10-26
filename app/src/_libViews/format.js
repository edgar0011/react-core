import React, { PureComponent } from 'react'
import { pure } from 'recompose'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { isNil } from 'ramda'
import { media } from './media'
import theme from './theme'
import { accentTextColor, successColor, secondaryColor, secondaryTextColor } from './theme/color'
import AccountNumber from './format/account-number'


export const format = (amount, decimals = 2) => {
  const decimalSeparator = ','
  const bignumber = new BigNumber(String(Math.abs(amount)))
  BigNumber.config({
    FORMAT: {
      decimalSeparator,
      groupSeparator: ' ',
      groupSize: 3
    }
  })

  const value = bignumber.toFormat(decimals, 1)
  const ar = value.split(decimalSeparator)

  return { number: ar[0], decimalPart: `${decimalSeparator}${ar[1]}` }
}

const color = props => {
  if (props.negative) {
    return secondaryColor(props)
  }
  return 'inherit'
}

const amountColor = props => (props.positive > 0 ? successColor(props) : secondaryColor(props))

const Currency = styled.span`
  font-size: 0.875em;
  color: ${color}
`

Currency.defaultProps = {
  theme
}

const AmountWrapper = styled.div`
  color: ${amountColor} !important;
  font-weight: 600;
  span {
    color: ${amountColor} !important;
  }
`

AmountWrapper.defaultProps = {
  theme
}

const DateWrapper = styled.span`
  color: ${secondaryTextColor};
  font-size: 14px;
  text-align: left;
  div:nth-child(1) {
    font-size: 16px;
    font-weight: 600;
    color: ${accentTextColor};
  }
`

DateWrapper.defaultProps = {
  theme
}

export const DateOnly = pure(({ date }) => {
  if (!date) {
    return null
  }
  const parsed = new Date(date)
  const options = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'Europe/Prague'
  }
  return (
    <div>{ parsed && parsed.toLocaleString('cs-CZ', options) }</div>
  )
})

export const DateMulti = pure(({ date }) => {
  if (!date) {
    return null
  }
  const parsed = new Date(date)
  const optionsDate = {
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Europe/Prague'
  }
  const optionsYear = {
    year: 'numeric',
    timeZone: 'Europe/Prague'
  }
  return (
    <DateWrapper>
      <div>{ parsed && parsed.toLocaleString('cs-CZ', optionsDate) }</div>
      <div>{ parsed && parsed.toLocaleString('cs-CZ', optionsYear) }</div>
    </DateWrapper>
  )
})


export const DateTime = pure(({ date }) => {
  if (!date) {
    return null
  }
  const parsed = new Date(date)
  const options = {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
  }
  return (
    <span>{ parsed && parsed.toLocaleString('cs-CZ', options) }</span>
  )
})

export const Rate = pure(({ rate }) => {
  const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  return (
    <span>
      { rate && rate.toLocaleString('en-US', options) }
      <Currency> %</Currency>
    </span>
  )
})

/* eslint no-empty:0 */

export const Amount = pure(({
  amount, currency = 'CZK', negative, positive, size = '18px', weight = '400', decimals = 2
}) => {
  const isAmount = !isNil(amount) && !isNaN(amount)
  let currencySize = '12px'
  try {
    currencySize = `${Math.floor((parseInt(size, 10) / 14) * 11)}px`
  } catch (error) {
  }
  const style = { fontSize: size, fontWeight: weight }
  const formattedValue = isAmount ? format(amount, decimals) : null
  return (
    <span style={style}>
      <Currency negative={negative} positive={positive}>
        {amount < 0 ? '-' : null}
      </Currency>
      { formattedValue && formattedValue.number}
      { isAmount && (currency || formattedValue.decimalPart) &&
        <span style={{ ...style, fontSize: currencySize }} >
          {`${formattedValue ? formattedValue.decimalPart : ''} ${currency}`}
        </span> }
    </span>
  )
})

// TODO purecomponent, differente size of decimal part
export const TableAmount = pure(({
  amount = 0, currency = 'CZK', decimals = 2, size, weight
}) => {
  const isAmount = !isNil(amount) && !isNaN(amount)
  let currencySize = '14px'
  try {
    currencySize = `${Math.floor((parseInt(size, 10) / 18) * 14)}px`
  } catch (error) {

  }
  const style = { fontSize: size, fontWeight: weight }
  const formattedValue = isAmount ? format(amount, decimals) : null
  return (
    <div style={style} className='coloredAmount'>
      <span>{(!amount || amount === 0) ? '' : (amount < 0 ? '-' : '+')}</span>
      <span>{formattedValue && formattedValue.number}</span>
      {isAmount && (currency || formattedValue.decimalPart) &&
      <span
        positive={amount}
        style={{ ...style, fontSize: currencySize }}
      >
        {`${formattedValue ? formattedValue.decimalPart : ''} ${currency}`}
      </span>}
    </div>
  )
})

// TODO purecomponent, differente size of decimal part
export const ColoredAmount = pure(({
  amount = 0, currency, decimal = 2, ...props
}) => (
  <AmountWrapper positive={amount} >
    <TableAmount
      amount={amount}
      currency={currency}
      size={props.size || 'inherit'}
      weight={props.weight || '600'}
      decimals={decimal}
    />
  </AmountWrapper>
))

export const BigAmount = pure((amount = { amount: 0 }) => (
  <Amount
    amount={amount.amount}
    currency={amount.currency}
    negative={amount.negative}
    positive={amount.positive}
    size='36px'
    weight='700'
    decimals={amount.decimal}
  />
))

export const MediumAmount = pure((amount = { amount: 0 }) => (
  <Amount
    amount={amount.amount}
    currency={amount.currency}
    negative={amount.negative}
    positive={amount.positive}
    size='18px'
    weight='400'
    decimals={amount.decimal}
  />
))

export const SmallAmount = pure((amount = { amount: 0, decimal: 2 }) => (
  <Amount
    amount={amount.amount}
    currency={amount.currency}
    negative={amount.negative}
    positive={amount.positive}
    size='14px'
    weight='400'
    decimals={amount.decimal}
  />
))

const AccountNameWrapper = styled.div`
  font-weight: 700;
  font-size: 18px;
  ${media.tablet`font-weight: 600;`}
  ${media.tablet`font-size: 14px;`}
`

AccountNameWrapper.defaultProps = {
  theme
}

const AccountNumberWrapper = styled(AccountNumber)`
  font-size: 14px; 
  ${media.desktop`font-size: 12px !important;`}
  ${media.tablet`font-size: 10px !important;`}
`

AccountNumberWrapper.defaultProps = {
  theme
}

export const Account = pure(({ name, number, style }) => (
  <div style={{ height: '40px', ...style, textAlign: 'left' }}>
    <AccountNameWrapper>{name}</AccountNameWrapper>
    <AccountNumberWrapper size='14px' color={secondaryTextColor} number={number} />
  </div>
))

export const Bool = pure(({ condition, translations }) => (
  <span>{ condition ? translations.yes || 'Yes' : translations.no || 'No' }</span>
))

const AccountName = styled.div`
  display: block;
  font-size: 14px;
`
AccountName.defaultProps = {
  theme
}

export class ProductAccount extends PureComponent {
  static propTypes = {
    productAlias: PropTypes.string,
    accountNumber: PropTypes.string,
    forSelect: PropTypes.bool.isRequired
  }

  static defaultProps = {
    forSelect: false
  }

  render() {
    const {
      productAlias,
      accountNumber,
      forSelect
    } = this.props

    if (isNil(productAlias) || isNil(accountNumber)) {
      return null
    }

    const account = `${productAlias} (${accountNumber})`

    if (forSelect) {
      return <AccountName>{account}</AccountName>
    }

    return <span>{account}</span>
  }
}
