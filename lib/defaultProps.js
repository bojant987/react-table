'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _pagination = require('./pagination');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
//


var emptyObj = function emptyObj() {
  return {};
};

exports.default = {
  // General
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

    return _react2.default.createElement(
      'div',
      _extends({
        className: (0, _classnames2.default)('rt-table', className),
        role: 'grid'
        // tabIndex='0'
      }, rest),
      children
    );
  },
  TheadComponent: _utils2.default.makeTemplateComponent('rt-thead', 'Thead'),
  TbodyComponent: _utils2.default.makeTemplateComponent('rt-tbody', 'Tbody'),
  TrGroupComponent: function TrGroupComponent(_ref2) {
    var children = _ref2.children,
        className = _ref2.className,
        rest = _objectWithoutProperties(_ref2, ['children', 'className']);

    return _react2.default.createElement(
      'div',
      _extends({ className: (0, _classnames2.default)('rt-tr-group', className), role: 'rowgroup' }, rest),
      children
    );
  },
  TrComponent: function TrComponent(_ref3) {
    var children = _ref3.children,
        className = _ref3.className,
        rest = _objectWithoutProperties(_ref3, ['children', 'className']);

    return _react2.default.createElement(
      'div',
      _extends({ className: (0, _classnames2.default)('rt-tr', className), role: 'row' }, rest),
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
      _react2.default.createElement(
        'div',
        _extends({
          className: (0, _classnames2.default)('rt-th', className),
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

    return _react2.default.createElement(
      'div',
      _extends({ className: (0, _classnames2.default)('rt-td', className), role: 'gridcell' }, rest),
      children
    );
  },
  TfootComponent: _utils2.default.makeTemplateComponent('rt-tfoot', 'Tfoot'),
  FilterComponent: function FilterComponent(_ref6) {
    var filter = _ref6.filter,
        _onChange = _ref6.onChange;
    return _react2.default.createElement('input', {
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
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('rt-expander', isExpanded && '-open') },
      '\u2022'
    );
  },
  PivotValueComponent: function PivotValueComponent(_ref8) {
    var subRows = _ref8.subRows,
        value = _ref8.value;
    return _react2.default.createElement(
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
        _react2.default.createElement(
          'span',
          { key: i },
          row[column.id],
          i < subRows.length - 1 ? ', ' : ''
        )
      );
    });
    return _react2.default.createElement(
      'span',
      null,
      previewValues
    );
  },
  PivotComponent: undefined, // this is a computed default generated using
  // the ExpanderComponent and PivotValueComponent at run-time in methods.js
  PaginationComponent: _pagination2.default,
  PreviousComponent: undefined,
  NextComponent: undefined,
  LoadingComponent: function LoadingComponent(_ref10) {
    var className = _ref10.className,
        loading = _ref10.loading,
        loadingText = _ref10.loadingText,
        rest = _objectWithoutProperties(_ref10, ['className', 'loading', 'loadingText']);

    return _react2.default.createElement(
      'div',
      _extends({ className: (0, _classnames2.default)('-loading', { '-active': loading }, className) }, rest),
      _react2.default.createElement(
        'div',
        { className: '-loading-inner' },
        loadingText
      )
    );
  },
  NoDataComponent: _utils2.default.makeTemplateComponent('rt-noData', 'NoData'),
  ResizerComponent: _utils2.default.makeTemplateComponent('rt-resizer', 'Resizer'),
  PadRowComponent: function PadRowComponent() {
    return _react2.default.createElement(
      'span',
      null,
      '\xA0'
    );
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWZhdWx0UHJvcHMuanMiXSwibmFtZXMiOlsiZW1wdHlPYmoiLCJkYXRhIiwibG9hZGluZyIsInNob3dQYWdpbmF0aW9uIiwic2hvd1BhZ2luYXRpb25Ub3AiLCJzaG93UGFnaW5hdGlvbkJvdHRvbSIsInNob3dQYWdlU2l6ZU9wdGlvbnMiLCJwYWdlU2l6ZU9wdGlvbnMiLCJkZWZhdWx0UGFnZVNpemUiLCJzaG93UGFnZUp1bXAiLCJjb2xsYXBzZU9uU29ydGluZ0NoYW5nZSIsImNvbGxhcHNlT25QYWdlQ2hhbmdlIiwiY29sbGFwc2VPbkRhdGFDaGFuZ2UiLCJmcmVlemVXaGVuRXhwYW5kZWQiLCJzb3J0YWJsZSIsIm11bHRpU29ydCIsInJlc2l6YWJsZSIsImZpbHRlcmFibGUiLCJkZWZhdWx0U29ydERlc2MiLCJkZWZhdWx0U29ydGVkIiwiZGVmYXVsdEZpbHRlcmVkIiwiZGVmYXVsdFJlc2l6ZWQiLCJkZWZhdWx0RXhwYW5kZWQiLCJkZWZhdWx0RmlsdGVyTWV0aG9kIiwiZmlsdGVyIiwicm93IiwiY29sdW1uIiwiaWQiLCJwaXZvdElkIiwidW5kZWZpbmVkIiwiU3RyaW5nIiwic3RhcnRzV2l0aCIsInZhbHVlIiwiZGVmYXVsdFNvcnRNZXRob2QiLCJhIiwiYiIsImRlc2MiLCJ0b0xvd2VyQ2FzZSIsIm9uUGFnZUNoYW5nZSIsIm9uUGFnZVNpemVDaGFuZ2UiLCJvblNvcnRlZENoYW5nZSIsIm9uRmlsdGVyZWRDaGFuZ2UiLCJvblJlc2l6ZWRDaGFuZ2UiLCJvbkV4cGFuZGVkQ2hhbmdlIiwicGl2b3RCeSIsInBpdm90VmFsS2V5IiwicGl2b3RJREtleSIsInN1YlJvd3NLZXkiLCJhZ2dyZWdhdGVkS2V5IiwibmVzdGluZ0xldmVsS2V5Iiwib3JpZ2luYWxLZXkiLCJpbmRleEtleSIsImdyb3VwZWRCeVBpdm90S2V5Iiwib25GZXRjaERhdGEiLCJjbGFzc05hbWUiLCJzdHlsZSIsImdldFByb3BzIiwiZ2V0VGFibGVQcm9wcyIsImdldFRoZWFkR3JvdXBQcm9wcyIsImdldFRoZWFkR3JvdXBUclByb3BzIiwiZ2V0VGhlYWRHcm91cFRoUHJvcHMiLCJnZXRUaGVhZFByb3BzIiwiZ2V0VGhlYWRUclByb3BzIiwiZ2V0VGhlYWRUaFByb3BzIiwiZ2V0VGhlYWRGaWx0ZXJQcm9wcyIsImdldFRoZWFkRmlsdGVyVHJQcm9wcyIsImdldFRoZWFkRmlsdGVyVGhQcm9wcyIsImdldFRib2R5UHJvcHMiLCJnZXRUckdyb3VwUHJvcHMiLCJnZXRUclByb3BzIiwiZ2V0VGRQcm9wcyIsImdldFRmb290UHJvcHMiLCJnZXRUZm9vdFRyUHJvcHMiLCJnZXRUZm9vdFRkUHJvcHMiLCJnZXRQYWdpbmF0aW9uUHJvcHMiLCJnZXRMb2FkaW5nUHJvcHMiLCJnZXROb0RhdGFQcm9wcyIsImdldFJlc2l6ZXJQcm9wcyIsIkNlbGwiLCJIZWFkZXIiLCJGb290ZXIiLCJBZ2dyZWdhdGVkIiwiUGl2b3QiLCJQaXZvdFZhbHVlIiwiRXhwYW5kZXIiLCJGaWx0ZXIiLCJzaG93IiwibWluV2lkdGgiLCJhZ2dyZWdhdGUiLCJoZWFkZXJDbGFzc05hbWUiLCJoZWFkZXJTdHlsZSIsImdldEhlYWRlclByb3BzIiwiZm9vdGVyQ2xhc3NOYW1lIiwiZm9vdGVyU3R5bGUiLCJnZXRGb290ZXJQcm9wcyIsImZpbHRlck1ldGhvZCIsImZpbHRlckFsbCIsInNvcnRNZXRob2QiLCJleHBhbmRlckRlZmF1bHRzIiwid2lkdGgiLCJwaXZvdERlZmF1bHRzIiwicHJldmlvdXNUZXh0IiwibmV4dFRleHQiLCJsb2FkaW5nVGV4dCIsIm5vRGF0YVRleHQiLCJwYWdlVGV4dCIsIm9mVGV4dCIsInJvd3NUZXh0IiwiVGFibGVDb21wb25lbnQiLCJjaGlsZHJlbiIsInJlc3QiLCJUaGVhZENvbXBvbmVudCIsIm1ha2VUZW1wbGF0ZUNvbXBvbmVudCIsIlRib2R5Q29tcG9uZW50IiwiVHJHcm91cENvbXBvbmVudCIsIlRyQ29tcG9uZW50IiwiVGhDb21wb25lbnQiLCJ0b2dnbGVTb3J0IiwiZSIsIlRkQ29tcG9uZW50IiwiVGZvb3RDb21wb25lbnQiLCJGaWx0ZXJDb21wb25lbnQiLCJvbkNoYW5nZSIsImV2ZW50IiwidGFyZ2V0IiwiRXhwYW5kZXJDb21wb25lbnQiLCJpc0V4cGFuZGVkIiwiUGl2b3RWYWx1ZUNvbXBvbmVudCIsInN1YlJvd3MiLCJsZW5ndGgiLCJBZ2dyZWdhdGVkQ29tcG9uZW50IiwicHJldmlld1ZhbHVlcyIsImQiLCJtYXAiLCJpIiwiUGl2b3RDb21wb25lbnQiLCJQYWdpbmF0aW9uQ29tcG9uZW50IiwiUHJldmlvdXNDb21wb25lbnQiLCJOZXh0Q29tcG9uZW50IiwiTG9hZGluZ0NvbXBvbmVudCIsIk5vRGF0YUNvbXBvbmVudCIsIlJlc2l6ZXJDb21wb25lbnQiLCJQYWRSb3dDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7QUFGQTs7O0FBSUEsSUFBTUEsV0FBVyxTQUFYQSxRQUFXO0FBQUEsU0FBTyxFQUFQO0FBQUEsQ0FBakI7O2tCQUVlO0FBQ2I7QUFDQUMsUUFBTSxFQUZPO0FBR2JDLFdBQVMsS0FISTtBQUliQyxrQkFBZ0IsSUFKSDtBQUtiQyxxQkFBbUIsS0FMTjtBQU1iQyx3QkFBc0IsSUFOVDtBQU9iQyx1QkFBcUIsSUFQUjtBQVFiQyxtQkFBaUIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEVBQWhCLEVBQW9CLEdBQXBCLENBUko7QUFTYkMsbUJBQWlCLEVBVEo7QUFVYkMsZ0JBQWMsSUFWRDtBQVdiQywyQkFBeUIsSUFYWjtBQVliQyx3QkFBc0IsSUFaVDtBQWFiQyx3QkFBc0IsSUFiVDtBQWNiQyxzQkFBb0IsS0FkUDtBQWViQyxZQUFVLElBZkc7QUFnQmJDLGFBQVcsSUFoQkU7QUFpQmJDLGFBQVcsSUFqQkU7QUFrQmJDLGNBQVksS0FsQkM7QUFtQmJDLG1CQUFpQixLQW5CSjtBQW9CYkMsaUJBQWUsRUFwQkY7QUFxQmJDLG1CQUFpQixF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QSxLQUFOO0FBQUE7QUE3UEosQyIsImZpbGUiOiJkZWZhdWx0UHJvcHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuLy9cbmltcG9ydCBfIGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgUGFnaW5hdGlvbiBmcm9tICcuL3BhZ2luYXRpb24nXG5cbmNvbnN0IGVtcHR5T2JqID0gKCkgPT4gKHt9KVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8vIEdlbmVyYWxcbiAgZGF0YTogW10sXG4gIGxvYWRpbmc6IGZhbHNlLFxuICBzaG93UGFnaW5hdGlvbjogdHJ1ZSxcbiAgc2hvd1BhZ2luYXRpb25Ub3A6IGZhbHNlLFxuICBzaG93UGFnaW5hdGlvbkJvdHRvbTogdHJ1ZSxcbiAgc2hvd1BhZ2VTaXplT3B0aW9uczogdHJ1ZSxcbiAgcGFnZVNpemVPcHRpb25zOiBbNSwgMTAsIDIwLCAyNSwgNTAsIDEwMF0sXG4gIGRlZmF1bHRQYWdlU2l6ZTogMjAsXG4gIHNob3dQYWdlSnVtcDogdHJ1ZSxcbiAgY29sbGFwc2VPblNvcnRpbmdDaGFuZ2U6IHRydWUsXG4gIGNvbGxhcHNlT25QYWdlQ2hhbmdlOiB0cnVlLFxuICBjb2xsYXBzZU9uRGF0YUNoYW5nZTogdHJ1ZSxcbiAgZnJlZXplV2hlbkV4cGFuZGVkOiBmYWxzZSxcbiAgc29ydGFibGU6IHRydWUsXG4gIG11bHRpU29ydDogdHJ1ZSxcbiAgcmVzaXphYmxlOiB0cnVlLFxuICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgZGVmYXVsdFNvcnREZXNjOiBmYWxzZSxcbiAgZGVmYXVsdFNvcnRlZDogW10sXG4gIGRlZmF1bHRGaWx0ZXJlZDogW10sXG4gIGRlZmF1bHRSZXNpemVkOiBbXSxcbiAgZGVmYXVsdEV4cGFuZGVkOiB7fSxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIGRlZmF1bHRGaWx0ZXJNZXRob2Q6IChmaWx0ZXIsIHJvdywgY29sdW1uKSA9PiB7XG4gICAgY29uc3QgaWQgPSBmaWx0ZXIucGl2b3RJZCB8fCBmaWx0ZXIuaWRcbiAgICByZXR1cm4gcm93W2lkXSAhPT0gdW5kZWZpbmVkID8gU3RyaW5nKHJvd1tpZF0pLnN0YXJ0c1dpdGgoZmlsdGVyLnZhbHVlKSA6IHRydWVcbiAgfSxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIGRlZmF1bHRTb3J0TWV0aG9kOiAoYSwgYiwgZGVzYykgPT4ge1xuICAgIC8vIGZvcmNlIG51bGwgYW5kIHVuZGVmaW5lZCB0byB0aGUgYm90dG9tXG4gICAgYSA9IGEgPT09IG51bGwgfHwgYSA9PT0gdW5kZWZpbmVkID8gJycgOiBhXG4gICAgYiA9IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkID8gJycgOiBiXG4gICAgLy8gZm9yY2UgYW55IHN0cmluZyB2YWx1ZXMgdG8gbG93ZXJjYXNlXG4gICAgYSA9IHR5cGVvZiBhID09PSAnc3RyaW5nJyA/IGEudG9Mb3dlckNhc2UoKSA6IGFcbiAgICBiID0gdHlwZW9mIGIgPT09ICdzdHJpbmcnID8gYi50b0xvd2VyQ2FzZSgpIDogYlxuICAgIC8vIFJldHVybiBlaXRoZXIgMSBvciAtMSB0byBpbmRpY2F0ZSBhIHNvcnQgcHJpb3JpdHlcbiAgICBpZiAoYSA+IGIpIHtcbiAgICAgIHJldHVybiAxXG4gICAgfVxuICAgIGlmIChhIDwgYikge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIC8vIHJldHVybmluZyAwLCB1bmRlZmluZWQgb3IgYW55IGZhbHNleSB2YWx1ZSB3aWxsIHVzZSBzdWJzZXF1ZW50IHNvcnRzIG9yXG4gICAgLy8gdGhlIGluZGV4IGFzIGEgdGllYnJlYWtlclxuICAgIHJldHVybiAwXG4gIH0sXG5cbiAgLy8gQ29udHJvbGxlZCBTdGF0ZSBQcm9wc1xuICAvLyBwYWdlOiB1bmRlZmluZWQsXG4gIC8vIHBhZ2VTaXplOiB1bmRlZmluZWQsXG4gIC8vIHNvcnRlZDogW10sXG4gIC8vIGZpbHRlcmVkOiBbXSxcbiAgLy8gcmVzaXplZDogW10sXG4gIC8vIGV4cGFuZGVkOiB7fSxcblxuICAvLyBDb250cm9sbGVkIFN0YXRlIENhbGxiYWNrc1xuICBvblBhZ2VDaGFuZ2U6IHVuZGVmaW5lZCxcbiAgb25QYWdlU2l6ZUNoYW5nZTogdW5kZWZpbmVkLFxuICBvblNvcnRlZENoYW5nZTogdW5kZWZpbmVkLFxuICBvbkZpbHRlcmVkQ2hhbmdlOiB1bmRlZmluZWQsXG4gIG9uUmVzaXplZENoYW5nZTogdW5kZWZpbmVkLFxuICBvbkV4cGFuZGVkQ2hhbmdlOiB1bmRlZmluZWQsXG5cbiAgLy8gUGl2b3RpbmdcbiAgcGl2b3RCeTogdW5kZWZpbmVkLFxuXG4gIC8vIEtleSBDb25zdGFudHNcbiAgcGl2b3RWYWxLZXk6ICdfcGl2b3RWYWwnLFxuICBwaXZvdElES2V5OiAnX3Bpdm90SUQnLFxuICBzdWJSb3dzS2V5OiAnX3N1YlJvd3MnLFxuICBhZ2dyZWdhdGVkS2V5OiAnX2FnZ3JlZ2F0ZWQnLFxuICBuZXN0aW5nTGV2ZWxLZXk6ICdfbmVzdGluZ0xldmVsJyxcbiAgb3JpZ2luYWxLZXk6ICdfb3JpZ2luYWwnLFxuICBpbmRleEtleTogJ19pbmRleCcsXG4gIGdyb3VwZWRCeVBpdm90S2V5OiAnX2dyb3VwZWRCeVBpdm90JyxcblxuICAvLyBTZXJ2ZXItc2lkZSBDYWxsYmFja3NcbiAgb25GZXRjaERhdGE6ICgpID0+IG51bGwsXG5cbiAgLy8gQ2xhc3Nlc1xuICBjbGFzc05hbWU6ICcnLFxuICBzdHlsZToge30sXG5cbiAgLy8gQ29tcG9uZW50IGRlY29yYXRvcnNcbiAgZ2V0UHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUYWJsZVByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGhlYWRHcm91cFByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGhlYWRHcm91cFRyUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUaGVhZEdyb3VwVGhQcm9wczogZW1wdHlPYmosXG4gIGdldFRoZWFkUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUaGVhZFRyUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUaGVhZFRoUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUaGVhZEZpbHRlclByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGhlYWRGaWx0ZXJUclByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGhlYWRGaWx0ZXJUaFByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGJvZHlQcm9wczogZW1wdHlPYmosXG4gIGdldFRyR3JvdXBQcm9wczogZW1wdHlPYmosXG4gIGdldFRyUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUZFByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGZvb3RQcm9wczogZW1wdHlPYmosXG4gIGdldFRmb290VHJQcm9wczogZW1wdHlPYmosXG4gIGdldFRmb290VGRQcm9wczogZW1wdHlPYmosXG4gIGdldFBhZ2luYXRpb25Qcm9wczogZW1wdHlPYmosXG4gIGdldExvYWRpbmdQcm9wczogZW1wdHlPYmosXG4gIGdldE5vRGF0YVByb3BzOiBlbXB0eU9iaixcbiAgZ2V0UmVzaXplclByb3BzOiBlbXB0eU9iaixcblxuICAvLyBHbG9iYWwgQ29sdW1uIERlZmF1bHRzXG4gIGNvbHVtbjoge1xuICAgIC8vIFJlbmRlcmVyc1xuICAgIENlbGw6IHVuZGVmaW5lZCxcbiAgICBIZWFkZXI6IHVuZGVmaW5lZCxcbiAgICBGb290ZXI6IHVuZGVmaW5lZCxcbiAgICBBZ2dyZWdhdGVkOiB1bmRlZmluZWQsXG4gICAgUGl2b3Q6IHVuZGVmaW5lZCxcbiAgICBQaXZvdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgRXhwYW5kZXI6IHVuZGVmaW5lZCxcbiAgICBGaWx0ZXI6IHVuZGVmaW5lZCxcbiAgICAvLyBBbGwgQ29sdW1uc1xuICAgIHNvcnRhYmxlOiB1bmRlZmluZWQsIC8vIHVzZSB0YWJsZSBkZWZhdWx0XG4gICAgcmVzaXphYmxlOiB1bmRlZmluZWQsIC8vIHVzZSB0YWJsZSBkZWZhdWx0XG4gICAgZmlsdGVyYWJsZTogdW5kZWZpbmVkLCAvLyB1c2UgdGFibGUgZGVmYXVsdFxuICAgIHNob3c6IHRydWUsXG4gICAgbWluV2lkdGg6IDEwMCxcbiAgICAvLyBDZWxscyBvbmx5XG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICBzdHlsZToge30sXG4gICAgZ2V0UHJvcHM6IGVtcHR5T2JqLFxuICAgIC8vIFBpdm90IG9ubHlcbiAgICBhZ2dyZWdhdGU6IHVuZGVmaW5lZCxcbiAgICAvLyBIZWFkZXJzIG9ubHlcbiAgICBoZWFkZXJDbGFzc05hbWU6ICcnLFxuICAgIGhlYWRlclN0eWxlOiB7fSxcbiAgICBnZXRIZWFkZXJQcm9wczogZW1wdHlPYmosXG4gICAgLy8gRm9vdGVycyBvbmx5XG4gICAgZm9vdGVyQ2xhc3NOYW1lOiAnJyxcbiAgICBmb290ZXJTdHlsZToge30sXG4gICAgZ2V0Rm9vdGVyUHJvcHM6IGVtcHR5T2JqLFxuICAgIGZpbHRlck1ldGhvZDogdW5kZWZpbmVkLFxuICAgIGZpbHRlckFsbDogZmFsc2UsXG4gICAgc29ydE1ldGhvZDogdW5kZWZpbmVkLFxuICB9LFxuXG4gIC8vIEdsb2JhbCBFeHBhbmRlciBDb2x1bW4gRGVmYXVsdHNcbiAgZXhwYW5kZXJEZWZhdWx0czoge1xuICAgIHNvcnRhYmxlOiBmYWxzZSxcbiAgICByZXNpemFibGU6IGZhbHNlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHdpZHRoOiAzNSxcbiAgfSxcblxuICBwaXZvdERlZmF1bHRzOiB7XG4gICAgLy8gZXh0ZW5kIHRoZSBkZWZhdWx0cyBmb3IgcGl2b3RlZCBjb2x1bW5zIGhlcmVcbiAgfSxcblxuICAvLyBUZXh0XG4gIHByZXZpb3VzVGV4dDogJ1ByZXZpb3VzJyxcbiAgbmV4dFRleHQ6ICdOZXh0JyxcbiAgbG9hZGluZ1RleHQ6ICdMb2FkaW5nLi4uJyxcbiAgbm9EYXRhVGV4dDogJ05vIHJvd3MgZm91bmQnLFxuICBwYWdlVGV4dDogJ1BhZ2UnLFxuICBvZlRleHQ6ICdvZicsXG4gIHJvd3NUZXh0OiAncm93cycsXG5cbiAgLy8gQ29tcG9uZW50c1xuICBUYWJsZUNvbXBvbmVudDogKHsgY2hpbGRyZW4sIGNsYXNzTmFtZSwgLi4ucmVzdCB9KSA9PiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdydC10YWJsZScsIGNsYXNzTmFtZSl9XG4gICAgICByb2xlPVwiZ3JpZFwiXG4gICAgICAvLyB0YWJJbmRleD0nMCdcbiAgICAgIHsuLi5yZXN0fVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKSxcbiAgVGhlYWRDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC10aGVhZCcsICdUaGVhZCcpLFxuICBUYm9keUNvbXBvbmVudDogXy5tYWtlVGVtcGxhdGVDb21wb25lbnQoJ3J0LXRib2R5JywgJ1Rib2R5JyksXG4gIFRyR3JvdXBDb21wb25lbnQ6ICh7IGNoaWxkcmVuLCBjbGFzc05hbWUsIC4uLnJlc3QgfSkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdydC10ci1ncm91cCcsIGNsYXNzTmFtZSl9IHJvbGU9XCJyb3dncm91cFwiIHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKSxcbiAgVHJDb21wb25lbnQ6ICh7IGNoaWxkcmVuLCBjbGFzc05hbWUsIC4uLnJlc3QgfSkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdydC10cicsIGNsYXNzTmFtZSl9IHJvbGU9XCJyb3dcIiB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICksXG4gIFRoQ29tcG9uZW50OiAoe1xuICAgIHRvZ2dsZVNvcnQsIGNsYXNzTmFtZSwgY2hpbGRyZW4sIC4uLnJlc3RcbiAgfSkgPT4gKFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdydC10aCcsIGNsYXNzTmFtZSl9XG4gICAgICBvbkNsaWNrPXtlID0+IHRvZ2dsZVNvcnQgJiYgdG9nZ2xlU29ydChlKX1cbiAgICAgIHJvbGU9XCJjb2x1bW5oZWFkZXJcIlxuICAgICAgdGFiSW5kZXg9XCItMVwiIC8vIFJlc29sdmVzIGVzbGludCBpc3N1ZXMgd2l0aG91dCBpbXBsZW1lbnRpbmcga2V5Ym9hcmQgbmF2aWdhdGlvbiBpbmNvcnJlY3RseVxuICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApLFxuICBUZENvbXBvbmVudDogKHtcbiAgICB0b2dnbGVTb3J0LCBjbGFzc05hbWUsIGNoaWxkcmVuLCAuLi5yZXN0XG4gIH0pID0+IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NuYW1lcygncnQtdGQnLCBjbGFzc05hbWUpfSByb2xlPVwiZ3JpZGNlbGxcIiB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICksXG4gIFRmb290Q29tcG9uZW50OiBfLm1ha2VUZW1wbGF0ZUNvbXBvbmVudCgncnQtdGZvb3QnLCAnVGZvb3QnKSxcbiAgRmlsdGVyQ29tcG9uZW50OiAoeyBmaWx0ZXIsIG9uQ2hhbmdlIH0pID0+IChcbiAgICA8aW5wdXRcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICB9fVxuICAgICAgdmFsdWU9e2ZpbHRlciA/IGZpbHRlci52YWx1ZSA6ICcnfVxuICAgICAgb25DaGFuZ2U9e2V2ZW50ID0+IG9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgLz5cbiAgKSxcbiAgRXhwYW5kZXJDb21wb25lbnQ6ICh7IGlzRXhwYW5kZWQgfSkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdydC1leHBhbmRlcicsIGlzRXhwYW5kZWQgJiYgJy1vcGVuJyl9PiZidWxsOzwvZGl2PlxuICApLFxuICBQaXZvdFZhbHVlQ29tcG9uZW50OiAoeyBzdWJSb3dzLCB2YWx1ZSB9KSA9PiAoXG4gICAgPHNwYW4+XG4gICAgICB7dmFsdWV9IHtzdWJSb3dzICYmIGAoJHtzdWJSb3dzLmxlbmd0aH0pYH1cbiAgICA8L3NwYW4+XG4gICksXG4gIEFnZ3JlZ2F0ZWRDb21wb25lbnQ6ICh7IHN1YlJvd3MsIGNvbHVtbiB9KSA9PiB7XG4gICAgY29uc3QgcHJldmlld1ZhbHVlcyA9IHN1YlJvd3MuZmlsdGVyKGQgPT4gdHlwZW9mIGRbY29sdW1uLmlkXSAhPT0gJ3VuZGVmaW5lZCcpLm1hcCgocm93LCBpKSA9PiAoXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvbm8tYXJyYXktaW5kZXgta2V5XG4gICAgICA8c3BhbiBrZXk9e2l9PlxuICAgICAgICB7cm93W2NvbHVtbi5pZF19XG4gICAgICAgIHtpIDwgc3ViUm93cy5sZW5ndGggLSAxID8gJywgJyA6ICcnfVxuICAgICAgPC9zcGFuPlxuICAgICkpXG4gICAgcmV0dXJuIDxzcGFuPntwcmV2aWV3VmFsdWVzfTwvc3Bhbj5cbiAgfSxcbiAgUGl2b3RDb21wb25lbnQ6IHVuZGVmaW5lZCwgLy8gdGhpcyBpcyBhIGNvbXB1dGVkIGRlZmF1bHQgZ2VuZXJhdGVkIHVzaW5nXG4gIC8vIHRoZSBFeHBhbmRlckNvbXBvbmVudCBhbmQgUGl2b3RWYWx1ZUNvbXBvbmVudCBhdCBydW4tdGltZSBpbiBtZXRob2RzLmpzXG4gIFBhZ2luYXRpb25Db21wb25lbnQ6IFBhZ2luYXRpb24sXG4gIFByZXZpb3VzQ29tcG9uZW50OiB1bmRlZmluZWQsXG4gIE5leHRDb21wb25lbnQ6IHVuZGVmaW5lZCxcbiAgTG9hZGluZ0NvbXBvbmVudDogKHtcbiAgICBjbGFzc05hbWUsIGxvYWRpbmcsIGxvYWRpbmdUZXh0LCAuLi5yZXN0XG4gIH0pID0+IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NuYW1lcygnLWxvYWRpbmcnLCB7ICctYWN0aXZlJzogbG9hZGluZyB9LCBjbGFzc05hbWUpfSB7Li4ucmVzdH0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIi1sb2FkaW5nLWlubmVyXCI+e2xvYWRpbmdUZXh0fTwvZGl2PlxuICAgIDwvZGl2PlxuICApLFxuICBOb0RhdGFDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC1ub0RhdGEnLCAnTm9EYXRhJyksXG4gIFJlc2l6ZXJDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC1yZXNpemVyJywgJ1Jlc2l6ZXInKSxcbiAgUGFkUm93Q29tcG9uZW50OiAoKSA9PiA8c3Bhbj4mbmJzcDs8L3NwYW4+LFxufVxuIl19