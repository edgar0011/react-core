import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class FilterTableComponent extends PureComponent {
  static instanceNum = 0
  static propTypes = {
    name: PropTypes.string,
    labels: PropTypes.object.isRequired,
    tableData: PropTypes.shape({
      columns: PropTypes.array.isRequired,
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired })),
      options: PropTypes.shape({
        tableId: PropTypes.string.isRequired,
        selectable: PropTypes.bool,
        allSelectable: PropTypes.bool,
        noHeader: PropTypes.bool,
        light: PropTypes.bool,
        onSortClick: PropTypes.func,
        onRowClick: PropTypes.func,
        onHeaderClick: PropTypes.func,
        onCellClick: PropTypes.func,
        onSelectRow: PropTypes.func,
        onSelectAllRows: PropTypes.func
      }).isRequired,
      renderPagination: PropTypes.func,
      selection: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
      sorting: PropTypes.shape({ columnTitle: PropTypes.string, direction: PropTypes.string })
    }),
    formData: PropTypes.shape({
      fields: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      }).isRequired),
      errors: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.string.isRequired,
        message: PropTypes.string
      })), PropTypes.any]),
      onChangeHandler: PropTypes.func,
      onBlurHandler: PropTypes.func,
      onFocusHandler: PropTypes.func,
      onSubmitHandler: PropTypes.func.isRequired,
      onResetHandler: PropTypes.func.isRequired,
      enableToggleMode: PropTypes.bool
    }),

    additionalRender: PropTypes.shape({
      top: PropTypes.func,
      middle: PropTypes.func,
      bottom: PropTypes.func,
      foot: PropTypes.func,
      renderPagination: PropTypes.func
    }),
    loading: PropTypes.bool,
    paginationProps: PropTypes.shape({
      initialPage: PropTypes.number,
      pageCount: PropTypes.number,
      pageSize: PropTypes.number,
      totalResults: PropTypes.number,
      onChangePage: PropTypes.func.isRequired
    }),
    translations: PropTypes.object,
    showPagination: PropTypes.bool,
    showExport: PropTypes.bool,
    exportLoading: PropTypes.bool,
    onUnmountHandler: PropTypes.func,
    components: PropTypes.shape({
      Filter: PropTypes.any,
      TablePagination: PropTypes.any,
      Table: PropTypes.any,
      Export: PropTypes.any,
      noDataComponent: PropTypes.any,
      loadingDataComponent: PropTypes.any,
      Loader: PropTypes.any,
      LoadingData: PropTypes.any
    })
  }

  static defaultProps = {
    translations: {}
  }

  constructor(props) {
    super(props)
    FilterTableComponent.instanceNum += 1
    this.instanceName = `filterTable-${FilterTableComponent.instanceNum}`
  }

  componentWillUnmount() {
    if (this.props.onUnmountHandler) {
      this.props.onUnmountHandler()
    }
  }

  renderPaginationMethodPropsWrapper = (tableProps) => {
    const tablePaginationProps = {
      paginationProps: this.props.paginationProps,
      showExport: this.props.showExport,
      exportLoading: this.props.exportLoading,
      translations: this.props.translations,
      ...tableProps
    }

    const renderPaginationMethod = this.props.additionalRender && this.props.additionalRender.renderPagination ?
      this.props.additionalRender.renderPagination : null

    if (renderPaginationMethod) {
      return renderPaginationMethod(tablePaginationProps)
    }
    return <this.props.components.TablePagination {...tablePaginationProps} />
  }

  render() {
    const { name, formData, tableData, labels, loading, additionalRender, showPagination,
      components: {
        noDataComponent, loadingDataComponent, Filter, Table, Export, Loader, LoadingData
      }, showExport, translations } = this.props

    const NoDataCompo = noDataComponent || <h1><LoadingData description={labels.noData || 'No results found...'} /></h1>
    const LoadingDataCompo = loadingDataComponent || <h1><LoadingData description={labels.loadingData} /></h1>

    if (showExport) {
      // TODO if rightTabContent is already set, wrap around
      tableData.rightTabContent = <Export {...this.props} />
    }
    tableData.renderPagination = showPagination ? this.renderPaginationMethodPropsWrapper : null

    return (
      <div id={name || this.instanceName}>
        {additionalRender && additionalRender.top && additionalRender.top({ ...this.props })}
        {formData &&
        <Filter
          formName={formData.formName || `${name || this.instanceName}-form`}
          {...formData}
          translations={translations}
        />}
        {additionalRender && additionalRender.middle && additionalRender.middle({ ...this.props })}
        {loading &&
        <Loader text={labels.loading} />}
        {(tableData.data && tableData.data.length > 0) &&
        <Table
          tableData={tableData}
        />}
        {(!loading && (!tableData.data || !tableData.data.length)) && NoDataCompo}
        {(loading && LoadingDataCompo && !tableData.data) && LoadingDataCompo}
        {additionalRender && additionalRender.bottom && additionalRender.bottom({ ...this.props })}
        {additionalRender && additionalRender.foot && additionalRender.foot({ ...this.props })}
      </div>
    )
  }
}
