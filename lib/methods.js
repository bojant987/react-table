'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _infiniteHelpers = require('./lazyLoad/utils/infiniteHelpers');

var _infiniteHelpers2 = _interopRequireDefault(_infiniteHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var timeScrollStateLastsForAfterUserScrolls = 150;

exports.default = function (Base) {
  return function (_Base) {
    _inherits(_class, _Base);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'generateComputedUtilityFunctions',
      value: function generateComputedUtilityFunctions() {
        var _this2 = this;

        //
        var utilities = {};

        utilities.nodeScrollListener = this.infiniteHandleScroll;
        utilities.getScrollTop = function () {
          return _this2.scrollable ? _this2.scrollable.scrollTop : 0;
        };

        utilities.setScrollTop = function (top) {
          if (_this2.scrollable) {
            _this2.scrollable.scrollTop = top;
          }
        };
        utilities.scrollShouldBeIgnored = function (event) {
          return event.target !== _this2.scrollable;
        };

        utilities.buildScrollableStyle = function () {
          return Object.assign({}, {
            height: _this2.computedProps.containerHeight,
            overflowX: 'hidden',
            overflowY: 'scroll',
            WebkitOverflowScrolling: 'touch'
          }, _this2.computedProps.styles.scrollableStyle || {});
        };

        return utilities;
      }
    }, {
      key: 'recomputeInternalStateFromProps',
      value: function recomputeInternalStateFromProps(props) {
        //
        var computedProps = _infiniteHelpers2.default.generateComputedProps(props);
        var utils = this.generateComputedUtilityFunctions();

        var newState = {};

        newState.dataLength = computedProps.data.length;
        newState.infiniteComputer = _infiniteHelpers2.default.createInfiniteComputer(computedProps.elementHeight, computedProps.data);

        newState.preloadBatchSize = computedProps.preloadBatchSize;
        newState.preloadAdditionalHeight = computedProps.preloadAdditionalHeight;

        newState = Object.assign(newState, _infiniteHelpers2.default.recomputeApertureStateFromOptionsAndScrollTop(newState, utils.getScrollTop()));

        return {
          computedProps: computedProps,
          utils: utils,
          newState: newState
        };
      }
    }, {
      key: 'infiniteHandleScroll',
      value: function infiniteHandleScroll(e) {
        //
        if (this.utils.scrollShouldBeIgnored(e)) {
          return;
        }

        this.handleScroll(this.utils.getScrollTop());
      }
    }, {
      key: 'manageScrollTimeouts',
      value: function manageScrollTimeouts() {
        // Maintains a series of timeouts to set this.state.isScrolling
        // to be true when the element is scrolling.

        if (this.state.scrollTimeout) {
          clearTimeout(this.state.scrollTimeout);
        }

        var that = this;
        var scrollTimeout = setTimeout(function () {
          that.setState({
            isScrolling: false,
            scrollTimeout: undefined
          });
        }, timeScrollStateLastsForAfterUserScrolls);

        this.setState({
          isScrolling: true,
          scrollTimeout: scrollTimeout
        });
      }
    }, {
      key: 'handleScroll',
      value: function handleScroll(scrollTop) {
        this.manageScrollTimeouts();

        var newApertureState = _infiniteHelpers2.default.recomputeApertureStateFromOptionsAndScrollTop(this.state, scrollTop);
        // this.props.onVisibleChange(newApertureState);
        this.setState(Object.assign({}, newApertureState));
      }
    }, {
      key: 'getResolvedState',
      value: function getResolvedState(props, state) {
        var resolvedState = _extends({}, _utils2.default.compactObject(this.state), _utils2.default.compactObject(this.props), _utils2.default.compactObject(state), _utils2.default.compactObject(props));
        return resolvedState;
      }
    }, {
      key: 'getDataModel',
      value: function getDataModel(newState) {
        var _this3 = this;

        var columns = newState.columns,
            _newState$pivotBy = newState.pivotBy,
            pivotBy = _newState$pivotBy === undefined ? [] : _newState$pivotBy,
            data = newState.data,
            pivotIDKey = newState.pivotIDKey,
            pivotValKey = newState.pivotValKey,
            subRowsKey = newState.subRowsKey,
            aggregatedKey = newState.aggregatedKey,
            nestingLevelKey = newState.nestingLevelKey,
            originalKey = newState.originalKey,
            indexKey = newState.indexKey,
            groupedByPivotKey = newState.groupedByPivotKey,
            SubComponent = newState.SubComponent;

        // Determine Header Groups

        var hasHeaderGroups = false;
        columns.forEach(function (column) {
          if (column.columns) {
            hasHeaderGroups = true;
          }
        });

        var columnsWithExpander = [].concat(_toConsumableArray(columns));

        var expanderColumn = columns.find(function (col) {
          return col.expander || col.columns && col.columns.some(function (col2) {
            return col2.expander;
          });
        });
        // The actual expander might be in the columns field of a group column
        if (expanderColumn && !expanderColumn.expander) {
          expanderColumn = expanderColumn.columns.find(function (col) {
            return col.expander;
          });
        }

        // If we have SubComponent's we need to make sure we have an expander column
        if (SubComponent && !expanderColumn) {
          expanderColumn = { expander: true };
          columnsWithExpander = [expanderColumn].concat(_toConsumableArray(columnsWithExpander));
        }

        var makeDecoratedColumn = function makeDecoratedColumn(column, parentColumn) {
          var dcol = void 0;
          if (column.expander) {
            dcol = _extends({}, _this3.props.column, _this3.props.expanderDefaults, column);
          } else {
            dcol = _extends({}, _this3.props.column, column);
          }

          // Ensure minWidth is not greater than maxWidth if set
          if (dcol.maxWidth < dcol.minWidth) {
            dcol.minWidth = dcol.maxWidth;
          }

          if (parentColumn) {
            dcol.parentColumn = parentColumn;
          }

          // First check for string accessor
          if (typeof dcol.accessor === 'string') {
            dcol.id = dcol.id || dcol.accessor;
            var accessorString = dcol.accessor;
            dcol.accessor = function (row) {
              return _utils2.default.get(row, accessorString);
            };
            return dcol;
          }

          // Fall back to functional accessor (but require an ID)
          if (dcol.accessor && !dcol.id) {
            console.warn(dcol);
            throw new Error('A column id is required if using a non-string accessor for column above.');
          }

          // Fall back to an undefined accessor
          if (!dcol.accessor) {
            dcol.accessor = function () {
              return undefined;
            };
          }

          return dcol;
        };

        var allDecoratedColumns = [];

        // Decorate the columns
        var decorateAndAddToAll = function decorateAndAddToAll(column, parentColumn) {
          var decoratedColumn = makeDecoratedColumn(column, parentColumn);
          allDecoratedColumns.push(decoratedColumn);
          return decoratedColumn;
        };

        var decoratedColumns = columnsWithExpander.map(function (column) {
          if (column.columns) {
            return _extends({}, column, {
              columns: column.columns.map(function (d) {
                return decorateAndAddToAll(d, column);
              })
            });
          }
          return decorateAndAddToAll(column);
        });

        // Build the visible columns, headers and flat column list
        var visibleColumns = decoratedColumns.slice();
        var allVisibleColumns = [];

        visibleColumns = visibleColumns.map(function (column) {
          if (column.columns) {
            var visibleSubColumns = column.columns.filter(function (d) {
              return pivotBy.indexOf(d.id) > -1 ? false : _utils2.default.getFirstDefined(d.show, true);
            });
            return _extends({}, column, {
              columns: visibleSubColumns
            });
          }
          return column;
        });

        visibleColumns = visibleColumns.filter(function (column) {
          return column.columns ? column.columns.length : pivotBy.indexOf(column.id) > -1 ? false : _utils2.default.getFirstDefined(column.show, true);
        });

        // Find any custom pivot location
        var pivotIndex = visibleColumns.findIndex(function (col) {
          return col.pivot;
        });

        // Handle Pivot Columns
        if (pivotBy.length) {
          // Retrieve the pivot columns in the correct pivot order
          var pivotColumns = [];
          pivotBy.forEach(function (pivotID) {
            var found = allDecoratedColumns.find(function (d) {
              return d.id === pivotID;
            });
            if (found) {
              pivotColumns.push(found);
            }
          });

          var PivotParentColumn = pivotColumns.reduce(function (prev, current) {
            return prev && prev === current.parentColumn && current.parentColumn;
          }, pivotColumns[0].parentColumn);

          var PivotGroupHeader = hasHeaderGroups && PivotParentColumn.Header;
          PivotGroupHeader = PivotGroupHeader || function () {
            return _react2.default.createElement(
              'strong',
              null,
              'Pivoted'
            );
          };

          var pivotColumnGroup = {
            Header: PivotGroupHeader,
            columns: pivotColumns.map(function (col) {
              return _extends({}, _this3.props.pivotDefaults, col, {
                pivoted: true
              });
            })

            // Place the pivotColumns back into the visibleColumns
          };if (pivotIndex >= 0) {
            pivotColumnGroup = _extends({}, visibleColumns[pivotIndex], pivotColumnGroup);
            visibleColumns.splice(pivotIndex, 1, pivotColumnGroup);
          } else {
            visibleColumns.unshift(pivotColumnGroup);
          }
        }

        // Build Header Groups
        var headerGroups = [];
        var currentSpan = [];

        // A convenience function to add a header and reset the currentSpan
        var addHeader = function addHeader(columns, column) {
          headerGroups.push(_extends({}, _this3.props.column, column, {
            columns: columns
          }));
          currentSpan = [];
        };

        // Build flast list of allVisibleColumns and HeaderGroups
        visibleColumns.forEach(function (column) {
          if (column.columns) {
            allVisibleColumns = allVisibleColumns.concat(column.columns);
            if (currentSpan.length > 0) {
              addHeader(currentSpan);
            }
            addHeader(column.columns, column);
            return;
          }
          allVisibleColumns.push(column);
          currentSpan.push(column);
        });
        if (hasHeaderGroups && currentSpan.length > 0) {
          addHeader(currentSpan);
        }

        // Access the data
        var accessRow = function accessRow(d, i) {
          var _row;

          var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

          var row = (_row = {}, _defineProperty(_row, originalKey, d), _defineProperty(_row, indexKey, i), _defineProperty(_row, subRowsKey, d[subRowsKey]), _defineProperty(_row, nestingLevelKey, level), _row);
          allDecoratedColumns.forEach(function (column) {
            if (column.expander) return;
            row[column.id] = column.accessor(d);
          });
          if (row[subRowsKey]) {
            row[subRowsKey] = row[subRowsKey].map(function (d, i) {
              return accessRow(d, i, level + 1);
            });
          }
          return row;
        };
        var resolvedData = data.map(function (d, i) {
          return accessRow(d, i);
        });

        // TODO: Make it possible to fabricate nested rows without pivoting
        var aggregatingColumns = allVisibleColumns.filter(function (d) {
          return !d.expander && d.aggregate;
        });

        // If pivoting, recursively group the data
        var aggregate = function aggregate(rows) {
          var aggregationValues = {};
          aggregatingColumns.forEach(function (column) {
            var values = rows.map(function (d) {
              return d[column.id];
            });
            aggregationValues[column.id] = column.aggregate(values, rows);
          });
          return aggregationValues;
        };
        if (pivotBy.length) {
          var groupRecursively = function groupRecursively(rows, keys) {
            var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            // This is the last level, just return the rows
            if (i === keys.length) {
              return rows;
            }
            // Group the rows together for this level
            var groupedRows = Object.entries(_utils2.default.groupBy(rows, keys[i])).map(function (_ref) {
              var _ref3;

              var _ref2 = _slicedToArray(_ref, 2),
                  key = _ref2[0],
                  value = _ref2[1];

              return _ref3 = {}, _defineProperty(_ref3, pivotIDKey, keys[i]), _defineProperty(_ref3, pivotValKey, key), _defineProperty(_ref3, keys[i], key), _defineProperty(_ref3, subRowsKey, value), _defineProperty(_ref3, nestingLevelKey, i), _defineProperty(_ref3, groupedByPivotKey, true), _ref3;
            });
            // Recurse into the subRows
            groupedRows = groupedRows.map(function (rowGroup) {
              var _extends2;

              var subRows = groupRecursively(rowGroup[subRowsKey], keys, i + 1);
              return _extends({}, rowGroup, (_extends2 = {}, _defineProperty(_extends2, subRowsKey, subRows), _defineProperty(_extends2, aggregatedKey, true), _extends2), aggregate(subRows));
            });
            return groupedRows;
          };
          resolvedData = groupRecursively(resolvedData, pivotBy);
        }

        return _extends({}, newState, {
          resolvedData: resolvedData,
          allVisibleColumns: allVisibleColumns,
          headerGroups: headerGroups,
          allDecoratedColumns: allDecoratedColumns,
          hasHeaderGroups: hasHeaderGroups
        });
      }
    }, {
      key: 'getSortedData',
      value: function getSortedData(resolvedState) {
        var manual = resolvedState.manual,
            sorted = resolvedState.sorted,
            filtered = resolvedState.filtered,
            defaultFilterMethod = resolvedState.defaultFilterMethod,
            resolvedData = resolvedState.resolvedData,
            allVisibleColumns = resolvedState.allVisibleColumns,
            allDecoratedColumns = resolvedState.allDecoratedColumns;


        var sortMethodsByColumnID = {};

        allDecoratedColumns.filter(function (col) {
          return col.sortMethod;
        }).forEach(function (col) {
          sortMethodsByColumnID[col.id] = col.sortMethod;
        });

        // Resolve the data from either manual data or sorted data
        return {
          sortedData: manual ? resolvedData : this.sortData(this.filterData(resolvedData, filtered, defaultFilterMethod, allVisibleColumns), sorted, sortMethodsByColumnID)
        };
      }
    }, {
      key: 'fireFetchData',
      value: function fireFetchData() {
        this.props.onFetchData(this.getResolvedState(), this);
      }
    }, {
      key: 'getPropOrState',
      value: function getPropOrState(key) {
        return _utils2.default.getFirstDefined(this.props[key], this.state[key]);
      }
    }, {
      key: 'getStateOrProp',
      value: function getStateOrProp(key) {
        return _utils2.default.getFirstDefined(this.state[key], this.props[key]);
      }
    }, {
      key: 'filterData',
      value: function filterData(data, filtered, defaultFilterMethod, allVisibleColumns) {
        var _this4 = this;

        var filteredData = data;

        if (filtered.length) {
          filteredData = filtered.reduce(function (filteredSoFar, nextFilter) {
            var column = allVisibleColumns.find(function (x) {
              return x.id === nextFilter.id;
            });

            // Don't filter hidden columns or columns that have had their filters disabled
            if (!column || column.filterable === false) {
              return filteredSoFar;
            }

            var filterMethod = column.filterMethod || defaultFilterMethod;

            // If 'filterAll' is set to true, pass the entire dataset to the filter method
            if (column.filterAll) {
              return filterMethod(nextFilter, filteredSoFar, column);
            }
            return filteredSoFar.filter(function (row) {
              return filterMethod(nextFilter, row, column);
            });
          }, filteredData);

          // Apply the filter to the subrows if we are pivoting, and then
          // filter any rows without subcolumns because it would be strange to show
          filteredData = filteredData.map(function (row) {
            if (!row[_this4.props.subRowsKey]) {
              return row;
            }
            return _extends({}, row, _defineProperty({}, _this4.props.subRowsKey, _this4.filterData(row[_this4.props.subRowsKey], filtered, defaultFilterMethod, allVisibleColumns)));
          }).filter(function (row) {
            if (!row[_this4.props.subRowsKey]) {
              return true;
            }
            return row[_this4.props.subRowsKey].length > 0;
          });
        }

        return filteredData;
      }
    }, {
      key: 'sortData',
      value: function sortData(data, sorted) {
        var _this5 = this;

        var sortMethodsByColumnID = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        if (!sorted.length) {
          return data;
        }

        var sortedData = (this.props.orderByMethod || _utils2.default.orderBy)(data, sorted.map(function (sort) {
          // Support custom sorting methods for each column
          if (sortMethodsByColumnID[sort.id]) {
            return function (a, b) {
              return sortMethodsByColumnID[sort.id](a[sort.id], b[sort.id], sort.desc);
            };
          }
          return function (a, b) {
            return _this5.props.defaultSortMethod(a[sort.id], b[sort.id], sort.desc);
          };
        }), sorted.map(function (d) {
          return !d.desc;
        }), this.props.indexKey);

        sortedData.forEach(function (row) {
          if (!row[_this5.props.subRowsKey]) {
            return;
          }
          row[_this5.props.subRowsKey] = _this5.sortData(row[_this5.props.subRowsKey], sorted, sortMethodsByColumnID);
        });

        return sortedData;
      }
    }, {
      key: 'getMinRows',
      value: function getMinRows() {
        return _utils2.default.getFirstDefined(this.props.minRows, this.getStateOrProp('pageSize'));
      }

      // User actions

    }, {
      key: 'onPageChange',
      value: function onPageChange(page) {
        var _props = this.props,
            onPageChange = _props.onPageChange,
            collapseOnPageChange = _props.collapseOnPageChange;


        var newState = { page: page };
        if (collapseOnPageChange) {
          newState.expanded = {};
        }
        this.setStateWithData(newState, function () {
          return onPageChange && onPageChange(page);
        });
      }
    }, {
      key: 'onPageSizeChange',
      value: function onPageSizeChange(newPageSize) {
        var onPageSizeChange = this.props.onPageSizeChange;

        var _getResolvedState = this.getResolvedState(),
            pageSize = _getResolvedState.pageSize,
            page = _getResolvedState.page;

        // Normalize the page to display


        var currentRow = pageSize * page;
        var newPage = Math.floor(currentRow / newPageSize);

        this.setStateWithData({
          pageSize: newPageSize,
          page: newPage
        }, function () {
          return onPageSizeChange && onPageSizeChange(newPageSize, newPage);
        });
      }
    }, {
      key: 'sortColumn',
      value: function sortColumn(column, additive) {
        var _getResolvedState2 = this.getResolvedState(),
            sorted = _getResolvedState2.sorted,
            skipNextSort = _getResolvedState2.skipNextSort,
            defaultSortDesc = _getResolvedState2.defaultSortDesc;

        var firstSortDirection = Object.prototype.hasOwnProperty.call(column, 'defaultSortDesc') ? column.defaultSortDesc : defaultSortDesc;
        var secondSortDirection = !firstSortDirection;

        // we can't stop event propagation from the column resize move handlers
        // attached to the document because of react's synthetic events
        // so we have to prevent the sort function from actually sorting
        // if we click on the column resize element within a header.
        if (skipNextSort) {
          this.setStateWithData({
            skipNextSort: false
          });
          return;
        }

        var onSortedChange = this.props.onSortedChange;


        var newSorted = _utils2.default.clone(sorted || []).map(function (d) {
          d.desc = _utils2.default.isSortingDesc(d);
          return d;
        });
        if (!_utils2.default.isArray(column)) {
          // Single-Sort
          var existingIndex = newSorted.findIndex(function (d) {
            return d.id === column.id;
          });
          if (existingIndex > -1) {
            var existing = newSorted[existingIndex];
            if (existing.desc === secondSortDirection) {
              if (additive) {
                newSorted.splice(existingIndex, 1);
              } else {
                existing.desc = firstSortDirection;
                newSorted = [existing];
              }
            } else {
              existing.desc = secondSortDirection;
              if (!additive) {
                newSorted = [existing];
              }
            }
          } else if (additive) {
            newSorted.push({
              id: column.id,
              desc: firstSortDirection
            });
          } else {
            newSorted = [{
              id: column.id,
              desc: firstSortDirection
            }];
          }
        } else {
          // Multi-Sort
          var _existingIndex = newSorted.findIndex(function (d) {
            return d.id === column[0].id;
          });
          // Existing Sorted Column
          if (_existingIndex > -1) {
            var _existing = newSorted[_existingIndex];
            if (_existing.desc === secondSortDirection) {
              if (additive) {
                newSorted.splice(_existingIndex, column.length);
              } else {
                column.forEach(function (d, i) {
                  newSorted[_existingIndex + i].desc = firstSortDirection;
                });
              }
            } else {
              column.forEach(function (d, i) {
                newSorted[_existingIndex + i].desc = secondSortDirection;
              });
            }
            if (!additive) {
              newSorted = newSorted.slice(_existingIndex, column.length);
            }
            // New Sort Column
          } else if (additive) {
            newSorted = newSorted.concat(column.map(function (d) {
              return {
                id: d.id,
                desc: firstSortDirection
              };
            }));
          } else {
            newSorted = column.map(function (d) {
              return {
                id: d.id,
                desc: firstSortDirection
              };
            });
          }
        }

        this.setStateWithData({
          page: !sorted.length && newSorted.length || !additive ? 0 : this.state.page,
          sorted: newSorted
        }, function () {
          return onSortedChange && onSortedChange(newSorted, column, additive);
        });
      }
    }, {
      key: 'filterColumn',
      value: function filterColumn(column, value) {
        var _getResolvedState3 = this.getResolvedState(),
            filtered = _getResolvedState3.filtered;

        var onFilteredChange = this.props.onFilteredChange;

        // Remove old filter first if it exists

        var newFiltering = (filtered || []).filter(function (x) {
          return x.id !== column.id;
        });

        if (value !== '') {
          newFiltering.push({
            id: column.id,
            value: value
          });
        }

        this.setStateWithData({
          filtered: newFiltering
        }, function () {
          return onFilteredChange && onFilteredChange(newFiltering, column, value);
        });
      }
    }, {
      key: 'resizeColumnStart',
      value: function resizeColumnStart(event, column, isTouch) {
        var _this6 = this;

        event.stopPropagation();
        var parentWidth = event.target.parentElement.getBoundingClientRect().width;

        var pageX = void 0;
        if (isTouch) {
          pageX = event.changedTouches[0].pageX;
        } else {
          pageX = event.pageX;
        }

        this.trapEvents = true;
        this.setStateWithData({
          currentlyResizing: {
            id: column.id,
            startX: pageX,
            parentWidth: parentWidth
          }
        }, function () {
          if (isTouch) {
            document.addEventListener('touchmove', _this6.resizeColumnMoving);
            document.addEventListener('touchcancel', _this6.resizeColumnEnd);
            document.addEventListener('touchend', _this6.resizeColumnEnd);
          } else {
            document.addEventListener('mousemove', _this6.resizeColumnMoving);
            document.addEventListener('mouseup', _this6.resizeColumnEnd);
            document.addEventListener('mouseleave', _this6.resizeColumnEnd);
          }
        });
      }
    }, {
      key: 'resizeColumnMoving',
      value: function resizeColumnMoving(event) {
        event.stopPropagation();
        var onResizedChange = this.props.onResizedChange;

        var _getResolvedState4 = this.getResolvedState(),
            resized = _getResolvedState4.resized,
            currentlyResizing = _getResolvedState4.currentlyResizing;

        // Delete old value


        var newResized = resized.filter(function (x) {
          return x.id !== currentlyResizing.id;
        });

        var pageX = void 0;

        if (event.type === 'touchmove') {
          pageX = event.changedTouches[0].pageX;
        } else if (event.type === 'mousemove') {
          pageX = event.pageX;
        }

        // Set the min size to 10 to account for margin and border or else the
        // group headers don't line up correctly
        var newWidth = Math.max(currentlyResizing.parentWidth + pageX - currentlyResizing.startX, 11);

        newResized.push({
          id: currentlyResizing.id,
          value: newWidth
        });

        this.setStateWithData({
          resized: newResized
        }, function () {
          return onResizedChange && onResizedChange(newResized, event);
        });
      }
    }, {
      key: 'resizeColumnEnd',
      value: function resizeColumnEnd(event) {
        event.stopPropagation();
        var isTouch = event.type === 'touchend' || event.type === 'touchcancel';

        if (isTouch) {
          document.removeEventListener('touchmove', this.resizeColumnMoving);
          document.removeEventListener('touchcancel', this.resizeColumnEnd);
          document.removeEventListener('touchend', this.resizeColumnEnd);
        }

        // If its a touch event clear the mouse one's as well because sometimes
        // the mouseDown event gets called as well, but the mouseUp event doesn't
        document.removeEventListener('mousemove', this.resizeColumnMoving);
        document.removeEventListener('mouseup', this.resizeColumnEnd);
        document.removeEventListener('mouseleave', this.resizeColumnEnd);

        // The touch events don't propagate up to the sorting's onMouseDown event so
        // no need to prevent it from happening or else the first click after a touch
        // event resize will not sort the column.
        if (!isTouch) {
          this.setStateWithData({
            skipNextSort: true,
            currentlyResizing: false
          });
        }
      }
    }]);

    return _class;
  }(Base);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRob2RzLmpzIl0sIm5hbWVzIjpbInRpbWVTY3JvbGxTdGF0ZUxhc3RzRm9yQWZ0ZXJVc2VyU2Nyb2xscyIsInV0aWxpdGllcyIsIm5vZGVTY3JvbGxMaXN0ZW5lciIsImluZmluaXRlSGFuZGxlU2Nyb2xsIiwiZ2V0U2Nyb2xsVG9wIiwic2Nyb2xsYWJsZSIsInNjcm9sbFRvcCIsInNldFNjcm9sbFRvcCIsInRvcCIsInNjcm9sbFNob3VsZEJlSWdub3JlZCIsImV2ZW50IiwidGFyZ2V0IiwiYnVpbGRTY3JvbGxhYmxlU3R5bGUiLCJPYmplY3QiLCJhc3NpZ24iLCJoZWlnaHQiLCJjb21wdXRlZFByb3BzIiwiY29udGFpbmVySGVpZ2h0Iiwib3ZlcmZsb3dYIiwib3ZlcmZsb3dZIiwiV2Via2l0T3ZlcmZsb3dTY3JvbGxpbmciLCJzdHlsZXMiLCJzY3JvbGxhYmxlU3R5bGUiLCJwcm9wcyIsImdlbmVyYXRlQ29tcHV0ZWRQcm9wcyIsInV0aWxzIiwiZ2VuZXJhdGVDb21wdXRlZFV0aWxpdHlGdW5jdGlvbnMiLCJuZXdTdGF0ZSIsImRhdGFMZW5ndGgiLCJkYXRhIiwibGVuZ3RoIiwiaW5maW5pdGVDb21wdXRlciIsImNyZWF0ZUluZmluaXRlQ29tcHV0ZXIiLCJlbGVtZW50SGVpZ2h0IiwicHJlbG9hZEJhdGNoU2l6ZSIsInByZWxvYWRBZGRpdGlvbmFsSGVpZ2h0IiwicmVjb21wdXRlQXBlcnR1cmVTdGF0ZUZyb21PcHRpb25zQW5kU2Nyb2xsVG9wIiwiZSIsImhhbmRsZVNjcm9sbCIsInN0YXRlIiwic2Nyb2xsVGltZW91dCIsImNsZWFyVGltZW91dCIsInRoYXQiLCJzZXRUaW1lb3V0Iiwic2V0U3RhdGUiLCJpc1Njcm9sbGluZyIsInVuZGVmaW5lZCIsIm1hbmFnZVNjcm9sbFRpbWVvdXRzIiwibmV3QXBlcnR1cmVTdGF0ZSIsInJlc29sdmVkU3RhdGUiLCJjb21wYWN0T2JqZWN0IiwiY29sdW1ucyIsInBpdm90QnkiLCJwaXZvdElES2V5IiwicGl2b3RWYWxLZXkiLCJzdWJSb3dzS2V5IiwiYWdncmVnYXRlZEtleSIsIm5lc3RpbmdMZXZlbEtleSIsIm9yaWdpbmFsS2V5IiwiaW5kZXhLZXkiLCJncm91cGVkQnlQaXZvdEtleSIsIlN1YkNvbXBvbmVudCIsImhhc0hlYWRlckdyb3VwcyIsImZvckVhY2giLCJjb2x1bW4iLCJjb2x1bW5zV2l0aEV4cGFuZGVyIiwiZXhwYW5kZXJDb2x1bW4iLCJmaW5kIiwiY29sIiwiZXhwYW5kZXIiLCJzb21lIiwiY29sMiIsIm1ha2VEZWNvcmF0ZWRDb2x1bW4iLCJwYXJlbnRDb2x1bW4iLCJkY29sIiwiZXhwYW5kZXJEZWZhdWx0cyIsIm1heFdpZHRoIiwibWluV2lkdGgiLCJhY2Nlc3NvciIsImlkIiwiYWNjZXNzb3JTdHJpbmciLCJnZXQiLCJyb3ciLCJjb25zb2xlIiwid2FybiIsIkVycm9yIiwiYWxsRGVjb3JhdGVkQ29sdW1ucyIsImRlY29yYXRlQW5kQWRkVG9BbGwiLCJkZWNvcmF0ZWRDb2x1bW4iLCJwdXNoIiwiZGVjb3JhdGVkQ29sdW1ucyIsIm1hcCIsImQiLCJ2aXNpYmxlQ29sdW1ucyIsInNsaWNlIiwiYWxsVmlzaWJsZUNvbHVtbnMiLCJ2aXNpYmxlU3ViQ29sdW1ucyIsImZpbHRlciIsImluZGV4T2YiLCJnZXRGaXJzdERlZmluZWQiLCJzaG93IiwicGl2b3RJbmRleCIsImZpbmRJbmRleCIsInBpdm90IiwicGl2b3RDb2x1bW5zIiwiZm91bmQiLCJwaXZvdElEIiwiUGl2b3RQYXJlbnRDb2x1bW4iLCJyZWR1Y2UiLCJwcmV2IiwiY3VycmVudCIsIlBpdm90R3JvdXBIZWFkZXIiLCJIZWFkZXIiLCJwaXZvdENvbHVtbkdyb3VwIiwicGl2b3REZWZhdWx0cyIsInBpdm90ZWQiLCJzcGxpY2UiLCJ1bnNoaWZ0IiwiaGVhZGVyR3JvdXBzIiwiY3VycmVudFNwYW4iLCJhZGRIZWFkZXIiLCJjb25jYXQiLCJhY2Nlc3NSb3ciLCJpIiwibGV2ZWwiLCJyZXNvbHZlZERhdGEiLCJhZ2dyZWdhdGluZ0NvbHVtbnMiLCJhZ2dyZWdhdGUiLCJhZ2dyZWdhdGlvblZhbHVlcyIsInZhbHVlcyIsInJvd3MiLCJncm91cFJlY3Vyc2l2ZWx5Iiwia2V5cyIsImdyb3VwZWRSb3dzIiwiZW50cmllcyIsImdyb3VwQnkiLCJrZXkiLCJ2YWx1ZSIsInN1YlJvd3MiLCJyb3dHcm91cCIsIm1hbnVhbCIsInNvcnRlZCIsImZpbHRlcmVkIiwiZGVmYXVsdEZpbHRlck1ldGhvZCIsInNvcnRNZXRob2RzQnlDb2x1bW5JRCIsInNvcnRNZXRob2QiLCJzb3J0ZWREYXRhIiwic29ydERhdGEiLCJmaWx0ZXJEYXRhIiwib25GZXRjaERhdGEiLCJnZXRSZXNvbHZlZFN0YXRlIiwiZmlsdGVyZWREYXRhIiwiZmlsdGVyZWRTb0ZhciIsIm5leHRGaWx0ZXIiLCJ4IiwiZmlsdGVyYWJsZSIsImZpbHRlck1ldGhvZCIsImZpbHRlckFsbCIsIm9yZGVyQnlNZXRob2QiLCJvcmRlckJ5Iiwic29ydCIsImEiLCJiIiwiZGVzYyIsImRlZmF1bHRTb3J0TWV0aG9kIiwibWluUm93cyIsImdldFN0YXRlT3JQcm9wIiwicGFnZSIsIm9uUGFnZUNoYW5nZSIsImNvbGxhcHNlT25QYWdlQ2hhbmdlIiwiZXhwYW5kZWQiLCJzZXRTdGF0ZVdpdGhEYXRhIiwibmV3UGFnZVNpemUiLCJvblBhZ2VTaXplQ2hhbmdlIiwicGFnZVNpemUiLCJjdXJyZW50Um93IiwibmV3UGFnZSIsIk1hdGgiLCJmbG9vciIsImFkZGl0aXZlIiwic2tpcE5leHRTb3J0IiwiZGVmYXVsdFNvcnREZXNjIiwiZmlyc3RTb3J0RGlyZWN0aW9uIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwic2Vjb25kU29ydERpcmVjdGlvbiIsIm9uU29ydGVkQ2hhbmdlIiwibmV3U29ydGVkIiwiY2xvbmUiLCJpc1NvcnRpbmdEZXNjIiwiaXNBcnJheSIsImV4aXN0aW5nSW5kZXgiLCJleGlzdGluZyIsIm9uRmlsdGVyZWRDaGFuZ2UiLCJuZXdGaWx0ZXJpbmciLCJpc1RvdWNoIiwic3RvcFByb3BhZ2F0aW9uIiwicGFyZW50V2lkdGgiLCJwYXJlbnRFbGVtZW50IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJwYWdlWCIsImNoYW5nZWRUb3VjaGVzIiwidHJhcEV2ZW50cyIsImN1cnJlbnRseVJlc2l6aW5nIiwic3RhcnRYIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVzaXplQ29sdW1uTW92aW5nIiwicmVzaXplQ29sdW1uRW5kIiwib25SZXNpemVkQ2hhbmdlIiwicmVzaXplZCIsIm5ld1Jlc2l6ZWQiLCJ0eXBlIiwibmV3V2lkdGgiLCJtYXgiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiQmFzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsMENBQTBDLEdBQWhEOztrQkFFZTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSx5REFFeUI7QUFBQTs7QUFBRTtBQUNwQyxZQUFJQyxZQUFZLEVBQWhCOztBQUVBQSxrQkFBVUMsa0JBQVYsR0FBK0IsS0FBS0Msb0JBQXBDO0FBQ0FGLGtCQUFVRyxZQUFWLEdBQXlCLFlBQU07QUFDN0IsaUJBQU8sT0FBS0MsVUFBTCxHQUFrQixPQUFLQSxVQUFMLENBQWdCQyxTQUFsQyxHQUE4QyxDQUFyRDtBQUNELFNBRkQ7O0FBSUFMLGtCQUFVTSxZQUFWLEdBQXlCLGVBQU87QUFDOUIsY0FBSSxPQUFLRixVQUFULEVBQXFCO0FBQ25CLG1CQUFLQSxVQUFMLENBQWdCQyxTQUFoQixHQUE0QkUsR0FBNUI7QUFDRDtBQUNGLFNBSkQ7QUFLQVAsa0JBQVVRLHFCQUFWLEdBQWtDO0FBQUEsaUJBQVNDLE1BQU1DLE1BQU4sS0FBaUIsT0FBS04sVUFBL0I7QUFBQSxTQUFsQzs7QUFFQUosa0JBQVVXLG9CQUFWLEdBQWlDLFlBQU07QUFDckMsaUJBQU9DLE9BQU9DLE1BQVAsQ0FD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O0FBQ0E7QUFDQTtBQUNBLFlBQUksQ0FBQ2QsT0FBTCxFQUFjO0FBQ1osZUFBS3pCLGdCQUFMLENBQXNCO0FBQ3BCUywwQkFBYyxJQURNO0FBRXBCeUIsK0JBQW1CO0FBRkMsV0FBdEI7QUFJRDtBQUNGO0FBdnZCVTs7QUFBQTtBQUFBLElBQ0NhLElBREQ7QUFBQSxDIiwiZmlsZSI6Im1ldGhvZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgXyBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IGluZmluaXRlSGVscGVycyBmcm9tICcuL2xhenlMb2FkL3V0aWxzL2luZmluaXRlSGVscGVycydcblxuY29uc3QgdGltZVNjcm9sbFN0YXRlTGFzdHNGb3JBZnRlclVzZXJTY3JvbGxzID0gMTUwXG5cbmV4cG9ydCBkZWZhdWx0IEJhc2UgPT5cbiAgY2xhc3MgZXh0ZW5kcyBCYXNlIHtcbiAgICBnZW5lcmF0ZUNvbXB1dGVkVXRpbGl0eUZ1bmN0aW9ucyAoKSB7IC8vXG4gICAgICBsZXQgdXRpbGl0aWVzID0ge31cblxuICAgICAgdXRpbGl0aWVzLm5vZGVTY3JvbGxMaXN0ZW5lciA9IHRoaXMuaW5maW5pdGVIYW5kbGVTY3JvbGxcbiAgICAgIHV0aWxpdGllcy5nZXRTY3JvbGxUb3AgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjcm9sbGFibGUgPyB0aGlzLnNjcm9sbGFibGUuc2Nyb2xsVG9wIDogMFxuICAgICAgfVxuXG4gICAgICB1dGlsaXRpZXMuc2V0U2Nyb2xsVG9wID0gdG9wID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsYWJsZSkge1xuICAgICAgICAgIHRoaXMuc2Nyb2xsYWJsZS5zY3JvbGxUb3AgPSB0b3BcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdXRpbGl0aWVzLnNjcm9sbFNob3VsZEJlSWdub3JlZCA9IGV2ZW50ID0+IGV2ZW50LnRhcmdldCAhPT0gdGhpcy5zY3JvbGxhYmxlXG5cbiAgICAgIHV0aWxpdGllcy5idWlsZFNjcm9sbGFibGVTdHlsZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAge30sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmNvbXB1dGVkUHJvcHMuY29udGFpbmVySGVpZ2h0LFxuICAgICAgICAgICAgb3ZlcmZsb3dYOiAnaGlkZGVuJyxcbiAgICAgICAgICAgIG92ZXJmbG93WTogJ3Njcm9sbCcsXG4gICAgICAgICAgICBXZWJraXRPdmVyZmxvd1Njcm9sbGluZzogJ3RvdWNoJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdGhpcy5jb21wdXRlZFByb3BzLnN0eWxlcy5zY3JvbGxhYmxlU3R5bGUgfHwge31cbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdXRpbGl0aWVzXG4gICAgfVxuXG4gICAgcmVjb21wdXRlSW50ZXJuYWxTdGF0ZUZyb21Qcm9wcyAocHJvcHMpIHsgLy9cbiAgICAgIGxldCBjb21wdXRlZFByb3BzID0gaW5maW5pdGVIZWxwZXJzLmdlbmVyYXRlQ29tcHV0ZWRQcm9wcyhwcm9wcylcbiAgICAgIGxldCB1dGlscyA9IHRoaXMuZ2VuZXJhdGVDb21wdXRlZFV0aWxpdHlGdW5jdGlvbnMoKVxuXG4gICAgICBsZXQgbmV3U3RhdGUgPSB7fVxuXG4gICAgICBuZXdTdGF0ZS5kYXRhTGVuZ3RoID0gY29tcHV0ZWRQcm9wcy5kYXRhLmxlbmd0aFxuICAgICAgbmV3U3RhdGUuaW5maW5pdGVDb21wdXRlciA9IGluZmluaXRlSGVscGVycy5jcmVhdGVJbmZpbml0ZUNvbXB1dGVyKFxuICAgICAgICBjb21wdXRlZFByb3BzLmVsZW1lbnRIZWlnaHQsXG4gICAgICAgIGNvbXB1dGVkUHJvcHMuZGF0YVxuICAgICAgKVxuXG4gICAgICBuZXdTdGF0ZS5wcmVsb2FkQmF0Y2hTaXplID0gY29tcHV0ZWRQcm9wcy5wcmVsb2FkQmF0Y2hTaXplXG4gICAgICBuZXdTdGF0ZS5wcmVsb2FkQWRkaXRpb25hbEhlaWdodCA9IGNvbXB1dGVkUHJvcHMucHJlbG9hZEFkZGl0aW9uYWxIZWlnaHRcblxuICAgICAgbmV3U3RhdGUgPSBPYmplY3QuYXNzaWduKFxuICAgICAgICBuZXdTdGF0ZSxcbiAgICAgICAgaW5maW5pdGVIZWxwZXJzLnJlY29tcHV0ZUFwZXJ0dXJlU3RhdGVGcm9tT3B0aW9uc0FuZFNjcm9sbFRvcChuZXdTdGF0ZSwgdXRpbHMuZ2V0U2Nyb2xsVG9wKCkpXG4gICAgICApXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXB1dGVkUHJvcHMsXG4gICAgICAgIHV0aWxzLFxuICAgICAgICBuZXdTdGF0ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGluZmluaXRlSGFuZGxlU2Nyb2xsIChlKSB7IC8vXG4gICAgICBpZiAodGhpcy51dGlscy5zY3JvbGxTaG91bGRCZUlnbm9yZWQoZSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuaGFuZGxlU2Nyb2xsKHRoaXMudXRpbHMuZ2V0U2Nyb2xsVG9wKCkpXG4gICAgfVxuXG4gICAgbWFuYWdlU2Nyb2xsVGltZW91dHMgKCkge1xuICAgICAgLy8gTWFpbnRhaW5zIGEgc2VyaWVzIG9mIHRpbWVvdXRzIHRvIHNldCB0aGlzLnN0YXRlLmlzU2Nyb2xsaW5nXG4gICAgICAvLyB0byBiZSB0cnVlIHdoZW4gdGhlIGVsZW1lbnQgaXMgc2Nyb2xsaW5nLlxuXG4gICAgICBpZiAodGhpcy5zdGF0ZS5zY3JvbGxUaW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnN0YXRlLnNjcm9sbFRpbWVvdXQpXG4gICAgICB9XG5cbiAgICAgIGxldCB0aGF0ID0gdGhpc1xuICAgICAgbGV0IHNjcm9sbFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgaXNTY3JvbGxpbmc6IGZhbHNlLFxuICAgICAgICAgIHNjcm9sbFRpbWVvdXQ6IHVuZGVmaW5lZFxuICAgICAgICB9KVxuICAgICAgfSwgdGltZVNjcm9sbFN0YXRlTGFzdHNGb3JBZnRlclVzZXJTY3JvbGxzKVxuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaXNTY3JvbGxpbmc6IHRydWUsXG4gICAgICAgIHNjcm9sbFRpbWVvdXQ6IHNjcm9sbFRpbWVvdXRcbiAgICAgIH0pXG4gICAgfVxuICAgIGhhbmRsZVNjcm9sbCAoc2Nyb2xsVG9wKSB7XG4gICAgICB0aGlzLm1hbmFnZVNjcm9sbFRpbWVvdXRzKCk7XG5cbiAgICAgIGxldCBuZXdBcGVydHVyZVN0YXRlID0gaW5maW5pdGVIZWxwZXJzLnJlY29tcHV0ZUFwZXJ0dXJlU3RhdGVGcm9tT3B0aW9uc0FuZFNjcm9sbFRvcCh0aGlzLnN0YXRlLCBzY3JvbGxUb3ApXG4gICAgICAvLyB0aGlzLnByb3BzLm9uVmlzaWJsZUNoYW5nZShuZXdBcGVydHVyZVN0YXRlKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoT2JqZWN0LmFzc2lnbih7fSwgbmV3QXBlcnR1cmVTdGF0ZSkpXG4gICAgfTtcblxuICAgIGdldFJlc29sdmVkU3RhdGUgKHByb3BzLCBzdGF0ZSkge1xuICAgICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHtcbiAgICAgICAgLi4uXy5jb21wYWN0T2JqZWN0KHRoaXMuc3RhdGUpLFxuICAgICAgICAuLi5fLmNvbXBhY3RPYmplY3QodGhpcy5wcm9wcyksXG4gICAgICAgIC4uLl8uY29tcGFjdE9iamVjdChzdGF0ZSksXG4gICAgICAgIC4uLl8uY29tcGFjdE9iamVjdChwcm9wcyksXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzb2x2ZWRTdGF0ZVxuICAgIH1cblxuICAgIGdldERhdGFNb2RlbCAobmV3U3RhdGUpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY29sdW1ucyxcbiAgICAgICAgcGl2b3RCeSA9IFtdLFxuICAgICAgICBkYXRhLFxuICAgICAgICBwaXZvdElES2V5LFxuICAgICAgICBwaXZvdFZhbEtleSxcbiAgICAgICAgc3ViUm93c0tleSxcbiAgICAgICAgYWdncmVnYXRlZEtleSxcbiAgICAgICAgbmVzdGluZ0xldmVsS2V5LFxuICAgICAgICBvcmlnaW5hbEtleSxcbiAgICAgICAgaW5kZXhLZXksXG4gICAgICAgIGdyb3VwZWRCeVBpdm90S2V5LFxuICAgICAgICBTdWJDb21wb25lbnQsXG4gICAgICB9ID0gbmV3U3RhdGVcblxuICAgICAgLy8gRGV0ZXJtaW5lIEhlYWRlciBHcm91cHNcbiAgICAgIGxldCBoYXNIZWFkZXJHcm91cHMgPSBmYWxzZVxuICAgICAgY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgIGlmIChjb2x1bW4uY29sdW1ucykge1xuICAgICAgICAgIGhhc0hlYWRlckdyb3VwcyA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgbGV0IGNvbHVtbnNXaXRoRXhwYW5kZXIgPSBbLi4uY29sdW1uc11cblxuICAgICAgbGV0IGV4cGFuZGVyQ29sdW1uID0gY29sdW1ucy5maW5kKFxuICAgICAgICBjb2wgPT4gY29sLmV4cGFuZGVyIHx8IChjb2wuY29sdW1ucyAmJiBjb2wuY29sdW1ucy5zb21lKGNvbDIgPT4gY29sMi5leHBhbmRlcikpXG4gICAgICApXG4gICAgICAvLyBUaGUgYWN0dWFsIGV4cGFuZGVyIG1pZ2h0IGJlIGluIHRoZSBjb2x1bW5zIGZpZWxkIG9mIGEgZ3JvdXAgY29sdW1uXG4gICAgICBpZiAoZXhwYW5kZXJDb2x1bW4gJiYgIWV4cGFuZGVyQ29sdW1uLmV4cGFuZGVyKSB7XG4gICAgICAgIGV4cGFuZGVyQ29sdW1uID0gZXhwYW5kZXJDb2x1bW4uY29sdW1ucy5maW5kKGNvbCA9PiBjb2wuZXhwYW5kZXIpXG4gICAgICB9XG5cbiAgICAgIC8vIElmIHdlIGhhdmUgU3ViQ29tcG9uZW50J3Mgd2UgbmVlZCB0byBtYWtlIHN1cmUgd2UgaGF2ZSBhbiBleHBhbmRlciBjb2x1bW5cbiAgICAgIGlmIChTdWJDb21wb25lbnQgJiYgIWV4cGFuZGVyQ29sdW1uKSB7XG4gICAgICAgIGV4cGFuZGVyQ29sdW1uID0ge2V4cGFuZGVyOiB0cnVlfVxuICAgICAgICBjb2x1bW5zV2l0aEV4cGFuZGVyID0gW2V4cGFuZGVyQ29sdW1uLCAuLi5jb2x1bW5zV2l0aEV4cGFuZGVyXVxuICAgICAgfVxuXG4gICAgICBjb25zdCBtYWtlRGVjb3JhdGVkQ29sdW1uID0gKGNvbHVtbiwgcGFyZW50Q29sdW1uKSA9PiB7XG4gICAgICAgIGxldCBkY29sXG4gICAgICAgIGlmIChjb2x1bW4uZXhwYW5kZXIpIHtcbiAgICAgICAgICBkY29sID0ge1xuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5jb2x1bW4sXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmV4cGFuZGVyRGVmYXVsdHMsXG4gICAgICAgICAgICAuLi5jb2x1bW4sXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRjb2wgPSB7XG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmNvbHVtbixcbiAgICAgICAgICAgIC4uLmNvbHVtbixcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbnN1cmUgbWluV2lkdGggaXMgbm90IGdyZWF0ZXIgdGhhbiBtYXhXaWR0aCBpZiBzZXRcbiAgICAgICAgaWYgKGRjb2wubWF4V2lkdGggPCBkY29sLm1pbldpZHRoKSB7XG4gICAgICAgICAgZGNvbC5taW5XaWR0aCA9IGRjb2wubWF4V2lkdGhcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJlbnRDb2x1bW4pIHtcbiAgICAgICAgICBkY29sLnBhcmVudENvbHVtbiA9IHBhcmVudENvbHVtblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmlyc3QgY2hlY2sgZm9yIHN0cmluZyBhY2Nlc3NvclxuICAgICAgICBpZiAodHlwZW9mIGRjb2wuYWNjZXNzb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZGNvbC5pZCA9IGRjb2wuaWQgfHwgZGNvbC5hY2Nlc3NvclxuICAgICAgICAgIGNvbnN0IGFjY2Vzc29yU3RyaW5nID0gZGNvbC5hY2Nlc3NvclxuICAgICAgICAgIGRjb2wuYWNjZXNzb3IgPSByb3cgPT4gXy5nZXQocm93LCBhY2Nlc3NvclN0cmluZylcbiAgICAgICAgICByZXR1cm4gZGNvbFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmFsbCBiYWNrIHRvIGZ1bmN0aW9uYWwgYWNjZXNzb3IgKGJ1dCByZXF1aXJlIGFuIElEKVxuICAgICAgICBpZiAoZGNvbC5hY2Nlc3NvciAmJiAhZGNvbC5pZCkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihkY29sKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdBIGNvbHVtbiBpZCBpcyByZXF1aXJlZCBpZiB1c2luZyBhIG5vbi1zdHJpbmcgYWNjZXNzb3IgZm9yIGNvbHVtbiBhYm92ZS4nXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmFsbCBiYWNrIHRvIGFuIHVuZGVmaW5lZCBhY2Nlc3NvclxuICAgICAgICBpZiAoIWRjb2wuYWNjZXNzb3IpIHtcbiAgICAgICAgICBkY29sLmFjY2Vzc29yID0gKCkgPT4gdW5kZWZpbmVkXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGNvbFxuICAgICAgfVxuXG4gICAgICBjb25zdCBhbGxEZWNvcmF0ZWRDb2x1bW5zID0gW11cblxuICAgICAgLy8gRGVjb3JhdGUgdGhlIGNvbHVtbnNcbiAgICAgIGNvbnN0IGRlY29yYXRlQW5kQWRkVG9BbGwgPSAoY29sdW1uLCBwYXJlbnRDb2x1bW4pID0+IHtcbiAgICAgICAgY29uc3QgZGVjb3JhdGVkQ29sdW1uID0gbWFrZURlY29yYXRlZENvbHVtbihjb2x1bW4sIHBhcmVudENvbHVtbilcbiAgICAgICAgYWxsRGVjb3JhdGVkQ29sdW1ucy5wdXNoKGRlY29yYXRlZENvbHVtbilcbiAgICAgICAgcmV0dXJuIGRlY29yYXRlZENvbHVtblxuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWNvcmF0ZWRDb2x1bW5zID0gY29sdW1uc1dpdGhFeHBhbmRlci5tYXAoY29sdW1uID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmNvbHVtbixcbiAgICAgICAgICAgIGNvbHVtbnM6IGNvbHVtbi5jb2x1bW5zLm1hcChkID0+IGRlY29yYXRlQW5kQWRkVG9BbGwoZCwgY29sdW1uKSksXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWNvcmF0ZUFuZEFkZFRvQWxsKGNvbHVtbilcbiAgICAgIH0pXG5cbiAgICAgIC8vIEJ1aWxkIHRoZSB2aXNpYmxlIGNvbHVtbnMsIGhlYWRlcnMgYW5kIGZsYXQgY29sdW1uIGxpc3RcbiAgICAgIGxldCB2aXNpYmxlQ29sdW1ucyA9IGRlY29yYXRlZENvbHVtbnMuc2xpY2UoKVxuICAgICAgbGV0IGFsbFZpc2libGVDb2x1bW5zID0gW11cblxuICAgICAgdmlzaWJsZUNvbHVtbnMgPSB2aXNpYmxlQ29sdW1ucy5tYXAoY29sdW1uID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XG4gICAgICAgICAgY29uc3QgdmlzaWJsZVN1YkNvbHVtbnMgPSBjb2x1bW4uY29sdW1ucy5maWx0ZXIoXG4gICAgICAgICAgICBkID0+IChwaXZvdEJ5LmluZGV4T2YoZC5pZCkgPiAtMSA/IGZhbHNlIDogXy5nZXRGaXJzdERlZmluZWQoZC5zaG93LCB0cnVlKSlcbiAgICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmNvbHVtbixcbiAgICAgICAgICAgIGNvbHVtbnM6IHZpc2libGVTdWJDb2x1bW5zLFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29sdW1uXG4gICAgICB9KVxuXG4gICAgICB2aXNpYmxlQ29sdW1ucyA9IHZpc2libGVDb2x1bW5zLmZpbHRlcihcbiAgICAgICAgY29sdW1uID0+XG4gICAgICAgICAgY29sdW1uLmNvbHVtbnNcbiAgICAgICAgICAgID8gY29sdW1uLmNvbHVtbnMubGVuZ3RoXG4gICAgICAgICAgICA6IHBpdm90QnkuaW5kZXhPZihjb2x1bW4uaWQpID4gLTFcbiAgICAgICAgICAgID8gZmFsc2VcbiAgICAgICAgICAgIDogXy5nZXRGaXJzdERlZmluZWQoY29sdW1uLnNob3csIHRydWUpXG4gICAgICApXG5cbiAgICAgIC8vIEZpbmQgYW55IGN1c3RvbSBwaXZvdCBsb2NhdGlvblxuICAgICAgY29uc3QgcGl2b3RJbmRleCA9IHZpc2libGVDb2x1bW5zLmZpbmRJbmRleChjb2wgPT4gY29sLnBpdm90KVxuXG4gICAgICAvLyBIYW5kbGUgUGl2b3QgQ29sdW1uc1xuICAgICAgaWYgKHBpdm90QnkubGVuZ3RoKSB7XG4gICAgICAgIC8vIFJldHJpZXZlIHRoZSBwaXZvdCBjb2x1bW5zIGluIHRoZSBjb3JyZWN0IHBpdm90IG9yZGVyXG4gICAgICAgIGNvbnN0IHBpdm90Q29sdW1ucyA9IFtdXG4gICAgICAgIHBpdm90QnkuZm9yRWFjaChwaXZvdElEID0+IHtcbiAgICAgICAgICBjb25zdCBmb3VuZCA9IGFsbERlY29yYXRlZENvbHVtbnMuZmluZChkID0+IGQuaWQgPT09IHBpdm90SUQpXG4gICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICBwaXZvdENvbHVtbnMucHVzaChmb3VuZClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgUGl2b3RQYXJlbnRDb2x1bW4gPSBwaXZvdENvbHVtbnMucmVkdWNlKFxuICAgICAgICAgIChwcmV2LCBjdXJyZW50KSA9PiBwcmV2ICYmIHByZXYgPT09IGN1cnJlbnQucGFyZW50Q29sdW1uICYmIGN1cnJlbnQucGFyZW50Q29sdW1uLFxuICAgICAgICAgIHBpdm90Q29sdW1uc1swXS5wYXJlbnRDb2x1bW5cbiAgICAgICAgKVxuXG4gICAgICAgIGxldCBQaXZvdEdyb3VwSGVhZGVyID0gaGFzSGVhZGVyR3JvdXBzICYmIFBpdm90UGFyZW50Q29sdW1uLkhlYWRlclxuICAgICAgICBQaXZvdEdyb3VwSGVhZGVyID0gUGl2b3RHcm91cEhlYWRlciB8fCAoKCkgPT4gPHN0cm9uZz5QaXZvdGVkPC9zdHJvbmc+KVxuXG4gICAgICAgIGxldCBwaXZvdENvbHVtbkdyb3VwID0ge1xuICAgICAgICAgIEhlYWRlcjogUGl2b3RHcm91cEhlYWRlcixcbiAgICAgICAgICBjb2x1bW5zOiBwaXZvdENvbHVtbnMubWFwKGNvbCA9PiAoe1xuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5waXZvdERlZmF1bHRzLFxuICAgICAgICAgICAgLi4uY29sLFxuICAgICAgICAgICAgcGl2b3RlZDogdHJ1ZSxcbiAgICAgICAgICB9KSksXG4gICAgICAgIH1cblxuICAgICAgICAvLyBQbGFjZSB0aGUgcGl2b3RDb2x1bW5zIGJhY2sgaW50byB0aGUgdmlzaWJsZUNvbHVtbnNcbiAgICAgICAgaWYgKHBpdm90SW5kZXggPj0gMCkge1xuICAgICAgICAgIHBpdm90Q29sdW1uR3JvdXAgPSB7XG4gICAgICAgICAgICAuLi52aXNpYmxlQ29sdW1uc1twaXZvdEluZGV4XSxcbiAgICAgICAgICAgIC4uLnBpdm90Q29sdW1uR3JvdXAsXG4gICAgICAgICAgfVxuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnNwbGljZShwaXZvdEluZGV4LCAxLCBwaXZvdENvbHVtbkdyb3VwKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnVuc2hpZnQocGl2b3RDb2x1bW5Hcm91cClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBCdWlsZCBIZWFkZXIgR3JvdXBzXG4gICAgICBjb25zdCBoZWFkZXJHcm91cHMgPSBbXVxuICAgICAgbGV0IGN1cnJlbnRTcGFuID0gW11cblxuICAgICAgLy8gQSBjb252ZW5pZW5jZSBmdW5jdGlvbiB0byBhZGQgYSBoZWFkZXIgYW5kIHJlc2V0IHRoZSBjdXJyZW50U3BhblxuICAgICAgY29uc3QgYWRkSGVhZGVyID0gKGNvbHVtbnMsIGNvbHVtbikgPT4ge1xuICAgICAgICBoZWFkZXJHcm91cHMucHVzaCh7XG4gICAgICAgICAgLi4udGhpcy5wcm9wcy5jb2x1bW4sXG4gICAgICAgICAgLi4uY29sdW1uLFxuICAgICAgICAgIGNvbHVtbnMsXG4gICAgICAgIH0pXG4gICAgICAgIGN1cnJlbnRTcGFuID0gW11cbiAgICAgIH1cblxuICAgICAgLy8gQnVpbGQgZmxhc3QgbGlzdCBvZiBhbGxWaXNpYmxlQ29sdW1ucyBhbmQgSGVhZGVyR3JvdXBzXG4gICAgICB2aXNpYmxlQ29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgIGlmIChjb2x1bW4uY29sdW1ucykge1xuICAgICAgICAgIGFsbFZpc2libGVDb2x1bW5zID0gYWxsVmlzaWJsZUNvbHVtbnMuY29uY2F0KGNvbHVtbi5jb2x1bW5zKVxuICAgICAgICAgIGlmIChjdXJyZW50U3Bhbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBhZGRIZWFkZXIoY3VycmVudFNwYW4pXG4gICAgICAgICAgfVxuICAgICAgICAgIGFkZEhlYWRlcihjb2x1bW4uY29sdW1ucywgY29sdW1uKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGFsbFZpc2libGVDb2x1bW5zLnB1c2goY29sdW1uKVxuICAgICAgICBjdXJyZW50U3Bhbi5wdXNoKGNvbHVtbilcbiAgICAgIH0pXG4gICAgICBpZiAoaGFzSGVhZGVyR3JvdXBzICYmIGN1cnJlbnRTcGFuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYWRkSGVhZGVyKGN1cnJlbnRTcGFuKVxuICAgICAgfVxuXG4gICAgICAvLyBBY2Nlc3MgdGhlIGRhdGFcbiAgICAgIGNvbnN0IGFjY2Vzc1JvdyA9IChkLCBpLCBsZXZlbCA9IDApID0+IHtcbiAgICAgICAgY29uc3Qgcm93ID0ge1xuICAgICAgICAgIFtvcmlnaW5hbEtleV06IGQsXG4gICAgICAgICAgW2luZGV4S2V5XTogaSxcbiAgICAgICAgICBbc3ViUm93c0tleV06IGRbc3ViUm93c0tleV0sXG4gICAgICAgICAgW25lc3RpbmdMZXZlbEtleV06IGxldmVsLFxuICAgICAgICB9XG4gICAgICAgIGFsbERlY29yYXRlZENvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICAgIGlmIChjb2x1bW4uZXhwYW5kZXIpIHJldHVyblxuICAgICAgICAgIHJvd1tjb2x1bW4uaWRdID0gY29sdW1uLmFjY2Vzc29yKGQpXG4gICAgICAgIH0pXG4gICAgICAgIGlmIChyb3dbc3ViUm93c0tleV0pIHtcbiAgICAgICAgICByb3dbc3ViUm93c0tleV0gPSByb3dbc3ViUm93c0tleV0ubWFwKChkLCBpKSA9PiBhY2Nlc3NSb3coZCwgaSwgbGV2ZWwgKyAxKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm93XG4gICAgICB9XG4gICAgICBsZXQgcmVzb2x2ZWREYXRhID0gZGF0YS5tYXAoKGQsIGkpID0+IGFjY2Vzc1JvdyhkLCBpKSlcblxuICAgICAgLy8gVE9ETzogTWFrZSBpdCBwb3NzaWJsZSB0byBmYWJyaWNhdGUgbmVzdGVkIHJvd3Mgd2l0aG91dCBwaXZvdGluZ1xuICAgICAgY29uc3QgYWdncmVnYXRpbmdDb2x1bW5zID0gYWxsVmlzaWJsZUNvbHVtbnMuZmlsdGVyKGQgPT4gIWQuZXhwYW5kZXIgJiYgZC5hZ2dyZWdhdGUpXG5cbiAgICAgIC8vIElmIHBpdm90aW5nLCByZWN1cnNpdmVseSBncm91cCB0aGUgZGF0YVxuICAgICAgY29uc3QgYWdncmVnYXRlID0gcm93cyA9PiB7XG4gICAgICAgIGNvbnN0IGFnZ3JlZ2F0aW9uVmFsdWVzID0ge31cbiAgICAgICAgYWdncmVnYXRpbmdDb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZXMgPSByb3dzLm1hcChkID0+IGRbY29sdW1uLmlkXSlcbiAgICAgICAgICBhZ2dyZWdhdGlvblZhbHVlc1tjb2x1bW4uaWRdID0gY29sdW1uLmFnZ3JlZ2F0ZSh2YWx1ZXMsIHJvd3MpXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBhZ2dyZWdhdGlvblZhbHVlc1xuICAgICAgfVxuICAgICAgaWYgKHBpdm90QnkubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwUmVjdXJzaXZlbHkgPSAocm93cywga2V5cywgaSA9IDApID0+IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIHRoZSBsYXN0IGxldmVsLCBqdXN0IHJldHVybiB0aGUgcm93c1xuICAgICAgICAgIGlmIChpID09PSBrZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHJvd3NcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gR3JvdXAgdGhlIHJvd3MgdG9nZXRoZXIgZm9yIHRoaXMgbGV2ZWxcbiAgICAgICAgICBsZXQgZ3JvdXBlZFJvd3MgPSBPYmplY3QuZW50cmllcyhfLmdyb3VwQnkocm93cywga2V5c1tpXSkpLm1hcCgoW2tleSwgdmFsdWVdKSA9PiAoe1xuICAgICAgICAgICAgW3Bpdm90SURLZXldOiBrZXlzW2ldLFxuICAgICAgICAgICAgW3Bpdm90VmFsS2V5XToga2V5LFxuICAgICAgICAgICAgW2tleXNbaV1dOiBrZXksXG4gICAgICAgICAgICBbc3ViUm93c0tleV06IHZhbHVlLFxuICAgICAgICAgICAgW25lc3RpbmdMZXZlbEtleV06IGksXG4gICAgICAgICAgICBbZ3JvdXBlZEJ5UGl2b3RLZXldOiB0cnVlLFxuICAgICAgICAgIH0pKVxuICAgICAgICAgIC8vIFJlY3Vyc2UgaW50byB0aGUgc3ViUm93c1xuICAgICAgICAgIGdyb3VwZWRSb3dzID0gZ3JvdXBlZFJvd3MubWFwKHJvd0dyb3VwID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN1YlJvd3MgPSBncm91cFJlY3Vyc2l2ZWx5KHJvd0dyb3VwW3N1YlJvd3NLZXldLCBrZXlzLCBpICsgMSlcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLnJvd0dyb3VwLFxuICAgICAgICAgICAgICBbc3ViUm93c0tleV06IHN1YlJvd3MsXG4gICAgICAgICAgICAgIFthZ2dyZWdhdGVkS2V5XTogdHJ1ZSxcbiAgICAgICAgICAgICAgLi4uYWdncmVnYXRlKHN1YlJvd3MpLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuIGdyb3VwZWRSb3dzXG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZWREYXRhID0gZ3JvdXBSZWN1cnNpdmVseShyZXNvbHZlZERhdGEsIHBpdm90QnkpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLm5ld1N0YXRlLFxuICAgICAgICByZXNvbHZlZERhdGEsXG4gICAgICAgIGFsbFZpc2libGVDb2x1bW5zLFxuICAgICAgICBoZWFkZXJHcm91cHMsXG4gICAgICAgIGFsbERlY29yYXRlZENvbHVtbnMsXG4gICAgICAgIGhhc0hlYWRlckdyb3VwcyxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTb3J0ZWREYXRhIChyZXNvbHZlZFN0YXRlKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIG1hbnVhbCxcbiAgICAgICAgc29ydGVkLFxuICAgICAgICBmaWx0ZXJlZCxcbiAgICAgICAgZGVmYXVsdEZpbHRlck1ldGhvZCxcbiAgICAgICAgcmVzb2x2ZWREYXRhLFxuICAgICAgICBhbGxWaXNpYmxlQ29sdW1ucyxcbiAgICAgICAgYWxsRGVjb3JhdGVkQ29sdW1ucyxcbiAgICAgIH0gPSByZXNvbHZlZFN0YXRlXG5cbiAgICAgIGNvbnN0IHNvcnRNZXRob2RzQnlDb2x1bW5JRCA9IHt9XG5cbiAgICAgIGFsbERlY29yYXRlZENvbHVtbnMuZmlsdGVyKGNvbCA9PiBjb2wuc29ydE1ldGhvZCkuZm9yRWFjaChjb2wgPT4ge1xuICAgICAgICBzb3J0TWV0aG9kc0J5Q29sdW1uSURbY29sLmlkXSA9IGNvbC5zb3J0TWV0aG9kXG4gICAgICB9KVxuXG4gICAgICAvLyBSZXNvbHZlIHRoZSBkYXRhIGZyb20gZWl0aGVyIG1hbnVhbCBkYXRhIG9yIHNvcnRlZCBkYXRhXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzb3J0ZWREYXRhOiBtYW51YWxcbiAgICAgICAgICA/IHJlc29sdmVkRGF0YVxuICAgICAgICAgIDogdGhpcy5zb3J0RGF0YShcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YShyZXNvbHZlZERhdGEsIGZpbHRlcmVkLCBkZWZhdWx0RmlsdGVyTWV0aG9kLCBhbGxWaXNpYmxlQ29sdW1ucyksXG4gICAgICAgICAgICBzb3J0ZWQsXG4gICAgICAgICAgICBzb3J0TWV0aG9kc0J5Q29sdW1uSURcbiAgICAgICAgICApLFxuICAgICAgfVxuICAgIH1cblxuICAgIGZpcmVGZXRjaERhdGEgKCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkZldGNoRGF0YSh0aGlzLmdldFJlc29sdmVkU3RhdGUoKSwgdGhpcylcbiAgICB9XG5cbiAgICBnZXRQcm9wT3JTdGF0ZSAoa2V5KSB7XG4gICAgICByZXR1cm4gXy5nZXRGaXJzdERlZmluZWQodGhpcy5wcm9wc1trZXldLCB0aGlzLnN0YXRlW2tleV0pXG4gICAgfVxuXG4gICAgZ2V0U3RhdGVPclByb3AgKGtleSkge1xuICAgICAgcmV0dXJuIF8uZ2V0Rmlyc3REZWZpbmVkKHRoaXMuc3RhdGVba2V5XSwgdGhpcy5wcm9wc1trZXldKVxuICAgIH1cblxuICAgIGZpbHRlckRhdGEgKGRhdGEsIGZpbHRlcmVkLCBkZWZhdWx0RmlsdGVyTWV0aG9kLCBhbGxWaXNpYmxlQ29sdW1ucykge1xuICAgICAgbGV0IGZpbHRlcmVkRGF0YSA9IGRhdGFcblxuICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCkge1xuICAgICAgICBmaWx0ZXJlZERhdGEgPSBmaWx0ZXJlZC5yZWR1Y2UoKGZpbHRlcmVkU29GYXIsIG5leHRGaWx0ZXIpID0+IHtcbiAgICAgICAgICBjb25zdCBjb2x1bW4gPSBhbGxWaXNpYmxlQ29sdW1ucy5maW5kKHggPT4geC5pZCA9PT0gbmV4dEZpbHRlci5pZClcblxuICAgICAgICAgIC8vIERvbid0IGZpbHRlciBoaWRkZW4gY29sdW1ucyBvciBjb2x1bW5zIHRoYXQgaGF2ZSBoYWQgdGhlaXIgZmlsdGVycyBkaXNhYmxlZFxuICAgICAgICAgIGlmICghY29sdW1uIHx8IGNvbHVtbi5maWx0ZXJhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkU29GYXJcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBmaWx0ZXJNZXRob2QgPSBjb2x1bW4uZmlsdGVyTWV0aG9kIHx8IGRlZmF1bHRGaWx0ZXJNZXRob2RcblxuICAgICAgICAgIC8vIElmICdmaWx0ZXJBbGwnIGlzIHNldCB0byB0cnVlLCBwYXNzIHRoZSBlbnRpcmUgZGF0YXNldCB0byB0aGUgZmlsdGVyIG1ldGhvZFxuICAgICAgICAgIGlmIChjb2x1bW4uZmlsdGVyQWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyTWV0aG9kKG5leHRGaWx0ZXIsIGZpbHRlcmVkU29GYXIsIGNvbHVtbilcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZpbHRlcmVkU29GYXIuZmlsdGVyKHJvdyA9PiBmaWx0ZXJNZXRob2QobmV4dEZpbHRlciwgcm93LCBjb2x1bW4pKVxuICAgICAgICB9LCBmaWx0ZXJlZERhdGEpXG5cbiAgICAgICAgLy8gQXBwbHkgdGhlIGZpbHRlciB0byB0aGUgc3Vicm93cyBpZiB3ZSBhcmUgcGl2b3RpbmcsIGFuZCB0aGVuXG4gICAgICAgIC8vIGZpbHRlciBhbnkgcm93cyB3aXRob3V0IHN1YmNvbHVtbnMgYmVjYXVzZSBpdCB3b3VsZCBiZSBzdHJhbmdlIHRvIHNob3dcbiAgICAgICAgZmlsdGVyZWREYXRhID0gZmlsdGVyZWREYXRhXG4gICAgICAgICAgLm1hcChyb3cgPT4ge1xuICAgICAgICAgICAgaWYgKCFyb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSkge1xuICAgICAgICAgICAgICByZXR1cm4gcm93XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5yb3csXG4gICAgICAgICAgICAgIFt0aGlzLnByb3BzLnN1YlJvd3NLZXldOiB0aGlzLmZpbHRlckRhdGEoXG4gICAgICAgICAgICAgICAgcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0sXG4gICAgICAgICAgICAgICAgZmlsdGVyZWQsXG4gICAgICAgICAgICAgICAgZGVmYXVsdEZpbHRlck1ldGhvZCxcbiAgICAgICAgICAgICAgICBhbGxWaXNpYmxlQ29sdW1uc1xuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcihyb3cgPT4ge1xuICAgICAgICAgICAgaWYgKCFyb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldLmxlbmd0aCA+IDBcbiAgICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmlsdGVyZWREYXRhXG4gICAgfVxuXG4gICAgc29ydERhdGEgKGRhdGEsIHNvcnRlZCwgc29ydE1ldGhvZHNCeUNvbHVtbklEID0ge30pIHtcbiAgICAgIGlmICghc29ydGVkLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgfVxuXG4gICAgICBjb25zdCBzb3J0ZWREYXRhID0gKHRoaXMucHJvcHMub3JkZXJCeU1ldGhvZCB8fCBfLm9yZGVyQnkpKFxuICAgICAgICBkYXRhLFxuICAgICAgICBzb3J0ZWQubWFwKHNvcnQgPT4ge1xuICAgICAgICAgIC8vIFN1cHBvcnQgY3VzdG9tIHNvcnRpbmcgbWV0aG9kcyBmb3IgZWFjaCBjb2x1bW5cbiAgICAgICAgICBpZiAoc29ydE1ldGhvZHNCeUNvbHVtbklEW3NvcnQuaWRdKSB7XG4gICAgICAgICAgICByZXR1cm4gKGEsIGIpID0+IHNvcnRNZXRob2RzQnlDb2x1bW5JRFtzb3J0LmlkXShhW3NvcnQuaWRdLCBiW3NvcnQuaWRdLCBzb3J0LmRlc2MpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAoYSwgYikgPT4gdGhpcy5wcm9wcy5kZWZhdWx0U29ydE1ldGhvZChhW3NvcnQuaWRdLCBiW3NvcnQuaWRdLCBzb3J0LmRlc2MpXG4gICAgICAgIH0pLFxuICAgICAgICBzb3J0ZWQubWFwKGQgPT4gIWQuZGVzYyksXG4gICAgICAgIHRoaXMucHJvcHMuaW5kZXhLZXlcbiAgICAgIClcblxuICAgICAgc29ydGVkRGF0YS5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgIGlmICghcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0pIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICByb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSA9IHRoaXMuc29ydERhdGEoXG4gICAgICAgICAgcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0sXG4gICAgICAgICAgc29ydGVkLFxuICAgICAgICAgIHNvcnRNZXRob2RzQnlDb2x1bW5JRFxuICAgICAgICApXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gc29ydGVkRGF0YVxuICAgIH1cblxuICAgIGdldE1pblJvd3MgKCkge1xuICAgICAgcmV0dXJuIF8uZ2V0Rmlyc3REZWZpbmVkKHRoaXMucHJvcHMubWluUm93cywgdGhpcy5nZXRTdGF0ZU9yUHJvcCgncGFnZVNpemUnKSlcbiAgICB9XG5cbiAgICAvLyBVc2VyIGFjdGlvbnNcbiAgICBvblBhZ2VDaGFuZ2UgKHBhZ2UpIHtcbiAgICAgIGNvbnN0IHtvblBhZ2VDaGFuZ2UsIGNvbGxhcHNlT25QYWdlQ2hhbmdlfSA9IHRoaXMucHJvcHNcblxuICAgICAgY29uc3QgbmV3U3RhdGUgPSB7cGFnZX1cbiAgICAgIGlmIChjb2xsYXBzZU9uUGFnZUNoYW5nZSkge1xuICAgICAgICBuZXdTdGF0ZS5leHBhbmRlZCA9IHt9XG4gICAgICB9XG4gICAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEobmV3U3RhdGUsICgpID0+IG9uUGFnZUNoYW5nZSAmJiBvblBhZ2VDaGFuZ2UocGFnZSkpXG4gICAgfVxuXG4gICAgb25QYWdlU2l6ZUNoYW5nZSAobmV3UGFnZVNpemUpIHtcbiAgICAgIGNvbnN0IHtvblBhZ2VTaXplQ2hhbmdlfSA9IHRoaXMucHJvcHNcbiAgICAgIGNvbnN0IHtwYWdlU2l6ZSwgcGFnZX0gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxuXG4gICAgICAvLyBOb3JtYWxpemUgdGhlIHBhZ2UgdG8gZGlzcGxheVxuICAgICAgY29uc3QgY3VycmVudFJvdyA9IHBhZ2VTaXplICogcGFnZVxuICAgICAgY29uc3QgbmV3UGFnZSA9IE1hdGguZmxvb3IoY3VycmVudFJvdyAvIG5ld1BhZ2VTaXplKVxuXG4gICAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEoXG4gICAgICAgIHtcbiAgICAgICAgICBwYWdlU2l6ZTogbmV3UGFnZVNpemUsXG4gICAgICAgICAgcGFnZTogbmV3UGFnZSxcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4gb25QYWdlU2l6ZUNoYW5nZSAmJiBvblBhZ2VTaXplQ2hhbmdlKG5ld1BhZ2VTaXplLCBuZXdQYWdlKVxuICAgICAgKVxuICAgIH1cblxuICAgIHNvcnRDb2x1bW4gKGNvbHVtbiwgYWRkaXRpdmUpIHtcbiAgICAgIGNvbnN0IHtzb3J0ZWQsIHNraXBOZXh0U29ydCwgZGVmYXVsdFNvcnREZXNjfSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXG5cbiAgICAgIGNvbnN0IGZpcnN0U29ydERpcmVjdGlvbiA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjb2x1bW4sICdkZWZhdWx0U29ydERlc2MnKVxuICAgICAgICA/IGNvbHVtbi5kZWZhdWx0U29ydERlc2NcbiAgICAgICAgOiBkZWZhdWx0U29ydERlc2NcbiAgICAgIGNvbnN0IHNlY29uZFNvcnREaXJlY3Rpb24gPSAhZmlyc3RTb3J0RGlyZWN0aW9uXG5cbiAgICAgIC8vIHdlIGNhbid0IHN0b3AgZXZlbnQgcHJvcGFnYXRpb24gZnJvbSB0aGUgY29sdW1uIHJlc2l6ZSBtb3ZlIGhhbmRsZXJzXG4gICAgICAvLyBhdHRhY2hlZCB0byB0aGUgZG9jdW1lbnQgYmVjYXVzZSBvZiByZWFjdCdzIHN5bnRoZXRpYyBldmVudHNcbiAgICAgIC8vIHNvIHdlIGhhdmUgdG8gcHJldmVudCB0aGUgc29ydCBmdW5jdGlvbiBmcm9tIGFjdHVhbGx5IHNvcnRpbmdcbiAgICAgIC8vIGlmIHdlIGNsaWNrIG9uIHRoZSBjb2x1bW4gcmVzaXplIGVsZW1lbnQgd2l0aGluIGEgaGVhZGVyLlxuICAgICAgaWYgKHNraXBOZXh0U29ydCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEoe1xuICAgICAgICAgIHNraXBOZXh0U29ydDogZmFsc2UsXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCB7b25Tb3J0ZWRDaGFuZ2V9ID0gdGhpcy5wcm9wc1xuXG4gICAgICBsZXQgbmV3U29ydGVkID0gXy5jbG9uZShzb3J0ZWQgfHwgW10pLm1hcChkID0+IHtcbiAgICAgICAgZC5kZXNjID0gXy5pc1NvcnRpbmdEZXNjKGQpXG4gICAgICAgIHJldHVybiBkXG4gICAgICB9KVxuICAgICAgaWYgKCFfLmlzQXJyYXkoY29sdW1uKSkge1xuICAgICAgICAvLyBTaW5nbGUtU29ydFxuICAgICAgICBjb25zdCBleGlzdGluZ0luZGV4ID0gbmV3U29ydGVkLmZpbmRJbmRleChkID0+IGQuaWQgPT09IGNvbHVtbi5pZClcbiAgICAgICAgaWYgKGV4aXN0aW5nSW5kZXggPiAtMSkge1xuICAgICAgICAgIGNvbnN0IGV4aXN0aW5nID0gbmV3U29ydGVkW2V4aXN0aW5nSW5kZXhdXG4gICAgICAgICAgaWYgKGV4aXN0aW5nLmRlc2MgPT09IHNlY29uZFNvcnREaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChhZGRpdGl2ZSkge1xuICAgICAgICAgICAgICBuZXdTb3J0ZWQuc3BsaWNlKGV4aXN0aW5nSW5kZXgsIDEpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBleGlzdGluZy5kZXNjID0gZmlyc3RTb3J0RGlyZWN0aW9uXG4gICAgICAgICAgICAgIG5ld1NvcnRlZCA9IFtleGlzdGluZ11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXhpc3RpbmcuZGVzYyA9IHNlY29uZFNvcnREaXJlY3Rpb25cbiAgICAgICAgICAgIGlmICghYWRkaXRpdmUpIHtcbiAgICAgICAgICAgICAgbmV3U29ydGVkID0gW2V4aXN0aW5nXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChhZGRpdGl2ZSkge1xuICAgICAgICAgIG5ld1NvcnRlZC5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXG4gICAgICAgICAgICBkZXNjOiBmaXJzdFNvcnREaXJlY3Rpb24sXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdTb3J0ZWQgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXG4gICAgICAgICAgICAgIGRlc2M6IGZpcnN0U29ydERpcmVjdGlvbixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBNdWx0aS1Tb3J0XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nSW5kZXggPSBuZXdTb3J0ZWQuZmluZEluZGV4KGQgPT4gZC5pZCA9PT0gY29sdW1uWzBdLmlkKVxuICAgICAgICAvLyBFeGlzdGluZyBTb3J0ZWQgQ29sdW1uXG4gICAgICAgIGlmIChleGlzdGluZ0luZGV4ID4gLTEpIHtcbiAgICAgICAgICBjb25zdCBleGlzdGluZyA9IG5ld1NvcnRlZFtleGlzdGluZ0luZGV4XVxuICAgICAgICAgIGlmIChleGlzdGluZy5kZXNjID09PSBzZWNvbmRTb3J0RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoYWRkaXRpdmUpIHtcbiAgICAgICAgICAgICAgbmV3U29ydGVkLnNwbGljZShleGlzdGluZ0luZGV4LCBjb2x1bW4ubGVuZ3RoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29sdW1uLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBuZXdTb3J0ZWRbZXhpc3RpbmdJbmRleCArIGldLmRlc2MgPSBmaXJzdFNvcnREaXJlY3Rpb25cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sdW1uLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgbmV3U29ydGVkW2V4aXN0aW5nSW5kZXggKyBpXS5kZXNjID0gc2Vjb25kU29ydERpcmVjdGlvblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFhZGRpdGl2ZSkge1xuICAgICAgICAgICAgbmV3U29ydGVkID0gbmV3U29ydGVkLnNsaWNlKGV4aXN0aW5nSW5kZXgsIGNvbHVtbi5sZW5ndGgpXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIE5ldyBTb3J0IENvbHVtblxuICAgICAgICB9IGVsc2UgaWYgKGFkZGl0aXZlKSB7XG4gICAgICAgICAgbmV3U29ydGVkID0gbmV3U29ydGVkLmNvbmNhdChcbiAgICAgICAgICAgIGNvbHVtbi5tYXAoZCA9PiAoe1xuICAgICAgICAgICAgICBpZDogZC5pZCxcbiAgICAgICAgICAgICAgZGVzYzogZmlyc3RTb3J0RGlyZWN0aW9uLFxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld1NvcnRlZCA9IGNvbHVtbi5tYXAoZCA9PiAoe1xuICAgICAgICAgICAgaWQ6IGQuaWQsXG4gICAgICAgICAgICBkZXNjOiBmaXJzdFNvcnREaXJlY3Rpb24sXG4gICAgICAgICAgfSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKFxuICAgICAgICB7XG4gICAgICAgICAgcGFnZTogKCFzb3J0ZWQubGVuZ3RoICYmIG5ld1NvcnRlZC5sZW5ndGgpIHx8ICFhZGRpdGl2ZSA/IDAgOiB0aGlzLnN0YXRlLnBhZ2UsXG4gICAgICAgICAgc29ydGVkOiBuZXdTb3J0ZWQsXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IG9uU29ydGVkQ2hhbmdlICYmIG9uU29ydGVkQ2hhbmdlKG5ld1NvcnRlZCwgY29sdW1uLCBhZGRpdGl2ZSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBmaWx0ZXJDb2x1bW4gKGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgIGNvbnN0IHtmaWx0ZXJlZH0gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxuICAgICAgY29uc3Qge29uRmlsdGVyZWRDaGFuZ2V9ID0gdGhpcy5wcm9wc1xuXG4gICAgICAvLyBSZW1vdmUgb2xkIGZpbHRlciBmaXJzdCBpZiBpdCBleGlzdHNcbiAgICAgIGNvbnN0IG5ld0ZpbHRlcmluZyA9IChmaWx0ZXJlZCB8fCBbXSkuZmlsdGVyKHggPT4geC5pZCAhPT0gY29sdW1uLmlkKVxuXG4gICAgICBpZiAodmFsdWUgIT09ICcnKSB7XG4gICAgICAgIG5ld0ZpbHRlcmluZy5wdXNoKHtcbiAgICAgICAgICBpZDogY29sdW1uLmlkLFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEoXG4gICAgICAgIHtcbiAgICAgICAgICBmaWx0ZXJlZDogbmV3RmlsdGVyaW5nLFxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiBvbkZpbHRlcmVkQ2hhbmdlICYmIG9uRmlsdGVyZWRDaGFuZ2UobmV3RmlsdGVyaW5nLCBjb2x1bW4sIHZhbHVlKVxuICAgICAgKVxuICAgIH1cblxuICAgIHJlc2l6ZUNvbHVtblN0YXJ0IChldmVudCwgY29sdW1uLCBpc1RvdWNoKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgY29uc3QgcGFyZW50V2lkdGggPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuXG4gICAgICBsZXQgcGFnZVhcbiAgICAgIGlmIChpc1RvdWNoKSB7XG4gICAgICAgIHBhZ2VYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVhcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhZ2VYID0gZXZlbnQucGFnZVhcbiAgICAgIH1cblxuICAgICAgdGhpcy50cmFwRXZlbnRzID0gdHJ1ZVxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKFxuICAgICAgICB7XG4gICAgICAgICAgY3VycmVudGx5UmVzaXppbmc6IHtcbiAgICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXG4gICAgICAgICAgICBzdGFydFg6IHBhZ2VYLFxuICAgICAgICAgICAgcGFyZW50V2lkdGgsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGlmIChpc1RvdWNoKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbk1vdmluZylcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbk1vdmluZylcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICByZXNpemVDb2x1bW5Nb3ZpbmcgKGV2ZW50KSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgY29uc3Qge29uUmVzaXplZENoYW5nZX0gPSB0aGlzLnByb3BzXG4gICAgICBjb25zdCB7cmVzaXplZCwgY3VycmVudGx5UmVzaXppbmd9ID0gdGhpcy5nZXRSZXNvbHZlZFN0YXRlKClcblxuICAgICAgLy8gRGVsZXRlIG9sZCB2YWx1ZVxuICAgICAgY29uc3QgbmV3UmVzaXplZCA9IHJlc2l6ZWQuZmlsdGVyKHggPT4geC5pZCAhPT0gY3VycmVudGx5UmVzaXppbmcuaWQpXG5cbiAgICAgIGxldCBwYWdlWFxuXG4gICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ3RvdWNobW92ZScpIHtcbiAgICAgICAgcGFnZVggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWFxuICAgICAgfSBlbHNlIGlmIChldmVudC50eXBlID09PSAnbW91c2Vtb3ZlJykge1xuICAgICAgICBwYWdlWCA9IGV2ZW50LnBhZ2VYXG4gICAgICB9XG5cbiAgICAgIC8vIFNldCB0aGUgbWluIHNpemUgdG8gMTAgdG8gYWNjb3VudCBmb3IgbWFyZ2luIGFuZCBib3JkZXIgb3IgZWxzZSB0aGVcbiAgICAgIC8vIGdyb3VwIGhlYWRlcnMgZG9uJ3QgbGluZSB1cCBjb3JyZWN0bHlcbiAgICAgIGNvbnN0IG5ld1dpZHRoID0gTWF0aC5tYXgoXG4gICAgICAgIGN1cnJlbnRseVJlc2l6aW5nLnBhcmVudFdpZHRoICsgcGFnZVggLSBjdXJyZW50bHlSZXNpemluZy5zdGFydFgsXG4gICAgICAgIDExXG4gICAgICApXG5cbiAgICAgIG5ld1Jlc2l6ZWQucHVzaCh7XG4gICAgICAgIGlkOiBjdXJyZW50bHlSZXNpemluZy5pZCxcbiAgICAgICAgdmFsdWU6IG5ld1dpZHRoLFxuICAgICAgfSlcblxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKFxuICAgICAgICB7XG4gICAgICAgICAgcmVzaXplZDogbmV3UmVzaXplZCxcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4gb25SZXNpemVkQ2hhbmdlICYmIG9uUmVzaXplZENoYW5nZShuZXdSZXNpemVkLCBldmVudClcbiAgICAgIClcbiAgICB9XG5cbiAgICByZXNpemVDb2x1bW5FbmQgKGV2ZW50KSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgY29uc3QgaXNUb3VjaCA9IGV2ZW50LnR5cGUgPT09ICd0b3VjaGVuZCcgfHwgZXZlbnQudHlwZSA9PT0gJ3RvdWNoY2FuY2VsJ1xuXG4gICAgICBpZiAoaXNUb3VjaCkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbk1vdmluZylcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcbiAgICAgIH1cblxuICAgICAgLy8gSWYgaXRzIGEgdG91Y2ggZXZlbnQgY2xlYXIgdGhlIG1vdXNlIG9uZSdzIGFzIHdlbGwgYmVjYXVzZSBzb21ldGltZXNcbiAgICAgIC8vIHRoZSBtb3VzZURvd24gZXZlbnQgZ2V0cyBjYWxsZWQgYXMgd2VsbCwgYnV0IHRoZSBtb3VzZVVwIGV2ZW50IGRvZXNuJ3RcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMucmVzaXplQ29sdW1uTW92aW5nKVxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxuXG4gICAgICAvLyBUaGUgdG91Y2ggZXZlbnRzIGRvbid0IHByb3BhZ2F0ZSB1cCB0byB0aGUgc29ydGluZydzIG9uTW91c2VEb3duIGV2ZW50IHNvXG4gICAgICAvLyBubyBuZWVkIHRvIHByZXZlbnQgaXQgZnJvbSBoYXBwZW5pbmcgb3IgZWxzZSB0aGUgZmlyc3QgY2xpY2sgYWZ0ZXIgYSB0b3VjaFxuICAgICAgLy8gZXZlbnQgcmVzaXplIHdpbGwgbm90IHNvcnQgdGhlIGNvbHVtbi5cbiAgICAgIGlmICghaXNUb3VjaCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEoe1xuICAgICAgICAgIHNraXBOZXh0U29ydDogdHJ1ZSxcbiAgICAgICAgICBjdXJyZW50bHlSZXNpemluZzogZmFsc2UsXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG4iXX0=