import React, { PureComponent } from 'react'
import { join, map, pipe } from 'ramda'
import styled, { ThemeProvider }  from 'styled-components'
import { theme, RowWrapper,
  ColoredAmount, Amount, AccountNumber, DateOnly } from '../../index'
import { account, user } from '../data'
import DetailWidgetCard from '../DetailWidgetCard'

const imageUrl = 'https://lumiere-a.akamaihd.net/v1/images/character_mickeymouse_donaldduck_d79720c3.jpeg';

export const Icon = styled.span`
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  background: transparent url(${imageUrl}) no-repeat center center;
  background-size: ${({ width, height }) => `${width} ${height}`};
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
`

const translations = {
  name: 'Account Name',
  iban: 'IBAN',
  balanceValueDate: 'Balance Date',
  disposableBalance: 'Current Balance'
}

const accountDetails = [
  'name',
  'iban',
  'currency',
  'balanceValueDate',
  'disposableBalance',
  'blockedBalance',
  'overdraftBalance',
  'owner'
]

const userDetails = [
  'user',
  'address',
  'phone',
  'email',
  'authenticationMethods',
  'contactAddress',
  'webSocketDestination'
]

const catalog = {
  LN_PWD: 'Token',
  LN_PWD_SMS: 'SMS'
}

const accountMapping = {
  name: (value, data) => data.friendlyName || value,
  iban: value => <div><AccountNumber number={value} /></div>,
  disposableBalance: (value, data) => <ColoredAmount amount={value} size={15} currency={data.currency} />,
  blockedBalance: (value, data) => <Amount amount={value} size={15} currency={data.currency} />,
  overdraftBalance: (value, data) => <Amount amount={value} size={15} currency={data.currency} />,
  balanceValueDate: value => <DateOnly date={value} />
}

const userMapping = {
  user: value => `${value.title} ${value.firstName} ${value.lastName}`,
  address: value => `${value.street} ${value.streetNumber}, ${value.zipCode} ${value.city}, ${value.countryName}`,
  phone: (value, data) => data.address.phone,
  email: (value, data) => data.address.email,
  loginName: (value, data) => data.access.loginName,
  authenticationMethods: (value, data) => pipe(
    map(item => catalog[item.code]),
    join(' / ')
  )(data.access.securityMethods.authenticationMethods)
}

const icon = <Icon width='32px' height='32px' />

class DetailWidgetCardExample extends PureComponent {
  render() {
    const props = {
      translations,
      ...this.props
    }

    return (
      <DetailWidgetCard {...props} />
    )
  }
}

const DetailWidgetCardExamples = () => (
  <ThemeProvider theme={theme}>
    <div>
      <RowWrapper padding='0px 25px 0 20px' wrap='nowrap'>
        <DetailWidgetCardExample
          label='Account Details'
          itemNames={accountDetails}
          icon={icon}
          data={account}
          mapping={accountMapping}
          collapsible
          opened
        />
        <DetailWidgetCardExample
          label='User Details'
          itemNames={userDetails}
          data={user}
          mapping={userMapping}
          collapsible
        />
      </RowWrapper>
      <RowWrapper padding='0px 25px 0 20px' wrap='nowrap'>
        <DetailWidgetCardExample
          label='Account Details'
          itemNames={accountDetails}
          data={account}
          mapping={accountMapping}
          noUnderline
        />
        <DetailWidgetCardExample
          label='User Details'
          itemNames={userDetails}
          data={user}
          icon={icon}
          mapping={userMapping}
          noUnderline
        />
      </RowWrapper>
    </div>
  </ThemeProvider>
)

export default DetailWidgetCardExamples
