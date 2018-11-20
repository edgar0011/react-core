// @flow

import React, { PureComponent } from 'react'
import type { Node } from 'react'
import type { HeadlessRender } from '../../common/HeadlessComponentBase'


export type Column = {
  id: number | string,
  label?: string
}

export type DataItem = {
  id: number | string,
  label?: string,
  collapsed?: boolean,
  columns: Array<boolean | Object | string>,
  children: Array<DataItem>
}

type TreeListProps = {
  treeListData: {
    columns: ?Array<Column>,
    data: ?Array<DataItem>,
    onArrowClick: Function,
    onCheckboxClick: Function
  },
  editable?: boolean,
  headerTitle: string,
  headerNodeStyle: Object,
  headerJustify: string
} & HeadlessRender

/**
 * @class
 * @name TreeList
 * @desc Displays Tree List component.
 * @prop {Object} treeListData Required data represents nodes to display inside Tree List.
 * @prop {Array} treeListData.columns column data
 * @prop {Array} treeListData.data actual items
 * @prop {string} treeListData.data.id item id
 * @prop {string} treeListData.data.label item label
 * @prop {boolean} treeListData.data.collapsed flag whether is item/row collapsed
 * @prop {Array} treeListData.data.columns nested items, children columns
 * @prop {Array} treeListData.data.children nested items, children data
 * @prop {?bool} editable Optional flag for enabling/disabling editable state of Tree List.
 * @prop {?string} headerTitle Optional header title string.
 * @prop {?object} headerNodeStyle Optional style of header node.
 * @prop {?string} headerJustify Optional flex justify representation.
 * @prop {?Function} render Render function must be specified unless RenderComponent is specified.
 * @prop {?any} RenderComponent Render component must be specified unless render function is specified.
 */
export default class TreeList extends PureComponent<TreeListProps> {

  static defaultProps = {
    treeListData: {
      // TODO static instance num, as in FormFilterComponent
      treeListId: 'treeListComponent',
      columns: [{ id: 1, label: '' }],
      data: [
        {
          id: 0,
          label: '',
          collapsed: false,
          columns: [
          ]
        }]
    },
    editable: false,
    headerTitle: '',
    headerJustify: 'flex-end'
  }

  props: TreeListProps

  render() {
    const { treeListData, render, RenderComponent, ...props }: TreeListProps = this.props
    const { data }: { data: ?Array<DataItem> } = treeListData

    let rendered: Node
    if (render) {
      rendered = render({ treeListData, data: data ? data.concat() : null, ...props })
    } else {
      rendered = RenderComponent ? (
        <RenderComponent
          treeListData={treeListData}
          data={data ? data.concat() : null}
          {...props}
        />
      ) : null
    }
    return rendered
  }
}
