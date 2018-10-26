// @flow

import React, { PureComponent } from 'react'
import type { Node } from 'react'

import type { HeadlessRender } from '../common/HeadlessComponentBase'
import SwitchInputTreeListNode from './SwitchInputTreeListNode'

import type { ValuesType, OptionTypesWithValue, OptionTypeWithValue } from './SwitchInput'

type NodeType = {
  nodeLabel: string,
  options: OptionTypesWithValue,
  value: ValuesType,
  onChange?: ({ target: { value: ?any }}) => void,
}
type SwitchInputTreeProps = {
  nodes: ?Array<NodeType>,
  label: string,
  components: {
    option: HeadlessRender,
    select: HeadlessRender
  }
} & HeadlessRender

/**
 * @class
 * @name SwitchInputTree
 * @classdesc Displays switch input tree.
 * @extends PureComponent
 *
 * @prop {function} render Render function must be specified unless RenderComponent is specified.
 * @prop {ComponentType} RenderComponent Render component must be specified unless render function is specified.
 * @prop {Array<{ nodeLabel: string, options: any[], value: any[], onChange: function }>} nodes Nodes data container.
 * @prop {string} label Label test.
 * @prop {Object} components Render configuration container.
 * @prop {Object} components.option Option render configuration container.
 * @prop {function} components.option.render Option render function.
 * @prop {any} components.option.RenderComponent Option render component.
 * @prop {Object} components.select Select render configuration container.
 * @prop {function} components.select.render Select render function.
 * @prop {any} components.select.RenderComponent Select render component.
 */
export default class SwitchInputTree extends PureComponent<SwitchInputTreeProps> {
  constructor(props: SwitchInputTreeProps) {
    super(props)
  }

  props: SwitchInputTreeProps
  /**
   * Click handler for switching selected options.
   * @memberOf SwitchInputTree
   * @method SwitchInputTree#clickHandler
   * @param {*} selected Selected flag.
   */
  clickHandler = (selected: boolean) => {
    if (this.props.nodes) {
      this.props.nodes.forEach((node: NodeType) => {
        if (node.onChange) {
          node.onChange(
            { target: { value: selected ? [] : node.options.map((option: OptionTypeWithValue) => option.value) } })
        }
      })
    }
  }

  /**
   * Switch input tree list node render function.
   * @memberOf SwitchInputTree
   * @method SwitchInputTree#renderNode
   * @param {string} id Node identifier.
   * @param {Array<*>} itemProps Item props.
   * @returns {*}
   */
  renderNode = ({ id, ...itemProps }: { id: string | number, ...any }) =>
    <SwitchInputTreeListNode key={id} {...itemProps} />

  /**
   * Component render function.
   * @memberOf SwitchInputTree
   * @method SwitchInputTree#render
   * @returns {*}
   */
  render() {
    const { nodes, label,
      components: { select: { render, RenderComponent } }, ...props }: SwitchInputTreeProps = this.props
    const nodesWithIds = nodes ? nodes.map((node, id) => ({ id, ...props, ...node })) : null

    const allSelected = nodes ? nodes.every(({ options, value }) => value.length === options.length) : false
    let renderedSelect: Node
    const selectProps = {
      bordered: true,
      selected: allSelected,
      label,
      onClick: this.clickHandler,
      style: { margin: '10px', marginRight: '0', padding: '5px' }
    }
    if (render) {
      renderedSelect = render(selectProps)
    } else {
      renderedSelect = RenderComponent ? <RenderComponent {...selectProps} /> : null
    }
    return (
      <div style={{ width: '100%' }}>
        <div>
          {renderedSelect}
        </div>
        {nodesWithIds && nodesWithIds.map(this.renderNode)}
      </div>
    )
  }
}
