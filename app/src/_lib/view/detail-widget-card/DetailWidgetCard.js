// @flow

import React, { PureComponent } from 'react'
import type { ComponentType, Node } from 'react'
import { mapItemsInGroup } from './helpers/itemMappers'
import type { HeadlessRender } from '../common/HeadlessComponentBase'


type DetailWidgetCardProps = {
  opened?: boolean,
  label?: string,
  icon?: ComponentType<any>,
  data: ?(Object | Object[]),
  itemNames?: string[],
  mapping?: Object,
  translations?: Object,
  nullValueVisible?: boolean,
  collapsible?: boolean
} & HeadlessRender

type Header = {
  label: string,
  icon: ComponentType<any>,
  collapsible?: boolean,
  isOpen?: boolean,
  clickHandler: Function
}

type Field = {
  key: string,
  label: string,
  value: any
}

type DetailWidgetCardRowProps = {
  isOpen?: boolean,
  header?: ?Header,
  fields?: ?Field[],
  collapsible?: boolean,
  translations?: Object,
}

type DetailWidgetCardState = {
  opened?: boolean,
  initialOpened?: boolean
}

/**
 * @class
 * @name DetailWidgetCard
 * @classdesc Displays detail data panel.
 * @extends PureComponent
 *
 * @prop {function} render Render function must be specified unless RenderComponent is specified.
 * @prop {ComponentType} RenderComponent Render component must be specified unless render function is specified.
 * @prop {boolean} opened Flag for setting whether component is opened or collapsed on init.
 * @prop {string} label Panel label text string.
 * @prop {any} icon Panel label icon element.
 * @prop {Object|Object[]} data Object containing data to be extracted.
 * @prop {string[]} itemNames Array of property names that should be extracted from data object for each panel row.
 *  The order of names matters and is preserved in rendered output.
 * @prop {Object} mapping Advanced property name based mapping configuration object typically used for
 *  data conversion to required format. Each callback receives particular value and all the data as second
 *  parameter: `propName: (propValue, data) => any`.
 * @prop {Object} translations Text localizations data.
 * @prop {boolean} nullValueVisible Flag that forces displaying falsy values.
 * @prop {boolean} collapsible Flag for rendering component as collapsible.
 */
class DetailWidgetCard extends PureComponent<DetailWidgetCardProps, DetailWidgetCardState> {

  constructor(props: DetailWidgetCardProps) {
    super(props)
    this.state = {
      opened: false,
      initialOpened: this.props.opened
    }
  }

  state: DetailWidgetCardState
  props: DetailWidgetCardProps

  /**
   * Click handler for switching opened state.
   * @memberOf DetailWidgetCard
   * @method DetailWidgetCard#clickHandler
   */
  clickHandler = () => {
    this.setState(prevState => ({
      opened: prevState.initialOpened ? false : !prevState.opened,
      initialOpened: false
    }))
  }

  /**
   * Component render function.
   * @memberOf DetailWidgetCard
   * @method DetailWidgetCard#render
   * @returns {*}
   */
  render() {
    const {
      render,
      RenderComponent,
      label,
      icon,
      itemNames,
      data,
      mapping,
      translations,
      nullValueVisible,
      collapsible,
      ...props
    }: DetailWidgetCardProps = this.props

    const { opened, initialOpened }: DetailWidgetCardState = this.state
    const isOpen: boolean = Boolean(opened || initialOpened)
    const mappedItems = mapItemsInGroup(
      label, icon, itemNames, data, mapping, translations, nullValueVisible,
      { clickHandler: this.clickHandler, isOpen, collapsible }
    )
    const [header, fields] = itemNames && itemNames.length && mappedItems
      ? mappedItems
      : []

    const viewProps: DetailWidgetCardRowProps = {
      isOpen,
      header,
      fields,
      collapsible,
      translations,
      ...props
    }

    let rendered: Node
    if (render) {
      rendered = render(viewProps)
    } else {
      rendered = RenderComponent
        ? <RenderComponent {...viewProps} />
        : null
    }
    return rendered
  }
}

export default DetailWidgetCard
