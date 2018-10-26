import React, { PureComponent } from 'react'
import { UnmountClosed } from 'react-collapse'
import PropTypes from 'prop-types'
import { Detail, DetailItem, DetailHeader, Flex } from '../../index'
import WidgetCard from '../common/WidgetCard'
import WidgetCardNoBorder from '../common/WidgetCardNoBorder'

class DetailWidgetCardView extends PureComponent {
  static propTypes = {
    width: PropTypes.string,
    margin: PropTypes.string,
    noUnderline: PropTypes.bool,
    collapsible: PropTypes.bool,
    isOpen: PropTypes.bool,
    header: PropTypes.object,
    fields: PropTypes.arrayOf(PropTypes.object),
    translations: PropTypes.object
  }

  static defaultProps = {
    isOpen: false
  }

  render() {
    const {
      width,
      margin,
      noUnderline,
      collapsible,
      isOpen,
      header,
      fields
    } = this.props

    const { label, ...headerProps } = header || {}

    return fields
      ? (
        <WidgetCard
          width={width}
          margin={margin}
          underline={noUnderline ? noUnderline.toString() : noUnderline}
        >
          {header && <DetailHeader header={label} {...headerProps} />}
          {collapsible &&
          <Flex>
            <UnmountClosed isOpened={isOpen} style={{ width: '100%' }}>
              <Detail>
                {fields.map(({ value, ...fieldProps }) => <DetailItem {...fieldProps}>{value}</DetailItem>)}
              </Detail>
            </UnmountClosed>
          </Flex>}
          {!collapsible &&
          <Detail>
            {fields.map(({ value, ...fieldProps }) => <DetailItem {...fieldProps}>{value}</DetailItem>)}
          </Detail>}
        </WidgetCard>
      )
      : (
        <WidgetCardNoBorder width={width} margin={margin} />
      )
  }
}

export default DetailWidgetCardView
