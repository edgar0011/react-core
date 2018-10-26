// @flow
import React, { PureComponent } from 'react'
import { memoize } from 'lodash'
import type { ComponentType, Node } from 'react'
import type { HeadlessRender } from '../../common/HeadlessComponentBase'
import type { Row } from './ItemsRow'

type ItemsListProps = {
  data: ?Array<Row>,
  onClick?: Function,
  selectable?: boolean,
  header?: boolean,
  size?: number | string,
  align?: string,
  selectedIndex?: number,
  components: {
    ItemsRowComponent: ComponentType<any>,
    itemsRow: HeadlessRender
  }
} & HeadlessRender

type ItemsListState = {
  selectedIndex: number
}
/**
 * @class
 * @name ItemsList
 * @classdesc Displays items as vertical list.
 * @extends PureComponent
 *
 * @prop {function} render Render function must be specified unless RenderComponent is specified.
 * @prop {ComponentType} RenderComponent Render component must be specified unless render function is specified.
 * @prop {Array<{ id: number|string, items: Object[] }>} data Required array of items data.
 * @prop {function} onClick Item click event handler.
 * @prop {boolean} selectable  View variations flag.
 * @prop {boolean} header View variations flag.
 * @prop {number} size View variations data.
 * @prop {string} align View variations flag.
 * @prop {Object} components Render configuration container.
 * @prop {any} components.ItemsRowComponent Items row render component.
 * @prop {Object} components.itemsRow Items row render configuration container.
 * @prop {function} components.itemsRow.render Items row render function.
 * @prop {any} components.itemsRow.RenderComponents Items row render components.
 * @prop [number] selectedIndex Pre-selected item index.
 */
export default class ItemsList extends PureComponent<ItemsListProps, ItemsListState> {

  static defaultProps = {
    size: 16,
    align: 'center'
  }

  constructor(props: ItemsListProps) {
    super(props)
    this.memoizedHandleClick = memoize(this.handleClick)
    this.state.selectedIndex = this.props.selectedIndex || -1
  }

  state: ItemsListState = {
    selectedIndex: -1
  }

  props: ItemsListProps

  memoizedHandleClick: (rowId: number) => Function
  /**
   * Row click event handler.
   * @memberOf ItemsList
   * @method ItemsList#handleClick
   * @param {number} rowId
   * @returns {function}
   */
  handleClick = (rowId: number) => () => {
    if (this.props.header && rowId === 0) {
      return
    }
    const realRowId = this.props.header ? rowId - 1 : rowId
    if (this.props.selectable) {
      const selectedIndex = this.state.selectedIndex === rowId ? -1 : rowId
      this.setState(prevState => ({ ...prevState, selectedIndex }))
      if (this.props.onClick) {
        this.props.onClick(realRowId, selectedIndex)
      }
      return
    }
    if (this.props.onClick) {
      this.props.onClick(realRowId)
    }
  }

  /**
   * Component render function.
   * @memberOf ItemsList
   * @method ItemsList#render
   * @returns {*}
   */
  render() {
    // console.log('ItemsList render')
    const { data, size, align, onClick, selectable, render, RenderComponent, ...props }: ItemsListProps = this.props
    const { selectedIndex } = this.state

    const rows = data ? data.map(row =>
      ({
        key: row.id,
        id: row.id,
        onClick: (selectable || onClick) ? this.memoizedHandleClick(row.id) : null,
        size: row.size || size,
        align: row.align || align,
        items: row.items,
        selectable,
        selected: selectable && selectedIndex === row.id,
      })) : null
    let rendered: Node
    if (render) {
      rendered = render({ ...props, rows })
    } else {
      rendered = RenderComponent ? <RenderComponent {...props} rows={rows} /> : null
    }
    return rendered
  }
}
