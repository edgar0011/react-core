// @flow

import React, { PureComponent } from 'react'
import { memoize } from 'lodash'

import type { HeadlessRender } from '../../common/HeadlessComponentBase'

type PaginationProps = {
  forcePage: ?number,
  pageCount: ?number,
  pageSize: ?number,
  totalResults: ?number,
  onChangePage: Function
}

type Props = {
  name: ?string,
  activeId: ?number | ?string,
  data: Array<{ id: string | number }>,
  idPropName: string,
  height: string,
  enableAutoScroll?: boolean,
  loading: boolean,
  paginationProps: ?PaginationProps,
  onItemClick: ?Function} & HeadlessRender

type State = {
  top: number
}

/**
 * @class
 * @name ContextList
 * @desc Displays Context List component.
 * @prop {?string} name Optional unique Context List identifier.
 * @prop {?number|string} activeId Optional identifier of active item inside Context List.
 * @prop {Object} data Required data represents items to display inside Context List.
 * @prop {?string} idPropName Optional custom identifier of items.
 * @prop {?string} height Optional unique Context List identifier.
 * @prop {?bool} enableAutoScroll Optional flag for enabling/disabling auto scroll functionality
 *  bound to screen location.
 * @prop {bool} loading Optional flag to show loading indicator.
 * @prop {?Object} paginationProps Optional pagination properties
 * @prop {?number} paginationProps.forcePage Selected page from controlling component
 * @prop {?number} paginationProps.pageCount number of pages
 * @prop {?number} paginationProps.pageSize number of items/rows in page
 * @prop {?number} paginationProps.totalResults total number of items/rows
 * @prop {Function} paginationProps.onChangePage total number of items/rows
 * @prop {?Function} onItemClick Event handler for item click event.
 * @prop {?Function} render Render function must be specified unless RenderComponent is specified.
 * @prop {ComponentType} RenderComponent Render component must be specified unless render function is specified.
 */
export default class ContextList extends PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = { top: 0 }

    this.memoizedClickHandler = memoize(this.onItemClickHandler)
  }
  state: State

  /**
   * Component componentDidMount lifecycle method
   * @memberOf ContextList
   * @method ContextList#componentDidMount
   * @returns {*}
   */
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  /**
   * Component componentWillUnmount lifecycle method
   * @memberOf ContextList
   * @method ContextList#componentWillUnmount
   * @returns {*}
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  onItemClickHandler = (id: number) => (event: SyntheticEvent<EventTarget>) => {
    const { onItemClick } = this.props
    if (onItemClick) {
      onItemClick(id, event)
    }
  }

  props: Props
  memoizedClickHandler: Function

  pageCount = (paginationProps: PaginationProps) => {
    if (!paginationProps || !paginationProps.pageCount) {
      const pageSize = paginationProps && paginationProps.pageSize ? paginationProps.pageSize : 10
      const totalResults = paginationProps && paginationProps.totalResults ? paginationProps.totalResults : 111
      return Math.ceil(totalResults / pageSize)
    }
    return paginationProps.pageCount
  }

  handleScroll = () => {
    const lastScrollY = window.scrollY
    this.setState({
      top: lastScrollY
    })
  }

  render() {
    const { top }: State = this.state
    const { render, RenderComponent, paginationProps, ...props }: Props = this.props
    const pageCount: number = paginationProps ? this.pageCount(paginationProps) : 0

    let rendered: any
    if (render) {
      rendered = render({
        ...props,
        top,
        pageCount,
        paginationProps,
        onItemClickHandler: this.memoizedClickHandler
      })
    } else {
      rendered = RenderComponent
        ? (<RenderComponent
          {...props}
          top={top}
          pageCount={pageCount}
          paginationProps={paginationProps}
          onItemClickHandler={this.memoizedClickHandler}
        />)
        : null
    }
    return rendered
  }
}
