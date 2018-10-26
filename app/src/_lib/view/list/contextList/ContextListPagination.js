// @flow
import React, { PureComponent } from 'react'
import type { Node } from 'react'
import type { HeadlessRender } from '../../common/HeadlessComponentBase'

type ContextListPaginationProps = {
  forcePage?: number,
  pageCount?: number,
  onChangePage: Function,
  disabled?: boolean
} & HeadlessRender
/**
 * @class
 * @name ContextListPagination
 * @desc Context List pagination component.
 * @prop {number} forcePage Active selected page.
 * @prop {number} pageCount Total page count.
 * @prop {func} onChangePage Required event handler for Change page event.
 * @prop {bool} disabled Optional flag for enabling/disabling functionality to change page
 *  via left|right button or keyboard arrows.
 * @prop {function} render Render function must be specified unless RenderComponent is specified.
 * @prop {ComponentType} RenderComponent Render component must be specified unless render function is specified.
 */
class ContextListPagination extends PureComponent<ContextListPaginationProps> {

  constructor(props: ContextListPaginationProps) {
    super(props)
  }
  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  onChangePageHandler = (pageId: number) => (event: SyntheticEvent<EventTarget>) => {
    const { onChangePage } = this.props

    if (onChangePage) {
      onChangePage({ selected: pageId }, event)
    }
  }

  handleKeyDown = (event: SyntheticKeyboardEvent<EventTarget>) => {
    const { pageCount, disabled, onChangePage
    }: ContextListPaginationProps = this.props
    const forcePage = this.props.forcePage || 0
    const previousDisabled = forcePage + 1 === 1 || disabled
    const nextDisabled = forcePage + 1 === pageCount || disabled
    if (onChangePage && event.keyCode === 37 && !previousDisabled) {
      onChangePage({ selected: forcePage - 1 }, event)
    }
    if (onChangePage && event.keyCode === 39 && !nextDisabled) {
      onChangePage({ selected: forcePage + 1 }, event)
    }
  }

  props: ContextListPaginationProps

  render() {
    const { pageCount, forcePage, render, RenderComponent, disabled, ...props }: ContextListPaginationProps = this.props
    const currentPage = forcePage + 1
    const previousDisabled = currentPage === 1 || disabled
    const nextDisabled = currentPage === pageCount || disabled

    let rendered: Node
    if (render) {
      rendered = render({
        ...props,
        pageCount,
        currentPage,
        previousDisabled,
        nextDisabled,
        onChangePageHandler: this.onChangePageHandler
      })
    } else {
      rendered = RenderComponent ? (
        <RenderComponent
          {...props}
          pageCount={pageCount}
          forcePage={forcePage}
          currentPage={currentPage}
          previousDisabled={previousDisabled}
          nextDisabled={nextDisabled}
          onChangePageHandler={this.onChangePageHandler}
        />
      ) : null
    }
    return rendered
  }
}

export default ContextListPagination
