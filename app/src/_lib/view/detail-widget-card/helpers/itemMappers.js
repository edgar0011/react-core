import { map, pipe, toPairs } from 'ramda'

/**
 * @function
 * @name camelCaseToArray
 * @desc Splits camelcase string by capital letters.
 * @param {string} str Camelcase text to be split.
 * @returns {string[]}
 */
export const camelCaseToArray = (str) => {
  // Preceed Uppercase (or sets of) with commas then remove anyleading comma
  const delimited = str.replace(/([A-Z]+)/g, ',$1').replace(/^,/, '')
  // Split the string on commas and return the array
  return delimited.split(',')
}

/**
 * @function
 * @name firstUpperCase
 * @desc Converts first letter to uppercase.
 * @param {string} str Text to be converted.
 * @returns {string}
 */
export const firstUpperCase = str => `${str.substr(0, 1).toUpperCase()}${str.substr(1).toLowerCase()}`

/**
 * @function
 * @name arrayOfWords
 * @desc Joins strings with space character.
 * @param {string[]} arrayOfWords Array of string to be joined.
 * @returns {string}
 */
export const join = arrayOfWords => arrayOfWords.join(' ')

/**
 * @function
 * @name keyToWords
 * @desc Converts camelcase string into separated words splitting it by capital letters.
 * @param {string} str Text to be processed.
 * @returns {string}
 */
export const keyToWords = str => pipe(
  camelCaseToArray,
  map(firstUpperCase),
  join
)(str)

/**
 * @function
 * @name mapItemsInGroup
 * @desc Maps array of items data into single component data.
 * @param {string} groupLabel Group label text.
 * @param {any} icon Group label icon component.
 * @param {string[]} itemNames Array of properties to be extracted from source data object.
 * @param {Object} data Source data object.
 * @param {Object} mapping Advanced object-key-based mappings.
 * @param {Object} translations Text localizations data.
 * @param {boolean} nullValueVisible Flag for displaying fields with empty values.
 * @param {Object<{ clickHandler: function, collapsible: boolean, isOpen: boolean }>}
 * - Object containing collapsible functionality data.
 * @returns {any[]}
 */
export const mapItemsInGroup = (
  groupLabel, icon, itemNames, data, mapping, translations, nullValueVisible,
  { clickHandler, collapsible, isOpen }
) => {
  if (!data || (Array.isArray(data) && !data.length)) {
    return null
  }
  let dataItems = data
  if (!Array.isArray(data)) {
    dataItems = [data]
  }
  let it = 0
  const mappedDataItems = dataItems.reduce((mapped, data) => {
    const itemNodes = pipe(
      map((item) => ({
        item: (mapping && mapping.label && mapping.label[item] ? mapping.label[item](item, data) : item),
        value: (mapping && mapping[item] ? mapping[item](data[item], data) : data[item])
      })),
      map(({ item, value }) => {
        it += 1
        const label = translations[item] || keyToWords(item)
        return (value || nullValueVisible)
          ? { key: `${label}-${item}-${it}`, label, value }
          : null
      })
    )(itemNames)

    const itemNodesFiltered = itemNodes.filter(node => node !== null)

    return itemNodesFiltered && itemNodesFiltered.length ? [...mapped, ...itemNodesFiltered] : mapped
  }, [])

  const itemNodesFiltered = mappedDataItems.filter(comp => !!comp)

  return itemNodesFiltered && itemNodesFiltered.length
    ? [
      groupLabel
        ? { label: groupLabel, icon, collapsible, isOpen, clickHandler }
        : null,
      itemNodesFiltered
    ]
    : null
}

/**
 * @function
 * @name mapItems
 * @desc Maps array of items.
 * @param {Object} sections Sections data.
 * @param {boolean} nullValueVisible Flag for displaying fields with empty values.
 * @returns {function}
 */
export const mapItems = (sections, nullValueVisible) => (detail, translations) => {
  const re = pipe(
    toPairs,
    map(([key, value]) => (
      (value || nullValueVisible)
        ? {
          key,
          label: translations[key] || keyToWords(key),
          value: value !== null
            && typeof value === 'object' ? mapItems(sections, nullValueVisible)(value, translations) : value
        }
        : null
    ))
  )(detail)
  return re.filter(comp => !!comp)
}
