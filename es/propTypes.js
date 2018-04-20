import PropTypes from 'prop-types';

export default {
  // General
  data: PropTypes.array,
  loading: PropTypes.bool,
  showPagination: PropTypes.bool,
  showPaginationTop: PropTypes.bool,
  showPaginationBottom: PropTypes.bool,
  showPageSizeOptions: PropTypes.bool,
  pageSizeOptions: PropTypes.array,
  defaultPageSize: PropTypes.number,
  showPageJump: PropTypes.bool,
  collapseOnSortingChange: PropTypes.bool,
  collapseOnPageChange: PropTypes.bool,
  collapseOnDataChange: PropTypes.bool,
  freezeWhenExpanded: PropTypes.bool,
  sortable: PropTypes.bool,
  resizable: PropTypes.bool,
  filterable: PropTypes.bool,
  defaultSortDesc: PropTypes.bool,
  defaultSorted: PropTypes.array,
  defaultFiltered: PropTypes.array,
  defaultResized: PropTypes.array,
  defaultExpanded: PropTypes.object,
  defaultFilterMethod: PropTypes.func,
  defaultSortMethod: PropTypes.func,

  // Controlled State Callbacks
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  onSortedChange: PropTypes.func,
  onFilteredChange: PropTypes.func,
  onResizedChange: PropTypes.func,
  onExpandedChange: PropTypes.func,

  // Pivoting
  pivotBy: PropTypes.array,

  // Key Constants
  pivotValKey: PropTypes.string,
  pivotIDKey: PropTypes.string,
  subRowsKey: PropTypes.string,
  aggregatedKey: PropTypes.string,
  nestingLevelKey: PropTypes.string,
  originalKey: PropTypes.string,
  indexKey: PropTypes.string,
  groupedByPivotKey: PropTypes.string,

  // Server-side Callbacks
  onFetchData: PropTypes.func,

  // Classes
  className: PropTypes.string,
  style: PropTypes.object,

  // Component decorators
  getProps: PropTypes.func,
  getTableProps: PropTypes.func,
  getTheadGroupProps: PropTypes.func,
  getTheadGroupTrProps: PropTypes.func,
  getTheadGroupThProps: PropTypes.func,
  getTheadProps: PropTypes.func,
  getTheadTrProps: PropTypes.func,
  getTheadThProps: PropTypes.func,
  getTheadFilterProps: PropTypes.func,
  getTheadFilterTrProps: PropTypes.func,
  getTheadFilterThProps: PropTypes.func,
  getTbodyProps: PropTypes.func,
  getTrGroupProps: PropTypes.func,
  getTrProps: PropTypes.func,
  getTdProps: PropTypes.func,
  getTfootProps: PropTypes.func,
  getTfootTrProps: PropTypes.func,
  getTfootTdProps: PropTypes.func,
  getPaginationProps: PropTypes.func,
  getLoadingProps: PropTypes.func,
  getNoDataProps: PropTypes.func,
  getResizerProps: PropTypes.func,

  // Global Column Defaults
  columns: PropTypes.arrayOf(PropTypes.shape({
    // Renderers
    Cell: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]),
    Header: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]),
    Footer: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]),
    Aggregated: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]),
    Pivot: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]),
    PivotValue: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]),
    Expander: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]),
    Filter: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

    // All Columns
    sortable: PropTypes.bool, // use table default
    resizable: PropTypes.bool, // use table default
    filterable: PropTypes.bool, // use table default
    show: PropTypes.bool,
    minWidth: PropTypes.number,

    // Cells only
    className: PropTypes.string,
    style: PropTypes.object,
    getProps: PropTypes.func,

    // Pivot only
    aggregate: PropTypes.func,

    // Headers only
    headerClassName: PropTypes.string,
    headerStyle: PropTypes.object,
    getHeaderProps: PropTypes.func,

    // Footers only
    footerClassName: PropTypes.string,
    footerStyle: PropTypes.object,
    getFooterProps: PropTypes.object,
    filterMethod: PropTypes.func,
    filterAll: PropTypes.bool,
    sortMethod: PropTypes.func
  })),

  // Global Expander Column Defaults
  expanderDefaults: PropTypes.shape({
    sortable: PropTypes.bool,
    resizable: PropTypes.bool,
    filterable: PropTypes.bool,
    width: PropTypes.number
  }),

  pivotDefaults: PropTypes.object,

  // Text
  previousText: PropTypes.node,
  nextText: PropTypes.node,
  loadingText: PropTypes.node,
  noDataText: PropTypes.node,
  pageText: PropTypes.node,
  ofText: PropTypes.node,
  rowsText: PropTypes.node,

  // Components
  TableComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  TheadComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  TbodyComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  TrGroupComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  TrComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  ThComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  TdComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  TfootComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  FilterComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  ExpanderComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  PivotValueComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  AggregatedComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  // this is a computed default generated using
  PivotComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  // the ExpanderComponent and PivotValueComponent at run-time in methods.js
  PaginationComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  PreviousComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  NextComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  LoadingComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  NoDataComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  ResizerComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  PadRowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9wVHlwZXMuanMiXSwibmFtZXMiOlsiUHJvcFR5cGVzIiwiZGF0YSIsImFycmF5IiwibG9hZGluZyIsImJvb2wiLCJzaG93UGFnaW5hdGlvbiIsInNob3dQYWdpbmF0aW9uVG9wIiwic2hvd1BhZ2luYXRpb25Cb3R0b20iLCJzaG93UGFnZVNpemVPcHRpb25zIiwicGFnZVNpemVPcHRpb25zIiwiZGVmYXVsdFBhZ2VTaXplIiwibnVtYmVyIiwic2hvd1BhZ2VKdW1wIiwiY29sbGFwc2VPblNvcnRpbmdDaGFuZ2UiLCJjb2xsYXBzZU9uUGFnZUNoYW5nZSIsImNvbGxhcHNlT25EYXRhQ2hhbmdlIiwiZnJlZXplV2hlbkV4cGFuZGVkIiwic29ydGFibGUiLCJyZXNpemFibGUiLCJmaWx0ZXJhYmxlIiwiZGVmYXVsdFNvcnREZXNjIiwiZGVmYXVsdFNvcnRlZCIsImRlZmF1bHRGaWx0ZXJlZCIsImRlZmF1bHRSZXNpemVkIiwiZGVmYXVsdEV4cGFuZGVkIiwib2JqZWN0IiwiZGVmYXVsdEZpbHRlck1ldGhvZCIsImZ1bmMiLCJkZWZhdWx0U29ydE1ldGhvZCIsIm9uUGFnZUNoYW5nZSIsIm9uUGFnZVNpemVDaGFuZ2UiLCJvblNvcnRlZENoYW5nZSIsIm9uRmlsdGVyZWRDaGFuZ2UiLCJvblJlc2l6ZWRDaGFuZ2UiLCJvbkV4cGFuZGVkQ2hhbmdlIiwicGl2b3RCeSIsInBpdm90VmFsS2V5Iiwic3RyaW5nIiwicGl2b3RJREtleSIsInN1YlJvd3NLZXkiLCJhZ2dyZWdhdGVkS2V5IiwibmVzdGluZ0xldmVsS2V5Iiwib3JpZ2luYWxLZXkiLCJpbmRleEtleSIsImdyb3VwZWRCeVBpdm90S2V5Iiwib25GZXRjaERhdGEiLCJjbGFzc05hbWUiLCJzdHlsZSIsImdldFByb3BzIiwiZ2V0VGFibGVQcm9wcyIsImdldFRoZWFkR3JvdXBQcm9wcyIsImdldFRoZWFkR3JvdXBUclByb3BzIiwiZ2V0VGhlYWRHcm91cFRoUHJvcHMiLCJnZXRUaGVhZFByb3BzIiwiZ2V0VGhlYWRUclByb3BzIiwiZ2V0VGhlYWRUaFByb3BzIiwiZ2V0VGhlYWRGaWx0ZXJQcm9wcyIsImdldFRoZWFkRmlsdGVyVHJQcm9wcyIsImdldFRoZWFkRmlsdGVyVGhQcm9wcyIsImdldFRib2R5UHJvcHMiLCJnZXRUckdyb3VwUHJvcHMiLCJnZXRUclByb3BzIiwiZ2V0VGRQcm9wcyIsImdldFRmb290UHJvcHMiLCJnZXRUZm9vdFRyUHJvcHMiLCJnZXRUZm9vdFRkUHJvcHMiLCJnZXRQYWdpbmF0aW9uUHJvcHMiLCJnZXRMb2FkaW5nUHJvcHMiLCJnZXROb0RhdGFQcm9wcyIsImdldFJlc2l6ZXJQcm9wcyIsImNvbHVtbnMiLCJhcnJheU9mIiwic2hhcGUiLCJDZWxsIiwib25lT2ZUeXBlIiwiZWxlbWVudCIsIkhlYWRlciIsIkZvb3RlciIsIkFnZ3JlZ2F0ZWQiLCJQaXZvdCIsIlBpdm90VmFsdWUiLCJFeHBhbmRlciIsIkZpbHRlciIsInNob3ciLCJtaW5XaWR0aCIsImFnZ3JlZ2F0ZSIsImhlYWRlckNsYXNzTmFtZSIsImhlYWRlclN0eWxlIiwiZ2V0SGVhZGVyUHJvcHMiLCJmb290ZXJDbGFzc05hbWUiLCJmb290ZXJTdHlsZSIsImdldEZvb3RlclByb3BzIiwiZmlsdGVyTWV0aG9kIiwiZmlsdGVyQWxsIiwic29ydE1ldGhvZCIsImV4cGFuZGVyRGVmYXVsdHMiLCJ3aWR0aCIsInBpdm90RGVmYXVsdHMiLCJwcmV2aW91c1RleHQiLCJub2RlIiwibmV4dFRleHQiLCJsb2FkaW5nVGV4dCIsIm5vRGF0YVRleHQiLCJwYWdlVGV4dCIsIm9mVGV4dCIsInJvd3NUZXh0IiwiVGFibGVDb21wb25lbnQiLCJUaGVhZENvbXBvbmVudCIsIlRib2R5Q29tcG9uZW50IiwiVHJHcm91cENvbXBvbmVudCIsIlRyQ29tcG9uZW50IiwiVGhDb21wb25lbnQiLCJUZENvbXBvbmVudCIsIlRmb290Q29tcG9uZW50IiwiRmlsdGVyQ29tcG9uZW50IiwiRXhwYW5kZXJDb21wb25lbnQiLCJQaXZvdFZhbHVlQ29tcG9uZW50IiwiQWdncmVnYXRlZENvbXBvbmVudCIsIlBpdm90Q29tcG9uZW50IiwiUGFnaW5hdGlvbkNvbXBvbmVudCIsIlByZXZpb3VzQ29tcG9uZW50IiwiTmV4dENvbXBvbmVudCIsIkxvYWRpbmdDb21wb25lbnQiLCJOb0RhdGFDb21wb25lbnQiLCJSZXNpemVyQ29tcG9uZW50IiwiUGFkUm93Q29tcG9uZW50Il0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxTQUFQLE1BQXNCLFlBQXRCOztBQUVBLGVBQWU7QUFDYjtBQUNBQyxRQUFNRCxVQUFVRSxLQUZIO0FBR2JDLFdBQVNILFVBQVVJLElBSE47QUFJYkMsa0JBQWdCTCxVQUFVSSxJQUpiO0FBS2JFLHFCQUFtQk4sVUFBVUksSUFMaEI7QUFNYkcsd0JBQXNCUCxVQUFVSSxJQU5uQjtBQU9iSSx1QkFBcUJSLFVBQVVJLElBUGxCO0FBUWJLLG1CQUFpQlQsVUFBVUUsS0FSZDtBQVNiUSxtQkFBaUJWLFVBQVVXLE1BVGQ7QUFVYkMsZ0JBQWNaLFVBQVVJLElBVlg7QUFXYlMsMkJBQXlCYixVQUFVSSxJQVh0QjtBQVliVSx3QkFBc0JkLFVBQVVJLElBWm5CO0FBYWJXLHdCQUFzQmYsVUFBVUksSUFibkI7QUFjYlksc0JBQW9CaEIsVUFBVUksSUFkakI7QUFlYmEsWUFBVWpCLFVBQVVJLElBZlA7QUFnQmJjLGFBQVdsQixVQUFVSSxJQWhCUjtBQWlCYmUsY0FBWW5CLFVBQVVJLElBakJUO0FBa0JiZ0IsbUJBQWlCcEIsVUFBVUksSUFsQmQ7QUFtQmJpQixpQkFBZXJCLFVBQVVFLEtBbkJaO0FBb0Jib0IsbUJBQWlCdEIsVUFBVUUsS0FwQmQ7QUFxQmJxQixrQkFBZ0J2QixVQUFVRSxLQXJCYjtBQXNCYnNCLG1CQUFpQnhCLFVBQVV5QixNQXRCZDtBQXVCYkMsdUJBQXFCMUIsVUFBVTJCLElBdkJsQjtBQXdCYkMscUJBQW1CNUIsVUFBVTJCLElBeEJoQjs7QUEwQmI7QUFDQUUsZ0JBQWM3QixVQUFVMkIsSUEzQlg7QUE0QmJHLG9CQUFr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RSxVQUFVMkIsSUFBWCxFQUFpQjNCLFVBQVUyRSxPQUEzQixDQUFwQixDQWhLSjtBQWlLYmlELG9CQUFrQjVILFVBQVUwRSxTQUFWLENBQW9CLENBQUMxRSxVQUFVMkIsSUFBWCxFQUFpQjNCLFVBQVUyRSxPQUEzQixDQUFwQixDQWpLTDtBQWtLYmtELG1CQUFpQjdILFVBQVUwRSxTQUFWLENBQW9CLENBQUMxRSxVQUFVMkIsSUFBWCxFQUFpQjNCLFVBQVUyRSxPQUEzQixDQUFwQjtBQWxLSixDQUFmIiwiZmlsZSI6InByb3BUeXBlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvLyBHZW5lcmFsXG4gIGRhdGE6IFByb3BUeXBlcy5hcnJheSxcbiAgbG9hZGluZzogUHJvcFR5cGVzLmJvb2wsXG4gIHNob3dQYWdpbmF0aW9uOiBQcm9wVHlwZXMuYm9vbCxcbiAgc2hvd1BhZ2luYXRpb25Ub3A6IFByb3BUeXBlcy5ib29sLFxuICBzaG93UGFnaW5hdGlvbkJvdHRvbTogUHJvcFR5cGVzLmJvb2wsXG4gIHNob3dQYWdlU2l6ZU9wdGlvbnM6IFByb3BUeXBlcy5ib29sLFxuICBwYWdlU2l6ZU9wdGlvbnM6IFByb3BUeXBlcy5hcnJheSxcbiAgZGVmYXVsdFBhZ2VTaXplOiBQcm9wVHlwZXMubnVtYmVyLFxuICBzaG93UGFnZUp1bXA6IFByb3BUeXBlcy5ib29sLFxuICBjb2xsYXBzZU9uU29ydGluZ0NoYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gIGNvbGxhcHNlT25QYWdlQ2hhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgY29sbGFwc2VPbkRhdGFDaGFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICBmcmVlemVXaGVuRXhwYW5kZWQ6IFByb3BUeXBlcy5ib29sLFxuICBzb3J0YWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gIHJlc2l6YWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gIGZpbHRlcmFibGU6IFByb3BUeXBlcy5ib29sLFxuICBkZWZhdWx0U29ydERlc2M6IFByb3BUeXBlcy5ib29sLFxuICBkZWZhdWx0U29ydGVkOiBQcm9wVHlwZXMuYXJyYXksXG4gIGRlZmF1bHRGaWx0ZXJlZDogUHJvcFR5cGVzLmFycmF5LFxuICBkZWZhdWx0UmVzaXplZDogUHJvcFR5cGVzLmFycmF5LFxuICBkZWZhdWx0RXhwYW5kZWQ6IFByb3BUeXBlcy5vYmplY3QsXG4gIGRlZmF1bHRGaWx0ZXJNZXRob2Q6IFByb3BUeXBlcy5mdW5jLFxuICBkZWZhdWx0U29ydE1ldGhvZDogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLy8gQ29udHJvbGxlZCBTdGF0ZSBDYWxsYmFja3NcbiAgb25QYWdlQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25QYWdlU2l6ZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU29ydGVkQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25GaWx0ZXJlZENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uUmVzaXplZENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uRXhwYW5kZWRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8vIFBpdm90aW5nXG4gIHBpdm90Qnk6IFByb3BUeXBlcy5hcnJheSxcblxuICAvLyBLZXkgQ29uc3RhbnRzXG4gIHBpdm90VmFsS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBwaXZvdElES2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBzdWJSb3dzS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBhZ2dyZWdhdGVkS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBuZXN0aW5nTGV2ZWxLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG9yaWdpbmFsS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBpbmRleEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgZ3JvdXBlZEJ5UGl2b3RLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLy8gU2VydmVyLXNpZGUgQ2FsbGJhY2tzXG4gIG9uRmV0Y2hEYXRhOiBQcm9wVHlwZXMuZnVuYyxcblxuICAvLyBDbGFzc2VzXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG5cbiAgLy8gQ29tcG9uZW50IGRlY29yYXRvcnNcbiAgZ2V0UHJvcHM6IFByb3BUeXBlcy5mdW5jLFxuICBnZXRUYWJsZVByb3BzOiBQcm9wVHlwZXMuZnVuYyxcbiAgZ2V0VGhlYWRHcm91cFByb3BzOiBQcm9wVHlwZXMuZnVuYyxcbiAgZ2V0VGhlYWRHcm91cFRyUHJvcHM6IFByb3BUeXBlcy5mdW5jLFxuICBnZXRUaGVhZEdyb3VwVGhQcm9wczogUHJvcFR5cGVzLmZ1bmMsXG4gIGdldFRoZWFkUHJvcHM6IFByb3BUeXBlcy5mdW5jLFxuICBnZXRUaGVhZFRyUHJvcHM6IFByb3BUeXBlcy5mdW5jLFxuICBnZXRUaGVhZFRoUHJvcHM6IFByb3BUeXBlcy5mdW5jLFxuICBnZXRUaGVhZEZpbHRlclByb3BzOiBQcm9wVHlwZXMuZnVuYyxcbiAgZ2V0VGhlYWRGaWx0ZXJUclByb3BzOiBQcm9wVHlwZXMuZnVuYyxcbiAgZ2V0VGhlYWRGaWx0ZXJUaFByb3BzOiBQcm9wVHlwZXMuZnVuYyxcbiAgZ2V0VGJvZHlQcm9wczogUHJvcFR5cGVzLmZ1bmMsXG4gIGdldFRyR3JvdXBQcm9wczogUHJvcFR5cGVzLmZ1bmMsXG4gIGdldFRyUHJvcHM6IFByb3BUeXBlcy5mdW5jLFxuICBnZXRUZFByb3BzOiBQcm9wVHlwZXMuZnVuYyxcbiAgZ2V0VGZvb3RQcm9wczogUHJvcFR5cGVzLmZ1bmMsXG4gIGdldFRmb290VHJQcm9wczogUHJvcFR5cGVzLmZ1bmMsXG4gIGdldFRmb290VGRQcm9wczogUHJvcFR5cGVzLmZ1bmMsXG4gIGdldFBhZ2luYXRpb25Qcm9wczogUHJvcFR5cGVzLmZ1bmMsXG4gIGdldExvYWRpbmdQcm9wczogUHJvcFR5cGVzLmZ1bmMsXG4gIGdldE5vRGF0YVByb3BzOiBQcm9wVHlwZXMuZnVuYyxcbiAgZ2V0UmVzaXplclByb3BzOiBQcm9wVHlwZXMuZnVuYyxcblxuICAvLyBHbG9iYWwgQ29sdW1uIERlZmF1bHRzXG4gIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAvLyBSZW5kZXJlcnNcbiAgICAgIENlbGw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuY10pLFxuICAgICAgSGVhZGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICAgIEZvb3RlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5mdW5jXSksXG4gICAgICBBZ2dyZWdhdGVkOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICAgIFBpdm90OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICAgIFBpdm90VmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuY10pLFxuICAgICAgRXhwYW5kZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuY10pLFxuICAgICAgRmlsdGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLmZ1bmNdKSxcblxuICAgICAgLy8gQWxsIENvbHVtbnNcbiAgICAgIHNvcnRhYmxlOiBQcm9wVHlwZXMuYm9vbCwgLy8gdXNlIHRhYmxlIGRlZmF1bHRcbiAgICAgIHJlc2l6YWJsZTogUHJvcFR5cGVzLmJvb2wsIC8vIHVzZSB0YWJsZSBkZWZhdWx0XG4gICAgICBmaWx0ZXJhYmxlOiBQcm9wVHlwZXMuYm9vbCwgLy8gdXNlIHRhYmxlIGRlZmF1bHRcbiAgICAgIHNob3c6IFByb3BUeXBlcy5ib29sLFxuICAgICAgbWluV2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG5cbiAgICAgIC8vIENlbGxzIG9ubHlcbiAgICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgZ2V0UHJvcHM6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgICAvLyBQaXZvdCBvbmx5XG4gICAgICBhZ2dyZWdhdGU6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgICAvLyBIZWFkZXJzIG9ubHlcbiAgICAgIGhlYWRlckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGhlYWRlclN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgZ2V0SGVhZGVyUHJvcHM6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgICAvLyBGb290ZXJzIG9ubHlcbiAgICAgIGZvb3RlckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGZvb3RlclN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgZ2V0Rm9vdGVyUHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICBmaWx0ZXJNZXRob2Q6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgZmlsdGVyQWxsOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgIHNvcnRNZXRob2Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIH0pXG4gICksXG5cbiAgLy8gR2xvYmFsIEV4cGFuZGVyIENvbHVtbiBEZWZhdWx0c1xuICBleHBhbmRlckRlZmF1bHRzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHNvcnRhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZXNpemFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGZpbHRlcmFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICB9KSxcblxuICBwaXZvdERlZmF1bHRzOiBQcm9wVHlwZXMub2JqZWN0LFxuXG4gIC8vIFRleHRcbiAgcHJldmlvdXNUZXh0OiBQcm9wVHlwZXMubm9kZSxcbiAgbmV4dFRleHQ6IFByb3BUeXBlcy5ub2RlLFxuICBsb2FkaW5nVGV4dDogUHJvcFR5cGVzLm5vZGUsXG4gIG5vRGF0YVRleHQ6IFByb3BUeXBlcy5ub2RlLFxuICBwYWdlVGV4dDogUHJvcFR5cGVzLm5vZGUsXG4gIG9mVGV4dDogUHJvcFR5cGVzLm5vZGUsXG4gIHJvd3NUZXh0OiBQcm9wVHlwZXMubm9kZSxcblxuICAvLyBDb21wb25lbnRzXG4gIFRhYmxlQ29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgVGhlYWRDb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBUYm9keUNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIFRyR3JvdXBDb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBUckNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIFRoQ29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgVGRDb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBUZm9vdENvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIEZpbHRlckNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIEV4cGFuZGVyQ29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgUGl2b3RWYWx1ZUNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIEFnZ3JlZ2F0ZWRDb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICAvLyB0aGlzIGlzIGEgY29tcHV0ZWQgZGVmYXVsdCBnZW5lcmF0ZWQgdXNpbmdcbiAgUGl2b3RDb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICAvLyB0aGUgRXhwYW5kZXJDb21wb25lbnQgYW5kIFBpdm90VmFsdWVDb21wb25lbnQgYXQgcnVuLXRpbWUgaW4gbWV0aG9kcy5qc1xuICBQYWdpbmF0aW9uQ29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgUHJldmlvdXNDb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBOZXh0Q29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgTG9hZGluZ0NvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIE5vRGF0YUNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIFJlc2l6ZXJDb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBQYWRSb3dDb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxufVxuIl19