import React from 'react'
import { pure } from 'recompose'
import { dropWhile, map, pipe, reverse, split } from 'ramda'


import theme from '../theme'
import { textColor } from '../theme/color'
import { Basic } from '../typography'

const trimLeadingZeros = dropWhile(x => x === '0')

const parseIban = (number) => ({ accountPrefix: number, accountNumber: number, bankCode: number })

const AccountNumber = ({
  number, bankCode, color = textColor, size = '16px', weight = '400'
}) => {
  if (!number) {
    return null
  }

  const iban = parseIban(number)
  if (iban) {
    const { accountPrefix, accountNumber, bankCode } = iban
    const prefix = trimLeadingZeros(accountPrefix)
    return (
      <Basic style={{ fontSize: size, color, fontWeight: weight }} >
        {prefix ? `${prefix}-` : ''}{trimLeadingZeros(accountNumber)}/{bankCode}
      </Basic>
    )
  }

  const [accountNumber, prefix] = pipe(
    split(' '),
    reverse,
    map(trimLeadingZeros)
  )(number)

  return (
    <Basic style={{ fontSize: size, color, fontWeight: weight }} >
      {prefix ? `${trimLeadingZeros(prefix)}-` : ''}{accountNumber}{bankCode ? `/${bankCode}` : ''}
    </Basic>
  )
}

AccountNumber.defaultProps = {
  theme
}

export default pure(AccountNumber)
