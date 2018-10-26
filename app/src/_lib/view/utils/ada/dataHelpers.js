/* eslint import/prefer-default-export:0 */
export const smartSpread = (item) => (Array.isArray(item) ? [...item] : { ...item })
