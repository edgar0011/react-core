import React, { PureComponent } from 'react'
import { UnmountClosed } from 'react-collapse'
import PropTypes from 'prop-types'
import { DetailHeader, Flex } from '../../index'
import WidgetCard from '../common/WidgetCard'
import WidgetCardNoBorder from '../common/WidgetCardNoBorder'

class DetailWidgetCardRowView extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    icon: PropTypes.element,
    width: PropTypes.string,
    margin: PropTypes.string,
    noUnderline: PropTypes.bool,
    collapsible: PropTypes.bool,
    isOpen: PropTypes.bool,
    clickHandler: PropTypes.func
  }

  static defaultProps = {
    isOpen: false
  }

  render() {
    const {
      label,
      icon,
      children,
      width,
      margin,
      noUnderline,
      collapsible,
      isOpen,
      clickHandler
    } = this.props

    return children
      ? (
        <WidgetCard
          width={width}
          margin={margin}
          underline={noUnderline ? 1 : 0}
        >
          {(label || icon) &&
          <DetailHeader
            header={label}
            icon={icon}
            collapsible={collapsible}
            isOpen={isOpen}
            clickHandler={clickHandler}
          />}
          {collapsible &&
          <Flex>
            <UnmountClosed isOpened={isOpen} style={{ width: '100%' }}>
              {children}
            </UnmountClosed>
          </Flex>}
          {!collapsible && children}
        </WidgetCard>
      )
      : (
        <WidgetCardNoBorder width={width} margin={margin} />
      )
  }
}

export default DetailWidgetCardRowView
