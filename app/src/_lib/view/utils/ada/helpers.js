/**
 * Get page title depends on current page
 * @function pageTitle
 * @param {object} translations
 * @returns {string} Page title concatenated with bank name
 */
export const pageTitle = (translations) => `${translations.pageTitle}${translations.bankTitle}`

/**
 * Get information if user clicked or pressed (backspace|enter) some item
 * @function clickHandler
 * @param event
 * @returns {boolean} True if user clicked or pressed (backspace|enter)
 */
export const clickHandler = (event) => {
  const pressedKey = event.which || event.keyCode
  return event.type === 'click' || pressedKey === 13 || pressedKey === 32
}
