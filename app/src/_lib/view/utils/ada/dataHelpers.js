// @flow
/* eslint import/prefer-default-export:0 */
export const smartSpread = (item: Object | Array<any>): Object | Array<any> =>
  (Array.isArray(item) ? [...item] : { ...item })
