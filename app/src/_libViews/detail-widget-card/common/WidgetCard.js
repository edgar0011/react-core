import styled from 'styled-components'
import { Flex } from '../../grid/flex'
import { media } from '../../media'
import { borderColor } from '../../theme/color'
import theme from '../../theme'

const isUnderline = props => (props.underline ? 'none' : 'block')

const WidgetCard = styled(Flex)`
  position: relative;
  display: table-cell;
  padding: 15px;
  width: ${(props) => (props.width ? props.width : '50%')};
  ${media.tablet`display: block;`}
  ${media.tablet`width: 100%;`}
  &:after {
    content: '';
    height: 1px;
    display: ${isUnderline};
    position: absolute;
    bottom: 10px;
    left: 25px;
    right: 25px;
    background: ${borderColor};
  }
`

WidgetCard.defaultProps = {
  theme
}

export default WidgetCard
