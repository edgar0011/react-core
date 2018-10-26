import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

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
export default class TreeList extends PureComponent {
  static propTypes = {
    treeListData: PropTypes.shape({
      columns: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        label: PropTypes.string
      })).isRequired,
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        label: PropTypes.string,
        collapsed: PropTypes.bool,
        columns: PropTypes.arrayOf(PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.object,
          PropTypes.string
        ])).isRequired,
        children: PropTypes.arrayOf(PropTypes.object)
      })).isRequired,
      onArrowClick: PropTypes.func,
      onCheckboxClick: PropTypes.func
    }),
    editable: PropTypes.bool,
    headerTitle: PropTypes.string,
    headerNodeStyle: PropTypes.object,
    headerJustify: PropTypes.string,
    render: PropTypes.func,
    RenderComponent: PropTypes.any
  }

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

  render() {
    const { treeListData, render, RenderComponent, ...props } = this.props
    const { data } = treeListData

    let rendered
    if (render) {
      rendered = render({ treeListData, data: [...data], ...props })
    } else {
      rendered = (
        <RenderComponent
          treeListData={treeListData}
          data={[...data]}
          {...props}
        />
      )
    }
    return rendered
  }
}
