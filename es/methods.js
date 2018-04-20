var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import _ from './utils';
import infiniteHelpers from './lazyLoad/utils/infiniteHelpers';

var timeScrollStateLastsForAfterUserScrolls = 150;

export default (function (Base) {
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
        var computedProps = infiniteHelpers.generateComputedProps(props);
        var utils = this.generateComputedUtilityFunctions();

        var newState = {};

        newState.dataLength = computedProps.data.length;
        newState.infiniteComputer = infiniteHelpers.createInfiniteComputer(computedProps.elementHeight, computedProps.data);

        newState.preloadBatchSize = computedProps.preloadBatchSize;
        newState.preloadAdditionalHeight = computedProps.preloadAdditionalHeight;

        newState = Object.assign(newState, infiniteHelpers.recomputeApertureStateFromOptionsAndScrollTop(newState, utils.getScrollTop()));

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

        var newApertureState = infiniteHelpers.recomputeApertureStateFromOptionsAndScrollTop(this.state, scrollTop);
        // this.props.onVisibleChange(newApertureState);
        this.setState(Object.assign({}, newApertureState));
      }
    }, {
      key: 'getResolvedState',
      value: function getResolvedState(props, state) {
        var resolvedState = _extends({}, _.compactObject(this.state), _.compactObject(this.props), _.compactObject(state), _.compactObject(props));
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
              return _.get(row, accessorString);
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
              return pivotBy.indexOf(d.id) > -1 ? false : _.getFirstDefined(d.show, true);
            });
            return _extends({}, column, {
              columns: visibleSubColumns
            });
          }
          return column;
        });

        visibleColumns = visibleColumns.filter(function (column) {
          return column.columns ? column.columns.length : pivotBy.indexOf(column.id) > -1 ? false : _.getFirstDefined(column.show, true);
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
            return React.createElement(
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
            var groupedRows = Object.entries(_.groupBy(rows, keys[i])).map(function (_ref) {
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
        return _.getFirstDefined(this.props[key], this.state[key]);
      }
    }, {
      key: 'getStateOrProp',
      value: function getStateOrProp(key) {
        return _.getFirstDefined(this.state[key], this.props[key]);
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

        var sortedData = (this.props.orderByMethod || _.orderBy)(data, sorted.map(function (sort) {
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
        return _.getFirstDefined(this.props.minRows, this.getStateOrProp('pageSize'));
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


        var newSorted = _.clone(sorted || []).map(function (d) {
          d.desc = _.isSortingDesc(d);
          return d;
        });
        if (!_.isArray(column)) {
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
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRob2RzLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiXyIsImluZmluaXRlSGVscGVycyIsInRpbWVTY3JvbGxTdGF0ZUxhc3RzRm9yQWZ0ZXJVc2VyU2Nyb2xscyIsInV0aWxpdGllcyIsIm5vZGVTY3JvbGxMaXN0ZW5lciIsImluZmluaXRlSGFuZGxlU2Nyb2xsIiwiZ2V0U2Nyb2xsVG9wIiwic2Nyb2xsYWJsZSIsInNjcm9sbFRvcCIsInNldFNjcm9sbFRvcCIsInRvcCIsInNjcm9sbFNob3VsZEJlSWdub3JlZCIsImV2ZW50IiwidGFyZ2V0IiwiYnVpbGRTY3JvbGxhYmxlU3R5bGUiLCJPYmplY3QiLCJhc3NpZ24iLCJoZWlnaHQiLCJjb21wdXRlZFByb3BzIiwiY29udGFpbmVySGVpZ2h0Iiwib3ZlcmZsb3dYIiwib3ZlcmZsb3dZIiwiV2Via2l0T3ZlcmZsb3dTY3JvbGxpbmciLCJzdHlsZXMiLCJzY3JvbGxhYmxlU3R5bGUiLCJwcm9wcyIsImdlbmVyYXRlQ29tcHV0ZWRQcm9wcyIsInV0aWxzIiwiZ2VuZXJhdGVDb21wdXRlZFV0aWxpdHlGdW5jdGlvbnMiLCJuZXdTdGF0ZSIsImRhdGFMZW5ndGgiLCJkYXRhIiwibGVuZ3RoIiwiaW5maW5pdGVDb21wdXRlciIsImNyZWF0ZUluZmluaXRlQ29tcHV0ZXIiLCJlbGVtZW50SGVpZ2h0IiwicHJlbG9hZEJhdGNoU2l6ZSIsInByZWxvYWRBZGRpdGlvbmFsSGVpZ2h0IiwicmVjb21wdXRlQXBlcnR1cmVTdGF0ZUZyb21PcHRpb25zQW5kU2Nyb2xsVG9wIiwiZSIsImhhbmRsZVNjcm9sbCIsInN0YXRlIiwic2Nyb2xsVGltZW91dCIsImNsZWFyVGltZW91dCIsInRoYXQiLCJzZXRUaW1lb3V0Iiwic2V0U3RhdGUiLCJpc1Njcm9sbGluZyIsInVuZGVmaW5lZCIsIm1hbmFnZVNjcm9sbFRpbWVvdXRzIiwibmV3QXBlcnR1cmVTdGF0ZSIsInJlc29sdmVkU3RhdGUiLCJjb21wYWN0T2JqZWN0IiwiY29sdW1ucyIsInBpdm90QnkiLCJwaXZvdElES2V5IiwicGl2b3RWYWxLZXkiLCJzdWJSb3dzS2V5IiwiYWdncmVnYXRlZEtleSIsIm5lc3RpbmdMZXZlbEtleSIsIm9yaWdpbmFsS2V5IiwiaW5kZXhLZXkiLCJncm91cGVkQnlQaXZvdEtleSIsIlN1YkNvbXBvbmVudCIsImhhc0hlYWRlckdyb3VwcyIsImZvckVhY2giLCJjb2x1bW4iLCJjb2x1bW5zV2l0aEV4cGFuZGVyIiwiZXhwYW5kZXJDb2x1bW4iLCJmaW5kIiwiY29sIiwiZXhwYW5kZXIiLCJzb21lIiwiY29sMiIsIm1ha2VEZWNvcmF0ZWRDb2x1bW4iLCJwYXJlbnRDb2x1bW4iLCJkY29sIiwiZXhwYW5kZXJEZWZhdWx0cyIsIm1heFdpZHRoIiwibWluV2lkdGgiLCJhY2Nlc3NvciIsImlkIiwiYWNjZXNzb3JTdHJpbmciLCJnZXQiLCJyb3ciLCJjb25zb2xlIiwid2FybiIsIkVycm9yIiwiYWxsRGVjb3JhdGVkQ29sdW1ucyIsImRlY29yYXRlQW5kQWRkVG9BbGwiLCJkZWNvcmF0ZWRDb2x1bW4iLCJwdXNoIiwiZGVjb3JhdGVkQ29sdW1ucyIsIm1hcCIsImQiLCJ2aXNpYmxlQ29sdW1ucyIsInNsaWNlIiwiYWxsVmlzaWJsZUNvbHVtbnMiLCJ2aXNpYmxlU3ViQ29sdW1ucyIsImZpbHRlciIsImluZGV4T2YiLCJnZXRGaXJzdERlZmluZWQiLCJzaG93IiwicGl2b3RJbmRleCIsImZpbmRJbmRleCIsInBpdm90IiwicGl2b3RDb2x1bW5zIiwiZm91bmQiLCJwaXZvdElEIiwiUGl2b3RQYXJlbnRDb2x1bW4iLCJyZWR1Y2UiLCJwcmV2IiwiY3VycmVudCIsIlBpdm90R3JvdXBIZWFkZXIiLCJIZWFkZXIiLCJwaXZvdENvbHVtbkdyb3VwIiwicGl2b3REZWZhdWx0cyIsInBpdm90ZWQiLCJzcGxpY2UiLCJ1bnNoaWZ0IiwiaGVhZGVyR3JvdXBzIiwiY3VycmVudFNwYW4iLCJhZGRIZWFkZXIiLCJjb25jYXQiLCJhY2Nlc3NSb3ciLCJpIiwibGV2ZWwiLCJyZXNvbHZlZERhdGEiLCJhZ2dyZWdhdGluZ0NvbHVtbnMiLCJhZ2dyZWdhdGUiLCJhZ2dyZWdhdGlvblZhbHVlcyIsInZhbHVlcyIsInJvd3MiLCJncm91cFJlY3Vyc2l2ZWx5Iiwia2V5cyIsImdyb3VwZWRSb3dzIiwiZW50cmllcyIsImdyb3VwQnkiLCJrZXkiLCJ2YWx1ZSIsInN1YlJvd3MiLCJyb3dHcm91cCIsIm1hbnVhbCIsInNvcnRlZCIsImZpbHRlcmVkIiwiZGVmYXVsdEZpbHRlck1ldGhvZCIsInNvcnRNZXRob2RzQnlDb2x1bW5JRCIsInNvcnRNZXRob2QiLCJzb3J0ZWREYXRhIiwic29ydERhdGEiLCJmaWx0ZXJEYXRhIiwib25GZXRjaERhdGEiLCJnZXRSZXNvbHZlZFN0YXRlIiwiZmlsdGVyZWREYXRhIiwiZmlsdGVyZWRTb0ZhciIsIm5leHRGaWx0ZXIiLCJ4IiwiZmlsdGVyYWJsZSIsImZpbHRlck1ldGhvZCIsImZpbHRlckFsbCIsIm9yZGVyQnlNZXRob2QiLCJvcmRlckJ5Iiwic29ydCIsImEiLCJiIiwiZGVzYyIsImRlZmF1bHRTb3J0TWV0aG9kIiwibWluUm93cyIsImdldFN0YXRlT3JQcm9wIiwicGFnZSIsIm9uUGFnZUNoYW5nZSIsImNvbGxhcHNlT25QYWdlQ2hhbmdlIiwiZXhwYW5kZWQiLCJzZXRTdGF0ZVdpdGhEYXRhIiwibmV3UGFnZVNpemUiLCJvblBhZ2VTaXplQ2hhbmdlIiwicGFnZVNpemUiLCJjdXJyZW50Um93IiwibmV3UGFnZSIsIk1hdGgiLCJmbG9vciIsImFkZGl0aXZlIiwic2tpcE5leHRTb3J0IiwiZGVmYXVsdFNvcnREZXNjIiwiZmlyc3RTb3J0RGlyZWN0aW9uIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwic2Vjb25kU29ydERpcmVjdGlvbiIsIm9uU29ydGVkQ2hhbmdlIiwibmV3U29ydGVkIiwiY2xvbmUiLCJpc1NvcnRpbmdEZXNjIiwiaXNBcnJheSIsImV4aXN0aW5nSW5kZXgiLCJleGlzdGluZyIsIm9uRmlsdGVyZWRDaGFuZ2UiLCJuZXdGaWx0ZXJpbmciLCJpc1RvdWNoIiwic3RvcFByb3BhZ2F0aW9uIiwicGFyZW50V2lkdGgiLCJwYXJlbnRFbGVtZW50IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJwYWdlWCIsImNoYW5nZWRUb3VjaGVzIiwidHJhcEV2ZW50cyIsImN1cnJlbnRseVJlc2l6aW5nIiwic3RhcnRYIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVzaXplQ29sdW1uTW92aW5nIiwicmVzaXplQ29sdW1uRW5kIiwib25SZXNpemVkQ2hhbmdlIiwicmVzaXplZCIsIm5ld1Jlc2l6ZWQiLCJ0eXBlIiwibmV3V2lkdGgiLCJtYXgiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiQmFzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxDQUFQLE1BQWMsU0FBZDtBQUNBLE9BQU9DLGVBQVAsTUFBNEIsa0NBQTVCOztBQUVBLElBQU1DLDBDQUEwQyxHQUFoRDs7QUFFQSxnQkFBZTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSx5REFFeUI7QUFBQTs7QUFBRTtBQUNwQyxZQUFJQyxZQUFZLEVBQWhCOztBQUVBQSxrQkFBVUMsa0JBQVYsR0FBK0IsS0FBS0Msb0JBQXBDO0FBQ0FGLGtCQUFVRyxZQUFWLEdBQXlCLFlBQU07QUFDN0IsaUJBQU8sT0FBS0MsVUFBTCxHQUFrQixPQUFLQSxVQUFMLENBQWdCQyxTQUFsQyxHQUE4QyxDQUFyRDtBQUNELFNBRkQ7O0FBSUFMLGtCQUFVTSxZQUFWLEdBQXlCLGVBQU87QUFDOUIsY0FBSSxPQUFLRixVQUFULEVBQXFCO0FBQ25CLG1CQUFLQSxVQUFMLENBQWdCQyxTQUFoQixHQUE0QkUsR0FBNUI7QUFDRDtBQUNGLFNBSkQ7QUFLQVAsa0JBQVVRLHFCQUFWLEdBQWtDO0FBQUEsaUJBQVNDLE1BQU1DLE1BQU4s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QUEwQyxLQUFLUixrQkFBL0M7QUFDQUYsaUJBQVNVLG1CQUFULENBQTZCLFNBQTdCLEVBQXdDLEtBQUtQLGVBQTdDO0FBQ0FILGlCQUFTVSxtQkFBVCxDQUE2QixZQUE3QixFQUEyQyxLQUFLUCxlQUFoRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJLENBQUNkLE9BQUwsRUFBYztBQUNaLGVBQUt6QixnQkFBTCxDQUFzQjtBQUNwQlMsMEJBQWMsSUFETTtBQUVwQnlCLCtCQUFtQjtBQUZDLFdBQXRCO0FBSUQ7QUFDRjtBQXZ2QlU7O0FBQUE7QUFBQSxJQUNDYSxJQUREO0FBQUEsQ0FBZiIsImZpbGUiOiJtZXRob2RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IF8gZnJvbSAnLi91dGlscydcbmltcG9ydCBpbmZpbml0ZUhlbHBlcnMgZnJvbSAnLi9sYXp5TG9hZC91dGlscy9pbmZpbml0ZUhlbHBlcnMnXG5cbmNvbnN0IHRpbWVTY3JvbGxTdGF0ZUxhc3RzRm9yQWZ0ZXJVc2VyU2Nyb2xscyA9IDE1MFxuXG5leHBvcnQgZGVmYXVsdCBCYXNlID0+XG4gIGNsYXNzIGV4dGVuZHMgQmFzZSB7XG4gICAgZ2VuZXJhdGVDb21wdXRlZFV0aWxpdHlGdW5jdGlvbnMgKCkgeyAvL1xuICAgICAgbGV0IHV0aWxpdGllcyA9IHt9XG5cbiAgICAgIHV0aWxpdGllcy5ub2RlU2Nyb2xsTGlzdGVuZXIgPSB0aGlzLmluZmluaXRlSGFuZGxlU2Nyb2xsXG4gICAgICB1dGlsaXRpZXMuZ2V0U2Nyb2xsVG9wID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zY3JvbGxhYmxlID8gdGhpcy5zY3JvbGxhYmxlLnNjcm9sbFRvcCA6IDBcbiAgICAgIH1cblxuICAgICAgdXRpbGl0aWVzLnNldFNjcm9sbFRvcCA9IHRvcCA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbGFibGUpIHtcbiAgICAgICAgICB0aGlzLnNjcm9sbGFibGUuc2Nyb2xsVG9wID0gdG9wXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHV0aWxpdGllcy5zY3JvbGxTaG91bGRCZUlnbm9yZWQgPSBldmVudCA9PiBldmVudC50YXJnZXQgIT09IHRoaXMuc2Nyb2xsYWJsZVxuXG4gICAgICB1dGlsaXRpZXMuYnVpbGRTY3JvbGxhYmxlU3R5bGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5jb21wdXRlZFByb3BzLmNvbnRhaW5lckhlaWdodCxcbiAgICAgICAgICAgIG92ZXJmbG93WDogJ2hpZGRlbicsXG4gICAgICAgICAgICBvdmVyZmxvd1k6ICdzY3JvbGwnLFxuICAgICAgICAgICAgV2Via2l0T3ZlcmZsb3dTY3JvbGxpbmc6ICd0b3VjaCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRoaXMuY29tcHV0ZWRQcm9wcy5zdHlsZXMuc2Nyb2xsYWJsZVN0eWxlIHx8IHt9XG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHV0aWxpdGllc1xuICAgIH1cblxuICAgIHJlY29tcHV0ZUludGVybmFsU3RhdGVGcm9tUHJvcHMgKHByb3BzKSB7IC8vXG4gICAgICBsZXQgY29tcHV0ZWRQcm9wcyA9IGluZmluaXRlSGVscGVycy5nZW5lcmF0ZUNvbXB1dGVkUHJvcHMocHJvcHMpXG4gICAgICBsZXQgdXRpbHMgPSB0aGlzLmdlbmVyYXRlQ29tcHV0ZWRVdGlsaXR5RnVuY3Rpb25zKClcblxuICAgICAgbGV0IG5ld1N0YXRlID0ge31cblxuICAgICAgbmV3U3RhdGUuZGF0YUxlbmd0aCA9IGNvbXB1dGVkUHJvcHMuZGF0YS5sZW5ndGhcbiAgICAgIG5ld1N0YXRlLmluZmluaXRlQ29tcHV0ZXIgPSBpbmZpbml0ZUhlbHBlcnMuY3JlYXRlSW5maW5pdGVDb21wdXRlcihcbiAgICAgICAgY29tcHV0ZWRQcm9wcy5lbGVtZW50SGVpZ2h0LFxuICAgICAgICBjb21wdXRlZFByb3BzLmRhdGFcbiAgICAgIClcblxuICAgICAgbmV3U3RhdGUucHJlbG9hZEJhdGNoU2l6ZSA9IGNvbXB1dGVkUHJvcHMucHJlbG9hZEJhdGNoU2l6ZVxuICAgICAgbmV3U3RhdGUucHJlbG9hZEFkZGl0aW9uYWxIZWlnaHQgPSBjb21wdXRlZFByb3BzLnByZWxvYWRBZGRpdGlvbmFsSGVpZ2h0XG5cbiAgICAgIG5ld1N0YXRlID0gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgbmV3U3RhdGUsXG4gICAgICAgIGluZmluaXRlSGVscGVycy5yZWNvbXB1dGVBcGVydHVyZVN0YXRlRnJvbU9wdGlvbnNBbmRTY3JvbGxUb3AobmV3U3RhdGUsIHV0aWxzLmdldFNjcm9sbFRvcCgpKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wdXRlZFByb3BzLFxuICAgICAgICB1dGlscyxcbiAgICAgICAgbmV3U3RhdGVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpbmZpbml0ZUhhbmRsZVNjcm9sbCAoZSkgeyAvL1xuICAgICAgaWYgKHRoaXMudXRpbHMuc2Nyb2xsU2hvdWxkQmVJZ25vcmVkKGUpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0aGlzLmhhbmRsZVNjcm9sbCh0aGlzLnV0aWxzLmdldFNjcm9sbFRvcCgpKVxuICAgIH1cblxuICAgIG1hbmFnZVNjcm9sbFRpbWVvdXRzICgpIHtcbiAgICAgIC8vIE1haW50YWlucyBhIHNlcmllcyBvZiB0aW1lb3V0cyB0byBzZXQgdGhpcy5zdGF0ZS5pc1Njcm9sbGluZ1xuICAgICAgLy8gdG8gYmUgdHJ1ZSB3aGVuIHRoZSBlbGVtZW50IGlzIHNjcm9sbGluZy5cblxuICAgICAgaWYgKHRoaXMuc3RhdGUuc2Nyb2xsVGltZW91dCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zdGF0ZS5zY3JvbGxUaW1lb3V0KVxuICAgICAgfVxuXG4gICAgICBsZXQgdGhhdCA9IHRoaXNcbiAgICAgIGxldCBzY3JvbGxUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgIGlzU2Nyb2xsaW5nOiBmYWxzZSxcbiAgICAgICAgICBzY3JvbGxUaW1lb3V0OiB1bmRlZmluZWRcbiAgICAgICAgfSlcbiAgICAgIH0sIHRpbWVTY3JvbGxTdGF0ZUxhc3RzRm9yQWZ0ZXJVc2VyU2Nyb2xscylcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGlzU2Nyb2xsaW5nOiB0cnVlLFxuICAgICAgICBzY3JvbGxUaW1lb3V0OiBzY3JvbGxUaW1lb3V0XG4gICAgICB9KVxuICAgIH1cbiAgICBoYW5kbGVTY3JvbGwgKHNjcm9sbFRvcCkge1xuICAgICAgdGhpcy5tYW5hZ2VTY3JvbGxUaW1lb3V0cygpO1xuXG4gICAgICBsZXQgbmV3QXBlcnR1cmVTdGF0ZSA9IGluZmluaXRlSGVscGVycy5yZWNvbXB1dGVBcGVydHVyZVN0YXRlRnJvbU9wdGlvbnNBbmRTY3JvbGxUb3AodGhpcy5zdGF0ZSwgc2Nyb2xsVG9wKVxuICAgICAgLy8gdGhpcy5wcm9wcy5vblZpc2libGVDaGFuZ2UobmV3QXBlcnR1cmVTdGF0ZSk7XG4gICAgICB0aGlzLnNldFN0YXRlKE9iamVjdC5hc3NpZ24oe30sIG5ld0FwZXJ0dXJlU3RhdGUpKVxuICAgIH07XG5cbiAgICBnZXRSZXNvbHZlZFN0YXRlIChwcm9wcywgc3RhdGUpIHtcbiAgICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB7XG4gICAgICAgIC4uLl8uY29tcGFjdE9iamVjdCh0aGlzLnN0YXRlKSxcbiAgICAgICAgLi4uXy5jb21wYWN0T2JqZWN0KHRoaXMucHJvcHMpLFxuICAgICAgICAuLi5fLmNvbXBhY3RPYmplY3Qoc3RhdGUpLFxuICAgICAgICAuLi5fLmNvbXBhY3RPYmplY3QocHJvcHMpLFxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc29sdmVkU3RhdGVcbiAgICB9XG5cbiAgICBnZXREYXRhTW9kZWwgKG5ld1N0YXRlKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNvbHVtbnMsXG4gICAgICAgIHBpdm90QnkgPSBbXSxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgcGl2b3RJREtleSxcbiAgICAgICAgcGl2b3RWYWxLZXksXG4gICAgICAgIHN1YlJvd3NLZXksXG4gICAgICAgIGFnZ3JlZ2F0ZWRLZXksXG4gICAgICAgIG5lc3RpbmdMZXZlbEtleSxcbiAgICAgICAgb3JpZ2luYWxLZXksXG4gICAgICAgIGluZGV4S2V5LFxuICAgICAgICBncm91cGVkQnlQaXZvdEtleSxcbiAgICAgICAgU3ViQ29tcG9uZW50LFxuICAgICAgfSA9IG5ld1N0YXRlXG5cbiAgICAgIC8vIERldGVybWluZSBIZWFkZXIgR3JvdXBzXG4gICAgICBsZXQgaGFzSGVhZGVyR3JvdXBzID0gZmFsc2VcbiAgICAgIGNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICBpZiAoY29sdW1uLmNvbHVtbnMpIHtcbiAgICAgICAgICBoYXNIZWFkZXJHcm91cHMgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIGxldCBjb2x1bW5zV2l0aEV4cGFuZGVyID0gWy4uLmNvbHVtbnNdXG5cbiAgICAgIGxldCBleHBhbmRlckNvbHVtbiA9IGNvbHVtbnMuZmluZChcbiAgICAgICAgY29sID0+IGNvbC5leHBhbmRlciB8fCAoY29sLmNvbHVtbnMgJiYgY29sLmNvbHVtbnMuc29tZShjb2wyID0+IGNvbDIuZXhwYW5kZXIpKVxuICAgICAgKVxuICAgICAgLy8gVGhlIGFjdHVhbCBleHBhbmRlciBtaWdodCBiZSBpbiB0aGUgY29sdW1ucyBmaWVsZCBvZiBhIGdyb3VwIGNvbHVtblxuICAgICAgaWYgKGV4cGFuZGVyQ29sdW1uICYmICFleHBhbmRlckNvbHVtbi5leHBhbmRlcikge1xuICAgICAgICBleHBhbmRlckNvbHVtbiA9IGV4cGFuZGVyQ29sdW1uLmNvbHVtbnMuZmluZChjb2wgPT4gY29sLmV4cGFuZGVyKVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB3ZSBoYXZlIFN1YkNvbXBvbmVudCdzIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlIGhhdmUgYW4gZXhwYW5kZXIgY29sdW1uXG4gICAgICBpZiAoU3ViQ29tcG9uZW50ICYmICFleHBhbmRlckNvbHVtbikge1xuICAgICAgICBleHBhbmRlckNvbHVtbiA9IHtleHBhbmRlcjogdHJ1ZX1cbiAgICAgICAgY29sdW1uc1dpdGhFeHBhbmRlciA9IFtleHBhbmRlckNvbHVtbiwgLi4uY29sdW1uc1dpdGhFeHBhbmRlcl1cbiAgICAgIH1cblxuICAgICAgY29uc3QgbWFrZURlY29yYXRlZENvbHVtbiA9IChjb2x1bW4sIHBhcmVudENvbHVtbikgPT4ge1xuICAgICAgICBsZXQgZGNvbFxuICAgICAgICBpZiAoY29sdW1uLmV4cGFuZGVyKSB7XG4gICAgICAgICAgZGNvbCA9IHtcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuY29sdW1uLFxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5leHBhbmRlckRlZmF1bHRzLFxuICAgICAgICAgICAgLi4uY29sdW1uLFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkY29sID0ge1xuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5jb2x1bW4sXG4gICAgICAgICAgICAuLi5jb2x1bW4sXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRW5zdXJlIG1pbldpZHRoIGlzIG5vdCBncmVhdGVyIHRoYW4gbWF4V2lkdGggaWYgc2V0XG4gICAgICAgIGlmIChkY29sLm1heFdpZHRoIDwgZGNvbC5taW5XaWR0aCkge1xuICAgICAgICAgIGRjb2wubWluV2lkdGggPSBkY29sLm1heFdpZHRoXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyZW50Q29sdW1uKSB7XG4gICAgICAgICAgZGNvbC5wYXJlbnRDb2x1bW4gPSBwYXJlbnRDb2x1bW5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpcnN0IGNoZWNrIGZvciBzdHJpbmcgYWNjZXNzb3JcbiAgICAgICAgaWYgKHR5cGVvZiBkY29sLmFjY2Vzc29yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGRjb2wuaWQgPSBkY29sLmlkIHx8IGRjb2wuYWNjZXNzb3JcbiAgICAgICAgICBjb25zdCBhY2Nlc3NvclN0cmluZyA9IGRjb2wuYWNjZXNzb3JcbiAgICAgICAgICBkY29sLmFjY2Vzc29yID0gcm93ID0+IF8uZ2V0KHJvdywgYWNjZXNzb3JTdHJpbmcpXG4gICAgICAgICAgcmV0dXJuIGRjb2xcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZhbGwgYmFjayB0byBmdW5jdGlvbmFsIGFjY2Vzc29yIChidXQgcmVxdWlyZSBhbiBJRClcbiAgICAgICAgaWYgKGRjb2wuYWNjZXNzb3IgJiYgIWRjb2wuaWQpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oZGNvbClcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnQSBjb2x1bW4gaWQgaXMgcmVxdWlyZWQgaWYgdXNpbmcgYSBub24tc3RyaW5nIGFjY2Vzc29yIGZvciBjb2x1bW4gYWJvdmUuJ1xuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZhbGwgYmFjayB0byBhbiB1bmRlZmluZWQgYWNjZXNzb3JcbiAgICAgICAgaWYgKCFkY29sLmFjY2Vzc29yKSB7XG4gICAgICAgICAgZGNvbC5hY2Nlc3NvciA9ICgpID0+IHVuZGVmaW5lZFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRjb2xcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWxsRGVjb3JhdGVkQ29sdW1ucyA9IFtdXG5cbiAgICAgIC8vIERlY29yYXRlIHRoZSBjb2x1bW5zXG4gICAgICBjb25zdCBkZWNvcmF0ZUFuZEFkZFRvQWxsID0gKGNvbHVtbiwgcGFyZW50Q29sdW1uKSA9PiB7XG4gICAgICAgIGNvbnN0IGRlY29yYXRlZENvbHVtbiA9IG1ha2VEZWNvcmF0ZWRDb2x1bW4oY29sdW1uLCBwYXJlbnRDb2x1bW4pXG4gICAgICAgIGFsbERlY29yYXRlZENvbHVtbnMucHVzaChkZWNvcmF0ZWRDb2x1bW4pXG4gICAgICAgIHJldHVybiBkZWNvcmF0ZWRDb2x1bW5cbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVjb3JhdGVkQ29sdW1ucyA9IGNvbHVtbnNXaXRoRXhwYW5kZXIubWFwKGNvbHVtbiA9PiB7XG4gICAgICAgIGlmIChjb2x1bW4uY29sdW1ucykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5jb2x1bW4sXG4gICAgICAgICAgICBjb2x1bW5zOiBjb2x1bW4uY29sdW1ucy5tYXAoZCA9PiBkZWNvcmF0ZUFuZEFkZFRvQWxsKGQsIGNvbHVtbikpLFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVjb3JhdGVBbmRBZGRUb0FsbChjb2x1bW4pXG4gICAgICB9KVxuXG4gICAgICAvLyBCdWlsZCB0aGUgdmlzaWJsZSBjb2x1bW5zLCBoZWFkZXJzIGFuZCBmbGF0IGNvbHVtbiBsaXN0XG4gICAgICBsZXQgdmlzaWJsZUNvbHVtbnMgPSBkZWNvcmF0ZWRDb2x1bW5zLnNsaWNlKClcbiAgICAgIGxldCBhbGxWaXNpYmxlQ29sdW1ucyA9IFtdXG5cbiAgICAgIHZpc2libGVDb2x1bW5zID0gdmlzaWJsZUNvbHVtbnMubWFwKGNvbHVtbiA9PiB7XG4gICAgICAgIGlmIChjb2x1bW4uY29sdW1ucykge1xuICAgICAgICAgIGNvbnN0IHZpc2libGVTdWJDb2x1bW5zID0gY29sdW1uLmNvbHVtbnMuZmlsdGVyKFxuICAgICAgICAgICAgZCA9PiAocGl2b3RCeS5pbmRleE9mKGQuaWQpID4gLTEgPyBmYWxzZSA6IF8uZ2V0Rmlyc3REZWZpbmVkKGQuc2hvdywgdHJ1ZSkpXG4gICAgICAgICAgKVxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5jb2x1bW4sXG4gICAgICAgICAgICBjb2x1bW5zOiB2aXNpYmxlU3ViQ29sdW1ucyxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbHVtblxuICAgICAgfSlcblxuICAgICAgdmlzaWJsZUNvbHVtbnMgPSB2aXNpYmxlQ29sdW1ucy5maWx0ZXIoXG4gICAgICAgIGNvbHVtbiA9PlxuICAgICAgICAgIGNvbHVtbi5jb2x1bW5zXG4gICAgICAgICAgICA/IGNvbHVtbi5jb2x1bW5zLmxlbmd0aFxuICAgICAgICAgICAgOiBwaXZvdEJ5LmluZGV4T2YoY29sdW1uLmlkKSA+IC0xXG4gICAgICAgICAgICA/IGZhbHNlXG4gICAgICAgICAgICA6IF8uZ2V0Rmlyc3REZWZpbmVkKGNvbHVtbi5zaG93LCB0cnVlKVxuICAgICAgKVxuXG4gICAgICAvLyBGaW5kIGFueSBjdXN0b20gcGl2b3QgbG9jYXRpb25cbiAgICAgIGNvbnN0IHBpdm90SW5kZXggPSB2aXNpYmxlQ29sdW1ucy5maW5kSW5kZXgoY29sID0+IGNvbC5waXZvdClcblxuICAgICAgLy8gSGFuZGxlIFBpdm90IENvbHVtbnNcbiAgICAgIGlmIChwaXZvdEJ5Lmxlbmd0aCkge1xuICAgICAgICAvLyBSZXRyaWV2ZSB0aGUgcGl2b3QgY29sdW1ucyBpbiB0aGUgY29ycmVjdCBwaXZvdCBvcmRlclxuICAgICAgICBjb25zdCBwaXZvdENvbHVtbnMgPSBbXVxuICAgICAgICBwaXZvdEJ5LmZvckVhY2gocGl2b3RJRCA9PiB7XG4gICAgICAgICAgY29uc3QgZm91bmQgPSBhbGxEZWNvcmF0ZWRDb2x1bW5zLmZpbmQoZCA9PiBkLmlkID09PSBwaXZvdElEKVxuICAgICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgICAgcGl2b3RDb2x1bW5zLnB1c2goZm91bmQpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IFBpdm90UGFyZW50Q29sdW1uID0gcGl2b3RDb2x1bW5zLnJlZHVjZShcbiAgICAgICAgICAocHJldiwgY3VycmVudCkgPT4gcHJldiAmJiBwcmV2ID09PSBjdXJyZW50LnBhcmVudENvbHVtbiAmJiBjdXJyZW50LnBhcmVudENvbHVtbixcbiAgICAgICAgICBwaXZvdENvbHVtbnNbMF0ucGFyZW50Q29sdW1uXG4gICAgICAgIClcblxuICAgICAgICBsZXQgUGl2b3RHcm91cEhlYWRlciA9IGhhc0hlYWRlckdyb3VwcyAmJiBQaXZvdFBhcmVudENvbHVtbi5IZWFkZXJcbiAgICAgICAgUGl2b3RHcm91cEhlYWRlciA9IFBpdm90R3JvdXBIZWFkZXIgfHwgKCgpID0+IDxzdHJvbmc+UGl2b3RlZDwvc3Ryb25nPilcblxuICAgICAgICBsZXQgcGl2b3RDb2x1bW5Hcm91cCA9IHtcbiAgICAgICAgICBIZWFkZXI6IFBpdm90R3JvdXBIZWFkZXIsXG4gICAgICAgICAgY29sdW1uczogcGl2b3RDb2x1bW5zLm1hcChjb2wgPT4gKHtcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMucGl2b3REZWZhdWx0cyxcbiAgICAgICAgICAgIC4uLmNvbCxcbiAgICAgICAgICAgIHBpdm90ZWQ6IHRydWUsXG4gICAgICAgICAgfSkpLFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUGxhY2UgdGhlIHBpdm90Q29sdW1ucyBiYWNrIGludG8gdGhlIHZpc2libGVDb2x1bW5zXG4gICAgICAgIGlmIChwaXZvdEluZGV4ID49IDApIHtcbiAgICAgICAgICBwaXZvdENvbHVtbkdyb3VwID0ge1xuICAgICAgICAgICAgLi4udmlzaWJsZUNvbHVtbnNbcGl2b3RJbmRleF0sXG4gICAgICAgICAgICAuLi5waXZvdENvbHVtbkdyb3VwLFxuICAgICAgICAgIH1cbiAgICAgICAgICB2aXNpYmxlQ29sdW1ucy5zcGxpY2UocGl2b3RJbmRleCwgMSwgcGl2b3RDb2x1bW5Hcm91cClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2aXNpYmxlQ29sdW1ucy51bnNoaWZ0KHBpdm90Q29sdW1uR3JvdXApXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQnVpbGQgSGVhZGVyIEdyb3Vwc1xuICAgICAgY29uc3QgaGVhZGVyR3JvdXBzID0gW11cbiAgICAgIGxldCBjdXJyZW50U3BhbiA9IFtdXG5cbiAgICAgIC8vIEEgY29udmVuaWVuY2UgZnVuY3Rpb24gdG8gYWRkIGEgaGVhZGVyIGFuZCByZXNldCB0aGUgY3VycmVudFNwYW5cbiAgICAgIGNvbnN0IGFkZEhlYWRlciA9IChjb2x1bW5zLCBjb2x1bW4pID0+IHtcbiAgICAgICAgaGVhZGVyR3JvdXBzLnB1c2goe1xuICAgICAgICAgIC4uLnRoaXMucHJvcHMuY29sdW1uLFxuICAgICAgICAgIC4uLmNvbHVtbixcbiAgICAgICAgICBjb2x1bW5zLFxuICAgICAgICB9KVxuICAgICAgICBjdXJyZW50U3BhbiA9IFtdXG4gICAgICB9XG5cbiAgICAgIC8vIEJ1aWxkIGZsYXN0IGxpc3Qgb2YgYWxsVmlzaWJsZUNvbHVtbnMgYW5kIEhlYWRlckdyb3Vwc1xuICAgICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICBpZiAoY29sdW1uLmNvbHVtbnMpIHtcbiAgICAgICAgICBhbGxWaXNpYmxlQ29sdW1ucyA9IGFsbFZpc2libGVDb2x1bW5zLmNvbmNhdChjb2x1bW4uY29sdW1ucylcbiAgICAgICAgICBpZiAoY3VycmVudFNwYW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgYWRkSGVhZGVyKGN1cnJlbnRTcGFuKVxuICAgICAgICAgIH1cbiAgICAgICAgICBhZGRIZWFkZXIoY29sdW1uLmNvbHVtbnMsIGNvbHVtbilcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBhbGxWaXNpYmxlQ29sdW1ucy5wdXNoKGNvbHVtbilcbiAgICAgICAgY3VycmVudFNwYW4ucHVzaChjb2x1bW4pXG4gICAgICB9KVxuICAgICAgaWYgKGhhc0hlYWRlckdyb3VwcyAmJiBjdXJyZW50U3Bhbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIGFkZEhlYWRlcihjdXJyZW50U3BhbilcbiAgICAgIH1cblxuICAgICAgLy8gQWNjZXNzIHRoZSBkYXRhXG4gICAgICBjb25zdCBhY2Nlc3NSb3cgPSAoZCwgaSwgbGV2ZWwgPSAwKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdyA9IHtcbiAgICAgICAgICBbb3JpZ2luYWxLZXldOiBkLFxuICAgICAgICAgIFtpbmRleEtleV06IGksXG4gICAgICAgICAgW3N1YlJvd3NLZXldOiBkW3N1YlJvd3NLZXldLFxuICAgICAgICAgIFtuZXN0aW5nTGV2ZWxLZXldOiBsZXZlbCxcbiAgICAgICAgfVxuICAgICAgICBhbGxEZWNvcmF0ZWRDb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcbiAgICAgICAgICBpZiAoY29sdW1uLmV4cGFuZGVyKSByZXR1cm5cbiAgICAgICAgICByb3dbY29sdW1uLmlkXSA9IGNvbHVtbi5hY2Nlc3NvcihkKVxuICAgICAgICB9KVxuICAgICAgICBpZiAocm93W3N1YlJvd3NLZXldKSB7XG4gICAgICAgICAgcm93W3N1YlJvd3NLZXldID0gcm93W3N1YlJvd3NLZXldLm1hcCgoZCwgaSkgPT4gYWNjZXNzUm93KGQsIGksIGxldmVsICsgMSkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJvd1xuICAgICAgfVxuICAgICAgbGV0IHJlc29sdmVkRGF0YSA9IGRhdGEubWFwKChkLCBpKSA9PiBhY2Nlc3NSb3coZCwgaSkpXG5cbiAgICAgIC8vIFRPRE86IE1ha2UgaXQgcG9zc2libGUgdG8gZmFicmljYXRlIG5lc3RlZCByb3dzIHdpdGhvdXQgcGl2b3RpbmdcbiAgICAgIGNvbnN0IGFnZ3JlZ2F0aW5nQ29sdW1ucyA9IGFsbFZpc2libGVDb2x1bW5zLmZpbHRlcihkID0+ICFkLmV4cGFuZGVyICYmIGQuYWdncmVnYXRlKVxuXG4gICAgICAvLyBJZiBwaXZvdGluZywgcmVjdXJzaXZlbHkgZ3JvdXAgdGhlIGRhdGFcbiAgICAgIGNvbnN0IGFnZ3JlZ2F0ZSA9IHJvd3MgPT4ge1xuICAgICAgICBjb25zdCBhZ2dyZWdhdGlvblZhbHVlcyA9IHt9XG4gICAgICAgIGFnZ3JlZ2F0aW5nQ29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWVzID0gcm93cy5tYXAoZCA9PiBkW2NvbHVtbi5pZF0pXG4gICAgICAgICAgYWdncmVnYXRpb25WYWx1ZXNbY29sdW1uLmlkXSA9IGNvbHVtbi5hZ2dyZWdhdGUodmFsdWVzLCByb3dzKVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYWdncmVnYXRpb25WYWx1ZXNcbiAgICAgIH1cbiAgICAgIGlmIChwaXZvdEJ5Lmxlbmd0aCkge1xuICAgICAgICBjb25zdCBncm91cFJlY3Vyc2l2ZWx5ID0gKHJvd3MsIGtleXMsIGkgPSAwKSA9PiB7XG4gICAgICAgICAgLy8gVGhpcyBpcyB0aGUgbGFzdCBsZXZlbCwganVzdCByZXR1cm4gdGhlIHJvd3NcbiAgICAgICAgICBpZiAoaSA9PT0ga2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiByb3dzXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEdyb3VwIHRoZSByb3dzIHRvZ2V0aGVyIGZvciB0aGlzIGxldmVsXG4gICAgICAgICAgbGV0IGdyb3VwZWRSb3dzID0gT2JqZWN0LmVudHJpZXMoXy5ncm91cEJ5KHJvd3MsIGtleXNbaV0pKS5tYXAoKFtrZXksIHZhbHVlXSkgPT4gKHtcbiAgICAgICAgICAgIFtwaXZvdElES2V5XToga2V5c1tpXSxcbiAgICAgICAgICAgIFtwaXZvdFZhbEtleV06IGtleSxcbiAgICAgICAgICAgIFtrZXlzW2ldXToga2V5LFxuICAgICAgICAgICAgW3N1YlJvd3NLZXldOiB2YWx1ZSxcbiAgICAgICAgICAgIFtuZXN0aW5nTGV2ZWxLZXldOiBpLFxuICAgICAgICAgICAgW2dyb3VwZWRCeVBpdm90S2V5XTogdHJ1ZSxcbiAgICAgICAgICB9KSlcbiAgICAgICAgICAvLyBSZWN1cnNlIGludG8gdGhlIHN1YlJvd3NcbiAgICAgICAgICBncm91cGVkUm93cyA9IGdyb3VwZWRSb3dzLm1hcChyb3dHcm91cCA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdWJSb3dzID0gZ3JvdXBSZWN1cnNpdmVseShyb3dHcm91cFtzdWJSb3dzS2V5XSwga2V5cywgaSArIDEpXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5yb3dHcm91cCxcbiAgICAgICAgICAgICAgW3N1YlJvd3NLZXldOiBzdWJSb3dzLFxuICAgICAgICAgICAgICBbYWdncmVnYXRlZEtleV06IHRydWUsXG4gICAgICAgICAgICAgIC4uLmFnZ3JlZ2F0ZShzdWJSb3dzKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybiBncm91cGVkUm93c1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmVkRGF0YSA9IGdyb3VwUmVjdXJzaXZlbHkocmVzb2x2ZWREYXRhLCBwaXZvdEJ5KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5uZXdTdGF0ZSxcbiAgICAgICAgcmVzb2x2ZWREYXRhLFxuICAgICAgICBhbGxWaXNpYmxlQ29sdW1ucyxcbiAgICAgICAgaGVhZGVyR3JvdXBzLFxuICAgICAgICBhbGxEZWNvcmF0ZWRDb2x1bW5zLFxuICAgICAgICBoYXNIZWFkZXJHcm91cHMsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U29ydGVkRGF0YSAocmVzb2x2ZWRTdGF0ZSkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBtYW51YWwsXG4gICAgICAgIHNvcnRlZCxcbiAgICAgICAgZmlsdGVyZWQsXG4gICAgICAgIGRlZmF1bHRGaWx0ZXJNZXRob2QsXG4gICAgICAgIHJlc29sdmVkRGF0YSxcbiAgICAgICAgYWxsVmlzaWJsZUNvbHVtbnMsXG4gICAgICAgIGFsbERlY29yYXRlZENvbHVtbnMsXG4gICAgICB9ID0gcmVzb2x2ZWRTdGF0ZVxuXG4gICAgICBjb25zdCBzb3J0TWV0aG9kc0J5Q29sdW1uSUQgPSB7fVxuXG4gICAgICBhbGxEZWNvcmF0ZWRDb2x1bW5zLmZpbHRlcihjb2wgPT4gY29sLnNvcnRNZXRob2QpLmZvckVhY2goY29sID0+IHtcbiAgICAgICAgc29ydE1ldGhvZHNCeUNvbHVtbklEW2NvbC5pZF0gPSBjb2wuc29ydE1ldGhvZFxuICAgICAgfSlcblxuICAgICAgLy8gUmVzb2x2ZSB0aGUgZGF0YSBmcm9tIGVpdGhlciBtYW51YWwgZGF0YSBvciBzb3J0ZWQgZGF0YVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc29ydGVkRGF0YTogbWFudWFsXG4gICAgICAgICAgPyByZXNvbHZlZERhdGFcbiAgICAgICAgICA6IHRoaXMuc29ydERhdGEoXG4gICAgICAgICAgICB0aGlzLmZpbHRlckRhdGEocmVzb2x2ZWREYXRhLCBmaWx0ZXJlZCwgZGVmYXVsdEZpbHRlck1ldGhvZCwgYWxsVmlzaWJsZUNvbHVtbnMpLFxuICAgICAgICAgICAgc29ydGVkLFxuICAgICAgICAgICAgc29ydE1ldGhvZHNCeUNvbHVtbklEXG4gICAgICAgICAgKSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmaXJlRmV0Y2hEYXRhICgpIHtcbiAgICAgIHRoaXMucHJvcHMub25GZXRjaERhdGEodGhpcy5nZXRSZXNvbHZlZFN0YXRlKCksIHRoaXMpXG4gICAgfVxuXG4gICAgZ2V0UHJvcE9yU3RhdGUgKGtleSkge1xuICAgICAgcmV0dXJuIF8uZ2V0Rmlyc3REZWZpbmVkKHRoaXMucHJvcHNba2V5XSwgdGhpcy5zdGF0ZVtrZXldKVxuICAgIH1cblxuICAgIGdldFN0YXRlT3JQcm9wIChrZXkpIHtcbiAgICAgIHJldHVybiBfLmdldEZpcnN0RGVmaW5lZCh0aGlzLnN0YXRlW2tleV0sIHRoaXMucHJvcHNba2V5XSlcbiAgICB9XG5cbiAgICBmaWx0ZXJEYXRhIChkYXRhLCBmaWx0ZXJlZCwgZGVmYXVsdEZpbHRlck1ldGhvZCwgYWxsVmlzaWJsZUNvbHVtbnMpIHtcbiAgICAgIGxldCBmaWx0ZXJlZERhdGEgPSBkYXRhXG5cbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHtcbiAgICAgICAgZmlsdGVyZWREYXRhID0gZmlsdGVyZWQucmVkdWNlKChmaWx0ZXJlZFNvRmFyLCBuZXh0RmlsdGVyKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29sdW1uID0gYWxsVmlzaWJsZUNvbHVtbnMuZmluZCh4ID0+IHguaWQgPT09IG5leHRGaWx0ZXIuaWQpXG5cbiAgICAgICAgICAvLyBEb24ndCBmaWx0ZXIgaGlkZGVuIGNvbHVtbnMgb3IgY29sdW1ucyB0aGF0IGhhdmUgaGFkIHRoZWlyIGZpbHRlcnMgZGlzYWJsZWRcbiAgICAgICAgICBpZiAoIWNvbHVtbiB8fCBjb2x1bW4uZmlsdGVyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZFNvRmFyXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZmlsdGVyTWV0aG9kID0gY29sdW1uLmZpbHRlck1ldGhvZCB8fCBkZWZhdWx0RmlsdGVyTWV0aG9kXG5cbiAgICAgICAgICAvLyBJZiAnZmlsdGVyQWxsJyBpcyBzZXQgdG8gdHJ1ZSwgcGFzcyB0aGUgZW50aXJlIGRhdGFzZXQgdG8gdGhlIGZpbHRlciBtZXRob2RcbiAgICAgICAgICBpZiAoY29sdW1uLmZpbHRlckFsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlck1ldGhvZChuZXh0RmlsdGVyLCBmaWx0ZXJlZFNvRmFyLCBjb2x1bW4pXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmaWx0ZXJlZFNvRmFyLmZpbHRlcihyb3cgPT4gZmlsdGVyTWV0aG9kKG5leHRGaWx0ZXIsIHJvdywgY29sdW1uKSlcbiAgICAgICAgfSwgZmlsdGVyZWREYXRhKVxuXG4gICAgICAgIC8vIEFwcGx5IHRoZSBmaWx0ZXIgdG8gdGhlIHN1YnJvd3MgaWYgd2UgYXJlIHBpdm90aW5nLCBhbmQgdGhlblxuICAgICAgICAvLyBmaWx0ZXIgYW55IHJvd3Mgd2l0aG91dCBzdWJjb2x1bW5zIGJlY2F1c2UgaXQgd291bGQgYmUgc3RyYW5nZSB0byBzaG93XG4gICAgICAgIGZpbHRlcmVkRGF0YSA9IGZpbHRlcmVkRGF0YVxuICAgICAgICAgIC5tYXAocm93ID0+IHtcbiAgICAgICAgICAgIGlmICghcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJvd1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4ucm93LFxuICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XTogdGhpcy5maWx0ZXJEYXRhKFxuICAgICAgICAgICAgICAgIHJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldLFxuICAgICAgICAgICAgICAgIGZpbHRlcmVkLFxuICAgICAgICAgICAgICAgIGRlZmF1bHRGaWx0ZXJNZXRob2QsXG4gICAgICAgICAgICAgICAgYWxsVmlzaWJsZUNvbHVtbnNcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5maWx0ZXIocm93ID0+IHtcbiAgICAgICAgICAgIGlmICghcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XS5sZW5ndGggPiAwXG4gICAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZpbHRlcmVkRGF0YVxuICAgIH1cblxuICAgIHNvcnREYXRhIChkYXRhLCBzb3J0ZWQsIHNvcnRNZXRob2RzQnlDb2x1bW5JRCA9IHt9KSB7XG4gICAgICBpZiAoIXNvcnRlZC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGRhdGFcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc29ydGVkRGF0YSA9ICh0aGlzLnByb3BzLm9yZGVyQnlNZXRob2QgfHwgXy5vcmRlckJ5KShcbiAgICAgICAgZGF0YSxcbiAgICAgICAgc29ydGVkLm1hcChzb3J0ID0+IHtcbiAgICAgICAgICAvLyBTdXBwb3J0IGN1c3RvbSBzb3J0aW5nIG1ldGhvZHMgZm9yIGVhY2ggY29sdW1uXG4gICAgICAgICAgaWYgKHNvcnRNZXRob2RzQnlDb2x1bW5JRFtzb3J0LmlkXSkge1xuICAgICAgICAgICAgcmV0dXJuIChhLCBiKSA9PiBzb3J0TWV0aG9kc0J5Q29sdW1uSURbc29ydC5pZF0oYVtzb3J0LmlkXSwgYltzb3J0LmlkXSwgc29ydC5kZXNjKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKGEsIGIpID0+IHRoaXMucHJvcHMuZGVmYXVsdFNvcnRNZXRob2QoYVtzb3J0LmlkXSwgYltzb3J0LmlkXSwgc29ydC5kZXNjKVxuICAgICAgICB9KSxcbiAgICAgICAgc29ydGVkLm1hcChkID0+ICFkLmRlc2MpLFxuICAgICAgICB0aGlzLnByb3BzLmluZGV4S2V5XG4gICAgICApXG5cbiAgICAgIHNvcnRlZERhdGEuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICBpZiAoIXJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0gPSB0aGlzLnNvcnREYXRhKFxuICAgICAgICAgIHJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldLFxuICAgICAgICAgIHNvcnRlZCxcbiAgICAgICAgICBzb3J0TWV0aG9kc0J5Q29sdW1uSURcbiAgICAgICAgKVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIHNvcnRlZERhdGFcbiAgICB9XG5cbiAgICBnZXRNaW5Sb3dzICgpIHtcbiAgICAgIHJldHVybiBfLmdldEZpcnN0RGVmaW5lZCh0aGlzLnByb3BzLm1pblJvd3MsIHRoaXMuZ2V0U3RhdGVPclByb3AoJ3BhZ2VTaXplJykpXG4gICAgfVxuXG4gICAgLy8gVXNlciBhY3Rpb25zXG4gICAgb25QYWdlQ2hhbmdlIChwYWdlKSB7XG4gICAgICBjb25zdCB7b25QYWdlQ2hhbmdlLCBjb2xsYXBzZU9uUGFnZUNoYW5nZX0gPSB0aGlzLnByb3BzXG5cbiAgICAgIGNvbnN0IG5ld1N0YXRlID0ge3BhZ2V9XG4gICAgICBpZiAoY29sbGFwc2VPblBhZ2VDaGFuZ2UpIHtcbiAgICAgICAgbmV3U3RhdGUuZXhwYW5kZWQgPSB7fVxuICAgICAgfVxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKG5ld1N0YXRlLCAoKSA9PiBvblBhZ2VDaGFuZ2UgJiYgb25QYWdlQ2hhbmdlKHBhZ2UpKVxuICAgIH1cblxuICAgIG9uUGFnZVNpemVDaGFuZ2UgKG5ld1BhZ2VTaXplKSB7XG4gICAgICBjb25zdCB7b25QYWdlU2l6ZUNoYW5nZX0gPSB0aGlzLnByb3BzXG4gICAgICBjb25zdCB7cGFnZVNpemUsIHBhZ2V9ID0gdGhpcy5nZXRSZXNvbHZlZFN0YXRlKClcblxuICAgICAgLy8gTm9ybWFsaXplIHRoZSBwYWdlIHRvIGRpc3BsYXlcbiAgICAgIGNvbnN0IGN1cnJlbnRSb3cgPSBwYWdlU2l6ZSAqIHBhZ2VcbiAgICAgIGNvbnN0IG5ld1BhZ2UgPSBNYXRoLmZsb29yKGN1cnJlbnRSb3cgLyBuZXdQYWdlU2l6ZSlcblxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKFxuICAgICAgICB7XG4gICAgICAgICAgcGFnZVNpemU6IG5ld1BhZ2VTaXplLFxuICAgICAgICAgIHBhZ2U6IG5ld1BhZ2UsXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IG9uUGFnZVNpemVDaGFuZ2UgJiYgb25QYWdlU2l6ZUNoYW5nZShuZXdQYWdlU2l6ZSwgbmV3UGFnZSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBzb3J0Q29sdW1uIChjb2x1bW4sIGFkZGl0aXZlKSB7XG4gICAgICBjb25zdCB7c29ydGVkLCBza2lwTmV4dFNvcnQsIGRlZmF1bHRTb3J0RGVzY30gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxuXG4gICAgICBjb25zdCBmaXJzdFNvcnREaXJlY3Rpb24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29sdW1uLCAnZGVmYXVsdFNvcnREZXNjJylcbiAgICAgICAgPyBjb2x1bW4uZGVmYXVsdFNvcnREZXNjXG4gICAgICAgIDogZGVmYXVsdFNvcnREZXNjXG4gICAgICBjb25zdCBzZWNvbmRTb3J0RGlyZWN0aW9uID0gIWZpcnN0U29ydERpcmVjdGlvblxuXG4gICAgICAvLyB3ZSBjYW4ndCBzdG9wIGV2ZW50IHByb3BhZ2F0aW9uIGZyb20gdGhlIGNvbHVtbiByZXNpemUgbW92ZSBoYW5kbGVyc1xuICAgICAgLy8gYXR0YWNoZWQgdG8gdGhlIGRvY3VtZW50IGJlY2F1c2Ugb2YgcmVhY3QncyBzeW50aGV0aWMgZXZlbnRzXG4gICAgICAvLyBzbyB3ZSBoYXZlIHRvIHByZXZlbnQgdGhlIHNvcnQgZnVuY3Rpb24gZnJvbSBhY3R1YWxseSBzb3J0aW5nXG4gICAgICAvLyBpZiB3ZSBjbGljayBvbiB0aGUgY29sdW1uIHJlc2l6ZSBlbGVtZW50IHdpdGhpbiBhIGhlYWRlci5cbiAgICAgIGlmIChza2lwTmV4dFNvcnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKHtcbiAgICAgICAgICBza2lwTmV4dFNvcnQ6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3Qge29uU29ydGVkQ2hhbmdlfSA9IHRoaXMucHJvcHNcblxuICAgICAgbGV0IG5ld1NvcnRlZCA9IF8uY2xvbmUoc29ydGVkIHx8IFtdKS5tYXAoZCA9PiB7XG4gICAgICAgIGQuZGVzYyA9IF8uaXNTb3J0aW5nRGVzYyhkKVxuICAgICAgICByZXR1cm4gZFxuICAgICAgfSlcbiAgICAgIGlmICghXy5pc0FycmF5KGNvbHVtbikpIHtcbiAgICAgICAgLy8gU2luZ2xlLVNvcnRcbiAgICAgICAgY29uc3QgZXhpc3RpbmdJbmRleCA9IG5ld1NvcnRlZC5maW5kSW5kZXgoZCA9PiBkLmlkID09PSBjb2x1bW4uaWQpXG4gICAgICAgIGlmIChleGlzdGluZ0luZGV4ID4gLTEpIHtcbiAgICAgICAgICBjb25zdCBleGlzdGluZyA9IG5ld1NvcnRlZFtleGlzdGluZ0luZGV4XVxuICAgICAgICAgIGlmIChleGlzdGluZy5kZXNjID09PSBzZWNvbmRTb3J0RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoYWRkaXRpdmUpIHtcbiAgICAgICAgICAgICAgbmV3U29ydGVkLnNwbGljZShleGlzdGluZ0luZGV4LCAxKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXhpc3RpbmcuZGVzYyA9IGZpcnN0U29ydERpcmVjdGlvblxuICAgICAgICAgICAgICBuZXdTb3J0ZWQgPSBbZXhpc3RpbmddXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4aXN0aW5nLmRlc2MgPSBzZWNvbmRTb3J0RGlyZWN0aW9uXG4gICAgICAgICAgICBpZiAoIWFkZGl0aXZlKSB7XG4gICAgICAgICAgICAgIG5ld1NvcnRlZCA9IFtleGlzdGluZ11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoYWRkaXRpdmUpIHtcbiAgICAgICAgICBuZXdTb3J0ZWQucHVzaCh7XG4gICAgICAgICAgICBpZDogY29sdW1uLmlkLFxuICAgICAgICAgICAgZGVzYzogZmlyc3RTb3J0RGlyZWN0aW9uLFxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3U29ydGVkID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogY29sdW1uLmlkLFxuICAgICAgICAgICAgICBkZXNjOiBmaXJzdFNvcnREaXJlY3Rpb24sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTXVsdGktU29ydFxuICAgICAgICBjb25zdCBleGlzdGluZ0luZGV4ID0gbmV3U29ydGVkLmZpbmRJbmRleChkID0+IGQuaWQgPT09IGNvbHVtblswXS5pZClcbiAgICAgICAgLy8gRXhpc3RpbmcgU29ydGVkIENvbHVtblxuICAgICAgICBpZiAoZXhpc3RpbmdJbmRleCA+IC0xKSB7XG4gICAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBuZXdTb3J0ZWRbZXhpc3RpbmdJbmRleF1cbiAgICAgICAgICBpZiAoZXhpc3RpbmcuZGVzYyA9PT0gc2Vjb25kU29ydERpcmVjdGlvbikge1xuICAgICAgICAgICAgaWYgKGFkZGl0aXZlKSB7XG4gICAgICAgICAgICAgIG5ld1NvcnRlZC5zcGxpY2UoZXhpc3RpbmdJbmRleCwgY29sdW1uLmxlbmd0aClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbHVtbi5mb3JFYWNoKChkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3U29ydGVkW2V4aXN0aW5nSW5kZXggKyBpXS5kZXNjID0gZmlyc3RTb3J0RGlyZWN0aW9uXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbHVtbi5mb3JFYWNoKChkLCBpKSA9PiB7XG4gICAgICAgICAgICAgIG5ld1NvcnRlZFtleGlzdGluZ0luZGV4ICsgaV0uZGVzYyA9IHNlY29uZFNvcnREaXJlY3Rpb25cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghYWRkaXRpdmUpIHtcbiAgICAgICAgICAgIG5ld1NvcnRlZCA9IG5ld1NvcnRlZC5zbGljZShleGlzdGluZ0luZGV4LCBjb2x1bW4ubGVuZ3RoKVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBOZXcgU29ydCBDb2x1bW5cbiAgICAgICAgfSBlbHNlIGlmIChhZGRpdGl2ZSkge1xuICAgICAgICAgIG5ld1NvcnRlZCA9IG5ld1NvcnRlZC5jb25jYXQoXG4gICAgICAgICAgICBjb2x1bW4ubWFwKGQgPT4gKHtcbiAgICAgICAgICAgICAgaWQ6IGQuaWQsXG4gICAgICAgICAgICAgIGRlc2M6IGZpcnN0U29ydERpcmVjdGlvbixcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgIClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdTb3J0ZWQgPSBjb2x1bW4ubWFwKGQgPT4gKHtcbiAgICAgICAgICAgIGlkOiBkLmlkLFxuICAgICAgICAgICAgZGVzYzogZmlyc3RTb3J0RGlyZWN0aW9uLFxuICAgICAgICAgIH0pKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2U6ICghc29ydGVkLmxlbmd0aCAmJiBuZXdTb3J0ZWQubGVuZ3RoKSB8fCAhYWRkaXRpdmUgPyAwIDogdGhpcy5zdGF0ZS5wYWdlLFxuICAgICAgICAgIHNvcnRlZDogbmV3U29ydGVkLFxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiBvblNvcnRlZENoYW5nZSAmJiBvblNvcnRlZENoYW5nZShuZXdTb3J0ZWQsIGNvbHVtbiwgYWRkaXRpdmUpXG4gICAgICApXG4gICAgfVxuXG4gICAgZmlsdGVyQ29sdW1uIChjb2x1bW4sIHZhbHVlKSB7XG4gICAgICBjb25zdCB7ZmlsdGVyZWR9ID0gdGhpcy5nZXRSZXNvbHZlZFN0YXRlKClcbiAgICAgIGNvbnN0IHtvbkZpbHRlcmVkQ2hhbmdlfSA9IHRoaXMucHJvcHNcblxuICAgICAgLy8gUmVtb3ZlIG9sZCBmaWx0ZXIgZmlyc3QgaWYgaXQgZXhpc3RzXG4gICAgICBjb25zdCBuZXdGaWx0ZXJpbmcgPSAoZmlsdGVyZWQgfHwgW10pLmZpbHRlcih4ID0+IHguaWQgIT09IGNvbHVtbi5pZClcblxuICAgICAgaWYgKHZhbHVlICE9PSAnJykge1xuICAgICAgICBuZXdGaWx0ZXJpbmcucHVzaCh7XG4gICAgICAgICAgaWQ6IGNvbHVtbi5pZCxcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKFxuICAgICAgICB7XG4gICAgICAgICAgZmlsdGVyZWQ6IG5ld0ZpbHRlcmluZyxcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4gb25GaWx0ZXJlZENoYW5nZSAmJiBvbkZpbHRlcmVkQ2hhbmdlKG5ld0ZpbHRlcmluZywgY29sdW1uLCB2YWx1ZSlcbiAgICAgIClcbiAgICB9XG5cbiAgICByZXNpemVDb2x1bW5TdGFydCAoZXZlbnQsIGNvbHVtbiwgaXNUb3VjaCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGNvbnN0IHBhcmVudFdpZHRoID0gZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcblxuICAgICAgbGV0IHBhZ2VYXG4gICAgICBpZiAoaXNUb3VjaCkge1xuICAgICAgICBwYWdlWCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYWdlWCA9IGV2ZW50LnBhZ2VYXG4gICAgICB9XG5cbiAgICAgIHRoaXMudHJhcEV2ZW50cyA9IHRydWVcbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcbiAgICAgICAge1xuICAgICAgICAgIGN1cnJlbnRseVJlc2l6aW5nOiB7XG4gICAgICAgICAgICBpZDogY29sdW1uLmlkLFxuICAgICAgICAgICAgc3RhcnRYOiBwYWdlWCxcbiAgICAgICAgICAgIHBhcmVudFdpZHRoLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAoaXNUb3VjaCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcpXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcpXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgcmVzaXplQ29sdW1uTW92aW5nIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGNvbnN0IHtvblJlc2l6ZWRDaGFuZ2V9ID0gdGhpcy5wcm9wc1xuICAgICAgY29uc3Qge3Jlc2l6ZWQsIGN1cnJlbnRseVJlc2l6aW5nfSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXG5cbiAgICAgIC8vIERlbGV0ZSBvbGQgdmFsdWVcbiAgICAgIGNvbnN0IG5ld1Jlc2l6ZWQgPSByZXNpemVkLmZpbHRlcih4ID0+IHguaWQgIT09IGN1cnJlbnRseVJlc2l6aW5nLmlkKVxuXG4gICAgICBsZXQgcGFnZVhcblxuICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICd0b3VjaG1vdmUnKSB7XG4gICAgICAgIHBhZ2VYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVhcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gJ21vdXNlbW92ZScpIHtcbiAgICAgICAgcGFnZVggPSBldmVudC5wYWdlWFxuICAgICAgfVxuXG4gICAgICAvLyBTZXQgdGhlIG1pbiBzaXplIHRvIDEwIHRvIGFjY291bnQgZm9yIG1hcmdpbiBhbmQgYm9yZGVyIG9yIGVsc2UgdGhlXG4gICAgICAvLyBncm91cCBoZWFkZXJzIGRvbid0IGxpbmUgdXAgY29ycmVjdGx5XG4gICAgICBjb25zdCBuZXdXaWR0aCA9IE1hdGgubWF4KFxuICAgICAgICBjdXJyZW50bHlSZXNpemluZy5wYXJlbnRXaWR0aCArIHBhZ2VYIC0gY3VycmVudGx5UmVzaXppbmcuc3RhcnRYLFxuICAgICAgICAxMVxuICAgICAgKVxuXG4gICAgICBuZXdSZXNpemVkLnB1c2goe1xuICAgICAgICBpZDogY3VycmVudGx5UmVzaXppbmcuaWQsXG4gICAgICAgIHZhbHVlOiBuZXdXaWR0aCxcbiAgICAgIH0pXG5cbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcbiAgICAgICAge1xuICAgICAgICAgIHJlc2l6ZWQ6IG5ld1Jlc2l6ZWQsXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IG9uUmVzaXplZENoYW5nZSAmJiBvblJlc2l6ZWRDaGFuZ2UobmV3UmVzaXplZCwgZXZlbnQpXG4gICAgICApXG4gICAgfVxuXG4gICAgcmVzaXplQ29sdW1uRW5kIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGNvbnN0IGlzVG91Y2ggPSBldmVudC50eXBlID09PSAndG91Y2hlbmQnIHx8IGV2ZW50LnR5cGUgPT09ICd0b3VjaGNhbmNlbCdcblxuICAgICAgaWYgKGlzVG91Y2gpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcpXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICB9XG5cbiAgICAgIC8vIElmIGl0cyBhIHRvdWNoIGV2ZW50IGNsZWFyIHRoZSBtb3VzZSBvbmUncyBhcyB3ZWxsIGJlY2F1c2Ugc29tZXRpbWVzXG4gICAgICAvLyB0aGUgbW91c2VEb3duIGV2ZW50IGdldHMgY2FsbGVkIGFzIHdlbGwsIGJ1dCB0aGUgbW91c2VVcCBldmVudCBkb2Vzbid0XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbk1vdmluZylcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcblxuICAgICAgLy8gVGhlIHRvdWNoIGV2ZW50cyBkb24ndCBwcm9wYWdhdGUgdXAgdG8gdGhlIHNvcnRpbmcncyBvbk1vdXNlRG93biBldmVudCBzb1xuICAgICAgLy8gbm8gbmVlZCB0byBwcmV2ZW50IGl0IGZyb20gaGFwcGVuaW5nIG9yIGVsc2UgdGhlIGZpcnN0IGNsaWNrIGFmdGVyIGEgdG91Y2hcbiAgICAgIC8vIGV2ZW50IHJlc2l6ZSB3aWxsIG5vdCBzb3J0IHRoZSBjb2x1bW4uXG4gICAgICBpZiAoIWlzVG91Y2gpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKHtcbiAgICAgICAgICBza2lwTmV4dFNvcnQ6IHRydWUsXG4gICAgICAgICAgY3VycmVudGx5UmVzaXppbmc6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19