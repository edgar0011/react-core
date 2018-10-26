import React, { PureComponent } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { RowWrapper, theme,
  ColoredAmount, Amount, AccountNumber } from '../../index'
import { Icon } from './detailWidgetCard'
import { accounts, movements } from '../data'
import DetailWidgetCardRow from '../DetailWidgetCardRow'

const date = value => new Date(value).toLocaleDateString()

const time = value => new Date(value).toLocaleTimeString()

const datetime = value => `${date(value)} ${time(value)}`

const Table = styled.div`
  display: table;
  width: 100%;
`

const Row = styled.div`
  display: table-row;
`

const Cell = styled.div`
  display: table-cell;
  padding: 5px 10px 20px;
  text-align: ${({ left, right, center }) => (left && 'left') || (right && 'right') || (center && 'center') || 'left'};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`

const icon = <Icon width='32px' height='32px' />

class AccountsDetailWidgetCardRowExample extends PureComponent {
  render() {
    const { ledgerBalance, ...props } = this.props
    return (
      <DetailWidgetCardRow {...props}>
        <Table>
          <Row>
            <Cell bold>Account Name</Cell>
            <Cell bold>IBAN</Cell>
            <Cell bold>Type</Cell>
            <Cell right bold>Available Balance</Cell>
            {ledgerBalance && <Cell right bold>Ledger Ballance</Cell>}
          </Row>
          {accounts.map(row => (
            <Row key={row.accId}>
              <Cell>{row.accName}</Cell>
              <Cell bold><AccountNumber number={row.accIBAN} size='15px' color='inherit' /></Cell>
              <Cell>{row.accTypeName}</Cell>
              <Cell right><ColoredAmount size={15} amount={row.availableBalance} curency={row.currency} /></Cell>
              {ledgerBalance
                && <Cell right><Amount size={15} amount={row.ledgerBalance} curency={row.currency} /></Cell>
              }
            </Row>
          ))}
        </Table>
      </DetailWidgetCardRow>
    )
  }
}

class MovementsDetailWidgetCardRowExample extends PureComponent {
  render() {
    return (
      <DetailWidgetCardRow {...this.props}>
        <Table>
          <Row>
            <Cell bold>Value Date</Cell>
            <Cell bold>Debit Account</Cell>
            <Cell bold>Credit Account</Cell>
            <Cell right bold>Amount</Cell>
          </Row>
          {movements.map(row => (
            <Row key={row.movId}>
              <Cell>{datetime(row.movValueDate)}</Cell>
              <Cell bold><AccountNumber number={row.accIBAN} size='15px' color='inherit' /></Cell>
              <Cell><AccountNumber number={row.movPartnerAccountIBAN} size='15px' color='inherit' /></Cell>
              <Cell right><ColoredAmount size={15} amount={row.movAmount} curency={row.currency} /></Cell>
            </Row>
          ))}
        </Table>
      </DetailWidgetCardRow>
    )
  }
}

const DetailWidgetCardRowExamples = () => (
  <ThemeProvider theme={theme}>
    <div>
      <RowWrapper>
        <AccountsDetailWidgetCardRowExample icon={icon} label='My Accounts' opened collapsible />
      </RowWrapper>
      <RowWrapper>
        <AccountsDetailWidgetCardRowExample label='My Accounts' collapsible ledgerBalance />
      </RowWrapper>
      <RowWrapper>
        <MovementsDetailWidgetCardRowExample label='Latest Movements' noUnderline />
      </RowWrapper>
    </div>
  </ThemeProvider>
)

export default DetailWidgetCardRowExamples
