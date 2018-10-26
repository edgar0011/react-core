const defaultTheme = {
  themePrimary: '#520B2C',
  themeSecondary: '#761040',
  themeSecondaryLite: '#ceb0c0',
  themeShade: '#737373',
  themeSelection: '#faf5f6',
  themeSelection2: '#f2e9ec',
  neutralBlack: '#000',
  neutralAccent: '#14073f',
  neutralPrimary: '#3e4546',
  neutralSecondary: '#7e8a8b',
  neutralTertiary: '#ecf2f2',
  neutralShade: '#fafafb',
  bodyBackground: '#f2f2f2',
  neutralClear: '#fff',
  defaultBorder: '#D0CDDD',
  disabledPlaceholder: '#A3A1A8',
  error: '#F11B2A',
  errorAlt: '#CD1020',
  errorBackground: '#FFE9EA',
  warning: '#FF8E1E',
  warningAlt: '#B56619',
  warningBackground: '#FFF6DF',
  success: '#4AB166',
  successAlt: '#3B8D51',
  successBackground: '#E9FFEF',
  info: '#1287ff',
  infoAlt: '#3278d5',
  accountAccent: '#7cd952',
  accountAccentAlt: '#58993a',
  loanAccent: '#ffd500',
  loanAccentAlt: '#bf9f00',
  primaryBtn: '#4AB166',
  primaryBtnFocus: '#3B8D51',
  platinumButton: 'linear-gradient(to right, #562850 , #7A183D);',
  disabledBtn: '#89878D',
  disabledBtnText: '#89878d',
  detailBackground: '#f6f6f6'
}

export default defaultTheme

const color = type => props => props.theme.color[type]

export const headerColor = color('neutralClear')
export const backgroundColor = color('bodyBackground')
export const itemBackgroundColor = color('neutralClear')

//export const inputBackgroundColor = color('neutralTertiary')
export const inputBackgroundColor = color('neutralClear')

export const primaryColor = color('themePrimary')
export const secondaryColor = color('themeSecondary')
export const secondaryLiteColor = color('themeSecondaryLite')
export const tabBarColor = color('neutralShade')
export const bodyColor = color('neutralTertiary')

export const accentTextColor = color('neutralAccent')
export const blackTextColor = color('neutralBlack')
export const textColor = color('neutralAccent')
export const headersColor = color('themeSecondary')
export const secondaryTextColor = color('neutralAccent')
export const inputTextColor = color('themeSecondary')
export const disabledPlaceholder = color('disabledPlaceholder')
export const highlitedTextColor = color('themePrimary')
export const smallTextColor = color('themeShade')
export const linkTextColor = color('themeSecondary')
export const primaryTextColor = color('neutralClear')

export const borderColor = color('defaultBorder')
export const activeBorderColor = color('themePrimary')
export const secondaryBorderColor = color('themePrimary')

export const tableRowHoverColor = color('themePrimary')
export const tableRowOdd = color('bodyBackground')
export const tableRowEven = color('neutralClear')
export const tableHeadBackground = color('neutralClear')
export const tableHeadLabel = color('disabledBtnText')
export const tableCellColor = color('neutralAccent')
export const tableCellSorted = color('themeSecondary')

export const detailOdd = color('detailBackground')

export const checkboxBorder = color('neutralAccent')
export const checkboxBorderDisabled = color('disabledBtnText')
export const checkboxChecked = color('themePrimary')

export const tooltipBackground = color('themePrimary')

export const chartShadow = color('disabledPlaceholder')

export const primaryButtonColor = color('primaryBtn')
export const primaryButtonFocus = color('primaryBtnFocus')
export const primaryButtonDisabled = color('disabledBtn')
export const platinumButtonColor = color('platinumButton')
export const buttonDisabledText = color('disabledBtnText')
export const secondaryButtonColor = color('themeSecondary')
export const secondaryButtonFocus = color('themePrimary')
export const secondaryButtonBackground = color('neutralClear')
export const secondaryButtonDisabled = color('disabledBtn')

export const errorColor = color('error')
export const errorAltColor = color('errorAlt')
export const errorBackgroundColor = color('errorBackground')
export const warningColor = color('warning')
export const warningAltColor = color('warningAlt')
export const warningBackgroundColor = color('warningBackground')
export const successColor = color('success')
export const successAltColor = color('successAlt')
export const successBackgroundColor = color('successBackground')
export const infoColor = color('info')
export const infoAltColor = color('infoAlt')

export const accentColor = color('themePrimary')
export const accentAltColor = color('themeSecondary')
export const accountAccentColor = color('accountAccent')
export const accountsOverviewAccentColor = color('accountAccentOverview')
export const accountsOverview2AccentColor = color('accountAccentOverview2')
export const accountAccentAltColor = color('accountAccentAlt')
export const loanAccentColor = color('loanAccent')
export const loanAccentAltColor = color('loanAccentAlt')

export const selectionColor = color('themeSelection')
export const selectionColor2 = color('themeSelection2')
