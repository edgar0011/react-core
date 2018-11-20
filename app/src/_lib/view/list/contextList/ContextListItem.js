// @flow

import React, { PureComponent } from 'react'
import type { Node } from 'react'
import { clickHandler } from '../../utils'
import type { HeadlessRender } from '../../common/HeadlessComponentBase'

type ContextListItemProps = {
  item: { id: number | string },
  activeId?: number | string,
  idPropName: string,
  title?: string,
  description?: string,
  active?: boolean,
  onItemClickHandler: (item: Object) => void,
} & HeadlessRender

/**
 * @class
 * @name ContextListItem
 * @desc Context List item component.
 * @prop {string} item Context List item to display.
 * @prop {number|string} activeId Optional identifier of active item inside Context List.
 * @prop {string} idPropName ??????? TODO Podlipny doplni
 * @prop {string} title Optional item title text string.
 * @prop {string} description Optional item description text string.
 * @prop {string} active Optional unique Context List identifier.
 * @prop {function} onItemClickHandler delegating onClick of an item
 * @prop {function} render Render function must be specified unless RenderComponent is specified.
 * @prop {ComponentType} RenderComponent Render component must be specified unless render function is specified.
 */
class ContextListItem extends PureComponent<ContextListItemProps> {
  constructor(props: ContextListItemProps) {
    super(props)
  }

  keyDownHandler = (event: SyntheticEvent<EventTarget>): void => {
    if (clickHandler(event)) {
      const { item, idPropName, onItemClickHandler }: ContextListItemProps = this.props
      onItemClickHandler(item[idPropName])
    }
  }

  props: ContextListItemProps

  render() {
    const {
      item, idPropName, activeId, onItemClickHandler, render, RenderComponent, ...props
    }: ContextListItemProps = this.props
    const isActive: boolean = activeId === item[idPropName]

    let rendered: Node
    if (render) {
      rendered = render({ ...props, ...item, active: isActive })
    } else {
      rendered = RenderComponent ? (
        <RenderComponent
          {...props}
          {...item}
          active={isActive}
        />
      ) : null
    }
    // TODO memoize handlers
    return (
      <div tabIndex='0' role='menu' onClick={onItemClickHandler(item[idPropName])} onKeyUp={this.keyDownHandler}>
        {rendered}
      </div>
    )
  }
}

export default ContextListItem
