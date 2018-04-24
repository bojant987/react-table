var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import classnames from 'classnames';
//
import _ from './utils';
import Pagination from './pagination';

var emptyObj = function emptyObj() {
  return {};
};

export default {
  // General
  styles: {},
  data: [],
  loading: false,
  showPagination: true,
  showPaginationTop: false,
  showPaginationBottom: true,
  showPageSizeOptions: true,
  pageSizeOptions: [5, 10, 20, 25, 50, 100],
  defaultPageSize: 20,
  showPageJump: true,
  collapseOnSortingChange: true,
  collapseOnPageChange: true,
  collapseOnDataChange: true,
  freezeWhenExpanded: false,
  sortable: true,
  multiSort: true,
  resizable: true,
  filterable: false,
  defaultSortDesc: false,
  defaultSorted: [],
  defaultFiltered: [],
  defaultResized: [],
  defaultExpanded: {},
  // eslint-disable-next-line no-unused-vars
  defaultFilterMethod: function defaultFilterMethod(filter, row, column) {
    var id = filter.pivotId || filter.id;
    return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true;
  },
  // eslint-disable-next-line no-unused-vars
  defaultSortMethod: function defaultSortMethod(a, b, desc) {
    // force null and undefined to the bottom
    a = a === null || a === undefined ? '' : a;
    b = b === null || b === undefined ? '' : b;
    // force any string values to lowercase
    a = typeof a === 'string' ? a.toLowerCase() : a;
    b = typeof b === 'string' ? b.toLowerCase() : b;
    // Return either 1 or -1 to indicate a sort priority
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    // returning 0, undefined or any falsey value will use subsequent sorts or
    // the index as a tiebreaker
    return 0;
  },

  // Controlled State Props
  // page: undefined,
  // pageSize: undefined,
  // sorted: [],
  // filtered: [],
  // resized: [],
  // expanded: {},

  // Controlled State Callbacks
  onPageChange: undefined,
  onPageSizeChange: undefined,
  onSortedChange: undefined,
  onFilteredChange: undefined,
  onResizedChange: undefined,
  onExpandedChange: undefined,

  // Pivoting
  pivotBy: undefined,

  // Key Constants
  pivotValKey: '_pivotVal',
  pivotIDKey: '_pivotID',
  subRowsKey: '_subRows',
  aggregatedKey: '_aggregated',
  nestingLevelKey: '_nestingLevel',
  originalKey: '_original',
  indexKey: '_index',
  groupedByPivotKey: '_groupedByPivot',

  // Server-side Callbacks
  onFetchData: function onFetchData() {
    return null;
  },

  // Classes
  className: '',
  style: {},

  // Component decorators
  getProps: emptyObj,
  getTableProps: emptyObj,
  getTheadGroupProps: emptyObj,
  getTheadGroupTrProps: emptyObj,
  getTheadGroupThProps: emptyObj,
  getTheadProps: emptyObj,
  getTheadTrProps: emptyObj,
  getTheadThProps: emptyObj,
  getTheadFilterProps: emptyObj,
  getTheadFilterTrProps: emptyObj,
  getTheadFilterThProps: emptyObj,
  getTbodyProps: emptyObj,
  getTrGroupProps: emptyObj,
  getTrProps: emptyObj,
  getTdProps: emptyObj,
  getTfootProps: emptyObj,
  getTfootTrProps: emptyObj,
  getTfootTdProps: emptyObj,
  getPaginationProps: emptyObj,
  getLoadingProps: emptyObj,
  getNoDataProps: emptyObj,
  getResizerProps: emptyObj,

  // Global Column Defaults
  column: {
    // Renderers
    Cell: undefined,
    Header: undefined,
    Footer: undefined,
    Aggregated: undefined,
    Pivot: undefined,
    PivotValue: undefined,
    Expander: undefined,
    Filter: undefined,
    // All Columns
    sortable: undefined, // use table default
    resizable: undefined, // use table default
    filterable: undefined, // use table default
    show: true,
    minWidth: 100,
    // Cells only
    className: '',
    style: {},
    getProps: emptyObj,
    // Pivot only
    aggregate: undefined,
    // Headers only
    headerClassName: '',
    headerStyle: {},
    getHeaderProps: emptyObj,
    // Footers only
    footerClassName: '',
    footerStyle: {},
    getFooterProps: emptyObj,
    filterMethod: undefined,
    filterAll: false,
    sortMethod: undefined
  },

  // Global Expander Column Defaults
  expanderDefaults: {
    sortable: false,
    resizable: false,
    filterable: false,
    width: 35
  },

  pivotDefaults: {
    // extend the defaults for pivoted columns here
  },

  // Text
  previousText: 'Previous',
  nextText: 'Next',
  loadingText: 'Loading...',
  noDataText: 'No rows found',
  pageText: 'Page',
  ofText: 'of',
  rowsText: 'rows',

  // Components
  TableComponent: function TableComponent(_ref) {
    var children = _ref.children,
        className = _ref.className,
        rest = _objectWithoutProperties(_ref, ['children', 'className']);

    return React.createElement(
      'div',
      _extends({
        className: classnames('rt-table', className),
        role: 'grid'
        // tabIndex='0'
      }, rest),
      children
    );
  },
  TheadComponent: _.makeTemplateComponent('rt-thead', 'Thead'),
  TbodyComponent: _.makeTemplateComponent('rt-tbody', 'Tbody'),
  TrGroupComponent: function TrGroupComponent(_ref2) {
    var children = _ref2.children,
        className = _ref2.className,
        rest = _objectWithoutProperties(_ref2, ['children', 'className']);

    return React.createElement(
      'div',
      _extends({ className: classnames('rt-tr-group', className), role: 'rowgroup' }, rest),
      children
    );
  },
  TrComponent: function TrComponent(_ref3) {
    var children = _ref3.children,
        className = _ref3.className,
        rest = _objectWithoutProperties(_ref3, ['children', 'className']);

    return React.createElement(
      'div',
      _extends({ className: classnames('rt-tr', className), role: 'row' }, rest),
      children
    );
  },
  ThComponent: function ThComponent(_ref4) {
    var toggleSort = _ref4.toggleSort,
        className = _ref4.className,
        children = _ref4.children,
        rest = _objectWithoutProperties(_ref4, ['toggleSort', 'className', 'children']);

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      React.createElement(
        'div',
        _extends({
          className: classnames('rt-th', className),
          onClick: function onClick(e) {
            return toggleSort && toggleSort(e);
          },
          role: 'columnheader',
          tabIndex: '-1' // Resolves eslint issues without implementing keyboard navigation incorrectly
        }, rest),
        children
      )
    );
  },
  TdComponent: function TdComponent(_ref5) {
    var toggleSort = _ref5.toggleSort,
        className = _ref5.className,
        children = _ref5.children,
        rest = _objectWithoutProperties(_ref5, ['toggleSort', 'className', 'children']);

    return React.createElement(
      'div',
      _extends({ className: classnames('rt-td', className), role: 'gridcell' }, rest),
      children
    );
  },
  TfootComponent: _.makeTemplateComponent('rt-tfoot', 'Tfoot'),
  FilterComponent: function FilterComponent(_ref6) {
    var filter = _ref6.filter,
        _onChange = _ref6.onChange;
    return React.createElement('input', {
      type: 'text',
      style: {
        width: '100%'
      },
      value: filter ? filter.value : '',
      onChange: function onChange(event) {
        return _onChange(event.target.value);
      }
    });
  },
  ExpanderComponent: function ExpanderComponent(_ref7) {
    var isExpanded = _ref7.isExpanded;
    return React.createElement(
      'div',
      { className: classnames('rt-expander', isExpanded && '-open') },
      '\u2022'
    );
  },
  PivotValueComponent: function PivotValueComponent(_ref8) {
    var subRows = _ref8.subRows,
        value = _ref8.value;
    return React.createElement(
      'span',
      null,
      value,
      ' ',
      subRows && '(' + subRows.length + ')'
    );
  },
  AggregatedComponent: function AggregatedComponent(_ref9) {
    var subRows = _ref9.subRows,
        column = _ref9.column;

    var previewValues = subRows.filter(function (d) {
      return typeof d[column.id] !== 'undefined';
    }).map(function (row, i) {
      return (
        // eslint-disable-next-line react/no-array-index-key
        React.createElement(
          'span',
          { key: i },
          row[column.id],
          i < subRows.length - 1 ? ', ' : ''
        )
      );
    });
    return React.createElement(
      'span',
      null,
      previewValues
    );
  },
  PivotComponent: undefined, // this is a computed default generated using
  // the ExpanderComponent and PivotValueComponent at run-time in methods.js
  PaginationComponent: Pagination,
  PreviousComponent: undefined,
  NextComponent: undefined,
  LoadingComponent: function LoadingComponent(_ref10) {
    var className = _ref10.className,
        loading = _ref10.loading,
        loadingText = _ref10.loadingText,
        rest = _objectWithoutProperties(_ref10, ['className', 'loading', 'loadingText']);

    return React.createElement(
      'div',
      _extends({ className: classnames('-loading', { '-active': loading }, className) }, rest),
      React.createElement(
        'div',
        { className: '-loading-inner' },
        loadingText
      )
    );
  },
  NoDataComponent: _.makeTemplateComponent('rt-noData', 'NoData'),
  ResizerComponent: _.makeTemplateComponent('rt-resizer', 'Resizer'),
  PadRowComponent: function PadRowComponent() {
    return React.createElement(
      'span',
      null,
      '\xA0'
    );
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWZhdWx0UHJvcHMuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJjbGFzc25hbWVzIiwiXyIsIlBhZ2luYXRpb24iLCJlbXB0eU9iaiIsInN0eWxlcyIsImRhdGEiLCJsb2FkaW5nIiwic2hvd1BhZ2luYXRpb24iLCJzaG93UGFnaW5hdGlvblRvcCIsInNob3dQYWdpbmF0aW9uQm90dG9tIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsImRlZmF1bHRQYWdlU2l6ZSIsInNob3dQYWdlSnVtcCIsImNvbGxhcHNlT25Tb3J0aW5nQ2hhbmdlIiwiY29sbGFwc2VPblBhZ2VDaGFuZ2UiLCJjb2xsYXBzZU9uRGF0YUNoYW5nZSIsImZyZWV6ZVdoZW5FeHBhbmRlZCIsInNvcnRhYmxlIiwibXVsdGlTb3J0IiwicmVzaXphYmxlIiwiZmlsdGVyYWJsZSIsImRlZmF1bHRTb3J0RGVzYyIsImRlZmF1bHRTb3J0ZWQiLCJkZWZhdWx0RmlsdGVyZWQiLCJkZWZhdWx0UmVzaXplZCIsImRlZmF1bHRFeHBhbmRlZCIsImRlZmF1bHRGaWx0ZXJNZXRob2QiLCJmaWx0ZXIiLCJyb3ciLCJjb2x1bW4iLCJpZCIsInBpdm90SWQiLCJ1bmRlZmluZWQiLCJTdHJpbmciLCJzdGFydHNXaXRoIiwidmFsdWUiLCJkZWZhdWx0U29ydE1ldGhvZCIsImEiLCJiIiwiZGVzYyIsInRvTG93ZXJDYXNlIiwib25QYWdlQ2hhbmdlIiwib25QYWdlU2l6ZUNoYW5nZSIsIm9uU29ydGVkQ2hhbmdlIiwib25GaWx0ZXJlZENoYW5nZSIsIm9uUmVzaXplZENoYW5nZSIsIm9uRXhwYW5kZWRDaGFuZ2UiLCJwaXZvdEJ5IiwicGl2b3RWYWxLZXkiLCJwaXZvdElES2V5Iiwic3ViUm93c0tleSIsImFnZ3JlZ2F0ZWRLZXkiLCJuZXN0aW5nTGV2ZWxLZXkiLCJvcmlnaW5hbEtleSIsImluZGV4S2V5IiwiZ3JvdXBlZEJ5UGl2b3RLZXkiLCJvbkZldGNoRGF0YSIsImNsYXNzTmFtZSIsInN0eWxlIiwiZ2V0UHJvcHMiLCJnZXRUYWJsZVByb3BzIiwiZ2V0VGhlYWRHcm91cFByb3BzIiwiZ2V0VGhlYWRHcm91cFRyUHJvcHMiLCJnZXRUaGVhZEdyb3VwVGhQcm9wcyIsImdldFRoZWFkUHJvcHMiLCJnZXRUaGVhZFRyUHJvcHMiLCJnZXRUaGVhZFRoUHJvcHMiLCJnZXRUaGVhZEZpbHRlclByb3BzIiwiZ2V0VGhlYWRGaWx0ZXJUclByb3BzIiwiZ2V0VGhlYWRGaWx0ZXJUaFByb3BzIiwiZ2V0VGJvZHlQcm9wcyIsImdldFRyR3JvdXBQcm9wcyIsImdldFRyUHJvcHMiLCJnZXRUZFByb3BzIiwiZ2V0VGZvb3RQcm9wcyIsImdldFRmb290VHJQcm9wcyIsImdldFRmb290VGRQcm9wcyIsImdldFBhZ2luYXRpb25Qcm9wcyIsImdldExvYWRpbmdQcm9wcyIsImdldE5vRGF0YVByb3BzIiwiZ2V0UmVzaXplclByb3BzIiwiQ2VsbCIsIkhlYWRlciIsIkZvb3RlciIsIkFnZ3JlZ2F0ZWQiLCJQaXZvdCIsIlBpdm90VmFsdWUiLCJFeHBhbmRlciIsIkZpbHRlciIsInNob3ciLCJtaW5XaWR0aCIsImFnZ3JlZ2F0ZSIsImhlYWRlckNsYXNzTmFtZSIsImhlYWRlclN0eWxlIiwiZ2V0SGVhZGVyUHJvcHMiLCJmb290ZXJDbGFzc05hbWUiLCJmb290ZXJTdHlsZSIsImdldEZvb3RlclByb3BzIiwiZmlsdGVyTWV0aG9kIiwiZmlsdGVyQWxsIiwic29ydE1ldGhvZCIsImV4cGFuZGVyRGVmYXVsdHMiLCJ3aWR0aCIsInBpdm90RGVmYXVsdHMiLCJwcmV2aW91c1RleHQiLCJuZXh0VGV4dCIsImxvYWRpbmdUZXh0Iiwibm9EYXRhVGV4dCIsInBhZ2VUZXh0Iiwib2ZUZXh0Iiwicm93c1RleHQiLCJUYWJsZUNvbXBvbmVudCIsImNoaWxkcmVuIiwicmVzdCIsIlRoZWFkQ29tcG9uZW50IiwibWFrZVRlbXBsYXRlQ29tcG9uZW50IiwiVGJvZHlDb21wb25lbnQiLCJUckdyb3VwQ29tcG9uZW50IiwiVHJDb21wb25lbnQiLCJUaENvbXBvbmVudCIsInRvZ2dsZVNvcnQiLCJlIiwiVGRDb21wb25lbnQiLCJUZm9vdENvbXBvbmVudCIsIkZpbHRlckNvbXBvbmVudCIsIm9uQ2hhbmdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJFeHBhbmRlckNvbXBvbmVudCIsImlzRXhwYW5kZWQiLCJQaXZvdFZhbHVlQ29tcG9uZW50Iiwic3ViUm93cyIsImxlbmd0aCIsIkFnZ3JlZ2F0ZWRDb21wb25lbnQiLCJwcmV2aWV3VmFsdWVzIiwiZCIsIm1hcCIsImkiLCJQaXZvdENvbXBvbmVudCIsIlBhZ2luYXRpb25Db21wb25lbnQiLCJQcmV2aW91c0NvbXBvbmVudCIsIk5leHRDb21wb25lbnQiLCJMb2FkaW5nQ29tcG9uZW50IiwiTm9EYXRhQ29tcG9uZW50IiwiUmVzaXplckNvbXBvbmVudCIsIlBhZFJvd0NvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLFlBQXZCO0FBQ0E7QUFDQSxPQUFPQyxDQUFQLE1BQWMsU0FBZDtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsY0FBdkI7O0FBRUEsSUFBTUMsV0FBVyxTQUFYQSxRQUFXO0FBQUEsU0FBTyxFQUFQO0FBQUEsQ0FBakI7O0FBRUEsZUFBZTtBQUNiO0FBQ0FDLFVBQVEsRUFGSztBQUdiQyxRQUFNLEVBSE87QUFJYkMsV0FBUyxLQUpJO0FBS2JDLGtCQUFnQixJQUxIO0FBTWJDLHFCQUFtQixLQU5OO0FBT2JDLHdCQUFzQixJQVBUO0FBUWJDLHVCQUFxQixJQVJSO0FBU2JDLG1CQUFpQixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsRUFBaEIsRUFBb0IsR0FBcEIsQ0FUSjtBQVViQyxtQkFBaUIsRUFWSjtBQVdiQyxnQkFBYyxJQVhEO0FBWWJDLDJCQUF5QixJQVpaO0FBYWJDLHdCQUFzQixJQWJUO0FBY2JDLHdCQUFzQixJQWRUO0FBZWJD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QUE0UGJxQyxtQkFBaUIvSSxFQUFFbUgscUJBQUYsQ0FBd0IsV0FBeEIsRUFBcUMsUUFBckMsQ0E1UEo7QUE2UGI2QixvQkFBa0JoSixFQUFFbUgscUJBQUYsQ0FBd0IsWUFBeEIsRUFBc0MsU0FBdEMsQ0E3UEw7QUE4UGI4QixtQkFBaUI7QUFBQSxXQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBTjtBQUFBO0FBOVBKLENBQWYiLCJmaWxlIjoiZGVmYXVsdFByb3BzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcbi8vXG5pbXBvcnQgXyBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IFBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uJ1xuXG5jb25zdCBlbXB0eU9iaiA9ICgpID0+ICh7fSlcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvLyBHZW5lcmFsXG4gIHN0eWxlczoge30sXG4gIGRhdGE6IFtdLFxuICBsb2FkaW5nOiBmYWxzZSxcbiAgc2hvd1BhZ2luYXRpb246IHRydWUsXG4gIHNob3dQYWdpbmF0aW9uVG9wOiBmYWxzZSxcbiAgc2hvd1BhZ2luYXRpb25Cb3R0b206IHRydWUsXG4gIHNob3dQYWdlU2l6ZU9wdGlvbnM6IHRydWUsXG4gIHBhZ2VTaXplT3B0aW9uczogWzUsIDEwLCAyMCwgMjUsIDUwLCAxMDBdLFxuICBkZWZhdWx0UGFnZVNpemU6IDIwLFxuICBzaG93UGFnZUp1bXA6IHRydWUsXG4gIGNvbGxhcHNlT25Tb3J0aW5nQ2hhbmdlOiB0cnVlLFxuICBjb2xsYXBzZU9uUGFnZUNoYW5nZTogdHJ1ZSxcbiAgY29sbGFwc2VPbkRhdGFDaGFuZ2U6IHRydWUsXG4gIGZyZWV6ZVdoZW5FeHBhbmRlZDogZmFsc2UsXG4gIHNvcnRhYmxlOiB0cnVlLFxuICBtdWx0aVNvcnQ6IHRydWUsXG4gIHJlc2l6YWJsZTogdHJ1ZSxcbiAgZmlsdGVyYWJsZTogZmFsc2UsXG4gIGRlZmF1bHRTb3J0RGVzYzogZmFsc2UsXG4gIGRlZmF1bHRTb3J0ZWQ6IFtdLFxuICBkZWZhdWx0RmlsdGVyZWQ6IFtdLFxuICBkZWZhdWx0UmVzaXplZDogW10sXG4gIGRlZmF1bHRFeHBhbmRlZDoge30sXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBkZWZhdWx0RmlsdGVyTWV0aG9kOiAoZmlsdGVyLCByb3csIGNvbHVtbikgPT4ge1xuICAgIGNvbnN0IGlkID0gZmlsdGVyLnBpdm90SWQgfHwgZmlsdGVyLmlkXG4gICAgcmV0dXJuIHJvd1tpZF0gIT09IHVuZGVmaW5lZCA/IFN0cmluZyhyb3dbaWRdKS5zdGFydHNXaXRoKGZpbHRlci52YWx1ZSkgOiB0cnVlXG4gIH0sXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBkZWZhdWx0U29ydE1ldGhvZDogKGEsIGIsIGRlc2MpID0+IHtcbiAgICAvLyBmb3JjZSBudWxsIGFuZCB1bmRlZmluZWQgdG8gdGhlIGJvdHRvbVxuICAgIGEgPSBhID09PSBudWxsIHx8IGEgPT09IHVuZGVmaW5lZCA/ICcnIDogYVxuICAgIGIgPSBiID09PSBudWxsIHx8IGIgPT09IHVuZGVmaW5lZCA/ICcnIDogYlxuICAgIC8vIGZvcmNlIGFueSBzdHJpbmcgdmFsdWVzIHRvIGxvd2VyY2FzZVxuICAgIGEgPSB0eXBlb2YgYSA9PT0gJ3N0cmluZycgPyBhLnRvTG93ZXJDYXNlKCkgOiBhXG4gICAgYiA9IHR5cGVvZiBiID09PSAnc3RyaW5nJyA/IGIudG9Mb3dlckNhc2UoKSA6IGJcbiAgICAvLyBSZXR1cm4gZWl0aGVyIDEgb3IgLTEgdG8gaW5kaWNhdGUgYSBzb3J0IHByaW9yaXR5XG4gICAgaWYgKGEgPiBiKSB7XG4gICAgICByZXR1cm4gMVxuICAgIH1cbiAgICBpZiAoYSA8IGIpIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICAvLyByZXR1cm5pbmcgMCwgdW5kZWZpbmVkIG9yIGFueSBmYWxzZXkgdmFsdWUgd2lsbCB1c2Ugc3Vic2VxdWVudCBzb3J0cyBvclxuICAgIC8vIHRoZSBpbmRleCBhcyBhIHRpZWJyZWFrZXJcbiAgICByZXR1cm4gMFxuICB9LFxuXG4gIC8vIENvbnRyb2xsZWQgU3RhdGUgUHJvcHNcbiAgLy8gcGFnZTogdW5kZWZpbmVkLFxuICAvLyBwYWdlU2l6ZTogdW5kZWZpbmVkLFxuICAvLyBzb3J0ZWQ6IFtdLFxuICAvLyBmaWx0ZXJlZDogW10sXG4gIC8vIHJlc2l6ZWQ6IFtdLFxuICAvLyBleHBhbmRlZDoge30sXG5cbiAgLy8gQ29udHJvbGxlZCBTdGF0ZSBDYWxsYmFja3NcbiAgb25QYWdlQ2hhbmdlOiB1bmRlZmluZWQsXG4gIG9uUGFnZVNpemVDaGFuZ2U6IHVuZGVmaW5lZCxcbiAgb25Tb3J0ZWRDaGFuZ2U6IHVuZGVmaW5lZCxcbiAgb25GaWx0ZXJlZENoYW5nZTogdW5kZWZpbmVkLFxuICBvblJlc2l6ZWRDaGFuZ2U6IHVuZGVmaW5lZCxcbiAgb25FeHBhbmRlZENoYW5nZTogdW5kZWZpbmVkLFxuXG4gIC8vIFBpdm90aW5nXG4gIHBpdm90Qnk6IHVuZGVmaW5lZCxcblxuICAvLyBLZXkgQ29uc3RhbnRzXG4gIHBpdm90VmFsS2V5OiAnX3Bpdm90VmFsJyxcbiAgcGl2b3RJREtleTogJ19waXZvdElEJyxcbiAgc3ViUm93c0tleTogJ19zdWJSb3dzJyxcbiAgYWdncmVnYXRlZEtleTogJ19hZ2dyZWdhdGVkJyxcbiAgbmVzdGluZ0xldmVsS2V5OiAnX25lc3RpbmdMZXZlbCcsXG4gIG9yaWdpbmFsS2V5OiAnX29yaWdpbmFsJyxcbiAgaW5kZXhLZXk6ICdfaW5kZXgnLFxuICBncm91cGVkQnlQaXZvdEtleTogJ19ncm91cGVkQnlQaXZvdCcsXG5cbiAgLy8gU2VydmVyLXNpZGUgQ2FsbGJhY2tzXG4gIG9uRmV0Y2hEYXRhOiAoKSA9PiBudWxsLFxuXG4gIC8vIENsYXNzZXNcbiAgY2xhc3NOYW1lOiAnJyxcbiAgc3R5bGU6IHt9LFxuXG4gIC8vIENvbXBvbmVudCBkZWNvcmF0b3JzXG4gIGdldFByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGFibGVQcm9wczogZW1wdHlPYmosXG4gIGdldFRoZWFkR3JvdXBQcm9wczogZW1wdHlPYmosXG4gIGdldFRoZWFkR3JvdXBUclByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGhlYWRHcm91cFRoUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUaGVhZFByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGhlYWRUclByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGhlYWRUaFByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGhlYWRGaWx0ZXJQcm9wczogZW1wdHlPYmosXG4gIGdldFRoZWFkRmlsdGVyVHJQcm9wczogZW1wdHlPYmosXG4gIGdldFRoZWFkRmlsdGVyVGhQcm9wczogZW1wdHlPYmosXG4gIGdldFRib2R5UHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUckdyb3VwUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUclByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGRQcm9wczogZW1wdHlPYmosXG4gIGdldFRmb290UHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUZm9vdFRyUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUZm9vdFRkUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRQYWdpbmF0aW9uUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRMb2FkaW5nUHJvcHM6IGVtcHR5T2JqLFxuICBnZXROb0RhdGFQcm9wczogZW1wdHlPYmosXG4gIGdldFJlc2l6ZXJQcm9wczogZW1wdHlPYmosXG5cbiAgLy8gR2xvYmFsIENvbHVtbiBEZWZhdWx0c1xuICBjb2x1bW46IHtcbiAgICAvLyBSZW5kZXJlcnNcbiAgICBDZWxsOiB1bmRlZmluZWQsXG4gICAgSGVhZGVyOiB1bmRlZmluZWQsXG4gICAgRm9vdGVyOiB1bmRlZmluZWQsXG4gICAgQWdncmVnYXRlZDogdW5kZWZpbmVkLFxuICAgIFBpdm90OiB1bmRlZmluZWQsXG4gICAgUGl2b3RWYWx1ZTogdW5kZWZpbmVkLFxuICAgIEV4cGFuZGVyOiB1bmRlZmluZWQsXG4gICAgRmlsdGVyOiB1bmRlZmluZWQsXG4gICAgLy8gQWxsIENvbHVtbnNcbiAgICBzb3J0YWJsZTogdW5kZWZpbmVkLCAvLyB1c2UgdGFibGUgZGVmYXVsdFxuICAgIHJlc2l6YWJsZTogdW5kZWZpbmVkLCAvLyB1c2UgdGFibGUgZGVmYXVsdFxuICAgIGZpbHRlcmFibGU6IHVuZGVmaW5lZCwgLy8gdXNlIHRhYmxlIGRlZmF1bHRcbiAgICBzaG93OiB0cnVlLFxuICAgIG1pbldpZHRoOiAxMDAsXG4gICAgLy8gQ2VsbHMgb25seVxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgc3R5bGU6IHt9LFxuICAgIGdldFByb3BzOiBlbXB0eU9iaixcbiAgICAvLyBQaXZvdCBvbmx5XG4gICAgYWdncmVnYXRlOiB1bmRlZmluZWQsXG4gICAgLy8gSGVhZGVycyBvbmx5XG4gICAgaGVhZGVyQ2xhc3NOYW1lOiAnJyxcbiAgICBoZWFkZXJTdHlsZToge30sXG4gICAgZ2V0SGVhZGVyUHJvcHM6IGVtcHR5T2JqLFxuICAgIC8vIEZvb3RlcnMgb25seVxuICAgIGZvb3RlckNsYXNzTmFtZTogJycsXG4gICAgZm9vdGVyU3R5bGU6IHt9LFxuICAgIGdldEZvb3RlclByb3BzOiBlbXB0eU9iaixcbiAgICBmaWx0ZXJNZXRob2Q6IHVuZGVmaW5lZCxcbiAgICBmaWx0ZXJBbGw6IGZhbHNlLFxuICAgIHNvcnRNZXRob2Q6IHVuZGVmaW5lZCxcbiAgfSxcblxuICAvLyBHbG9iYWwgRXhwYW5kZXIgQ29sdW1uIERlZmF1bHRzXG4gIGV4cGFuZGVyRGVmYXVsdHM6IHtcbiAgICBzb3J0YWJsZTogZmFsc2UsXG4gICAgcmVzaXphYmxlOiBmYWxzZSxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICB3aWR0aDogMzUsXG4gIH0sXG5cbiAgcGl2b3REZWZhdWx0czoge1xuICAgIC8vIGV4dGVuZCB0aGUgZGVmYXVsdHMgZm9yIHBpdm90ZWQgY29sdW1ucyBoZXJlXG4gIH0sXG5cbiAgLy8gVGV4dFxuICBwcmV2aW91c1RleHQ6ICdQcmV2aW91cycsXG4gIG5leHRUZXh0OiAnTmV4dCcsXG4gIGxvYWRpbmdUZXh0OiAnTG9hZGluZy4uLicsXG4gIG5vRGF0YVRleHQ6ICdObyByb3dzIGZvdW5kJyxcbiAgcGFnZVRleHQ6ICdQYWdlJyxcbiAgb2ZUZXh0OiAnb2YnLFxuICByb3dzVGV4dDogJ3Jvd3MnLFxuXG4gIC8vIENvbXBvbmVudHNcbiAgVGFibGVDb21wb25lbnQ6ICh7IGNoaWxkcmVuLCBjbGFzc05hbWUsIC4uLnJlc3QgfSkgPT4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygncnQtdGFibGUnLCBjbGFzc05hbWUpfVxuICAgICAgcm9sZT1cImdyaWRcIlxuICAgICAgLy8gdGFiSW5kZXg9JzAnXG4gICAgICB7Li4ucmVzdH1cbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICksXG4gIFRoZWFkQ29tcG9uZW50OiBfLm1ha2VUZW1wbGF0ZUNvbXBvbmVudCgncnQtdGhlYWQnLCAnVGhlYWQnKSxcbiAgVGJvZHlDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC10Ym9keScsICdUYm9keScpLFxuICBUckdyb3VwQ29tcG9uZW50OiAoeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCAuLi5yZXN0IH0pID0+IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NuYW1lcygncnQtdHItZ3JvdXAnLCBjbGFzc05hbWUpfSByb2xlPVwicm93Z3JvdXBcIiB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICksXG4gIFRyQ29tcG9uZW50OiAoeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCAuLi5yZXN0IH0pID0+IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NuYW1lcygncnQtdHInLCBjbGFzc05hbWUpfSByb2xlPVwicm93XCIgey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApLFxuICBUaENvbXBvbmVudDogKHtcbiAgICB0b2dnbGVTb3J0LCBjbGFzc05hbWUsIGNoaWxkcmVuLCAuLi5yZXN0XG4gIH0pID0+IChcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50c1xuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygncnQtdGgnLCBjbGFzc05hbWUpfVxuICAgICAgb25DbGljaz17ZSA9PiB0b2dnbGVTb3J0ICYmIHRvZ2dsZVNvcnQoZSl9XG4gICAgICByb2xlPVwiY29sdW1uaGVhZGVyXCJcbiAgICAgIHRhYkluZGV4PVwiLTFcIiAvLyBSZXNvbHZlcyBlc2xpbnQgaXNzdWVzIHdpdGhvdXQgaW1wbGVtZW50aW5nIGtleWJvYXJkIG5hdmlnYXRpb24gaW5jb3JyZWN0bHlcbiAgICAgIHsuLi5yZXN0fVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKSxcbiAgVGRDb21wb25lbnQ6ICh7XG4gICAgdG9nZ2xlU29ydCwgY2xhc3NOYW1lLCBjaGlsZHJlbiwgLi4ucmVzdFxuICB9KSA9PiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3J0LXRkJywgY2xhc3NOYW1lKX0gcm9sZT1cImdyaWRjZWxsXCIgey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApLFxuICBUZm9vdENvbXBvbmVudDogXy5tYWtlVGVtcGxhdGVDb21wb25lbnQoJ3J0LXRmb290JywgJ1Rmb290JyksXG4gIEZpbHRlckNvbXBvbmVudDogKHsgZmlsdGVyLCBvbkNoYW5nZSB9KSA9PiAoXG4gICAgPGlucHV0XG4gICAgICB0eXBlPVwidGV4dFwiXG4gICAgICBzdHlsZT17e1xuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgfX1cbiAgICAgIHZhbHVlPXtmaWx0ZXIgPyBmaWx0ZXIudmFsdWUgOiAnJ31cbiAgICAgIG9uQ2hhbmdlPXtldmVudCA9PiBvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUpfVxuICAgIC8+XG4gICksXG4gIEV4cGFuZGVyQ29tcG9uZW50OiAoeyBpc0V4cGFuZGVkIH0pID0+IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NuYW1lcygncnQtZXhwYW5kZXInLCBpc0V4cGFuZGVkICYmICctb3BlbicpfT4mYnVsbDs8L2Rpdj5cbiAgKSxcbiAgUGl2b3RWYWx1ZUNvbXBvbmVudDogKHsgc3ViUm93cywgdmFsdWUgfSkgPT4gKFxuICAgIDxzcGFuPlxuICAgICAge3ZhbHVlfSB7c3ViUm93cyAmJiBgKCR7c3ViUm93cy5sZW5ndGh9KWB9XG4gICAgPC9zcGFuPlxuICApLFxuICBBZ2dyZWdhdGVkQ29tcG9uZW50OiAoeyBzdWJSb3dzLCBjb2x1bW4gfSkgPT4ge1xuICAgIGNvbnN0IHByZXZpZXdWYWx1ZXMgPSBzdWJSb3dzLmZpbHRlcihkID0+IHR5cGVvZiBkW2NvbHVtbi5pZF0gIT09ICd1bmRlZmluZWQnKS5tYXAoKHJvdywgaSkgPT4gKFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L25vLWFycmF5LWluZGV4LWtleVxuICAgICAgPHNwYW4ga2V5PXtpfT5cbiAgICAgICAge3Jvd1tjb2x1bW4uaWRdfVxuICAgICAgICB7aSA8IHN1YlJvd3MubGVuZ3RoIC0gMSA/ICcsICcgOiAnJ31cbiAgICAgIDwvc3Bhbj5cbiAgICApKVxuICAgIHJldHVybiA8c3Bhbj57cHJldmlld1ZhbHVlc308L3NwYW4+XG4gIH0sXG4gIFBpdm90Q29tcG9uZW50OiB1bmRlZmluZWQsIC8vIHRoaXMgaXMgYSBjb21wdXRlZCBkZWZhdWx0IGdlbmVyYXRlZCB1c2luZ1xuICAvLyB0aGUgRXhwYW5kZXJDb21wb25lbnQgYW5kIFBpdm90VmFsdWVDb21wb25lbnQgYXQgcnVuLXRpbWUgaW4gbWV0aG9kcy5qc1xuICBQYWdpbmF0aW9uQ29tcG9uZW50OiBQYWdpbmF0aW9uLFxuICBQcmV2aW91c0NvbXBvbmVudDogdW5kZWZpbmVkLFxuICBOZXh0Q29tcG9uZW50OiB1bmRlZmluZWQsXG4gIExvYWRpbmdDb21wb25lbnQ6ICh7XG4gICAgY2xhc3NOYW1lLCBsb2FkaW5nLCBsb2FkaW5nVGV4dCwgLi4ucmVzdFxuICB9KSA9PiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJy1sb2FkaW5nJywgeyAnLWFjdGl2ZSc6IGxvYWRpbmcgfSwgY2xhc3NOYW1lKX0gey4uLnJlc3R9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCItbG9hZGluZy1pbm5lclwiPntsb2FkaW5nVGV4dH08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKSxcbiAgTm9EYXRhQ29tcG9uZW50OiBfLm1ha2VUZW1wbGF0ZUNvbXBvbmVudCgncnQtbm9EYXRhJywgJ05vRGF0YScpLFxuICBSZXNpemVyQ29tcG9uZW50OiBfLm1ha2VUZW1wbGF0ZUNvbXBvbmVudCgncnQtcmVzaXplcicsICdSZXNpemVyJyksXG4gIFBhZFJvd0NvbXBvbmVudDogKCkgPT4gPHNwYW4+Jm5ic3A7PC9zcGFuPixcbn1cbiJdfQ==