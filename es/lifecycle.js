var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import pick from 'lodash.pick';
import omit from 'lodash.omit';

export default (function (Base) {
  return function (_Base) {
    _inherits(_class, _Base);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.setStateWithData(this.getDataModel(this.getResolvedState()));
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.fireFetchData();
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps, nextState) {
        var infiniteProps = ['preloadBatchSize', 'preloadAdditionalHeight', 'styles', 'infiniteComputer', 'dataLength', 'displayIndexStart', 'displayIndexEnd', 'elementHeight', 'containerHeight'];

        var oldState = this.getResolvedState();
        var newState = omit(this.getResolvedState(nextProps, nextState), infiniteProps);
        var nextInfiniteState = pick(this.recomputeInfiniteStateFromProps(nextProps), infiniteProps); //
        this.infiniteProps = this.recomputeInfiniteStateFromProps(nextProps).infiniteProps; //
        this.setState(nextInfiniteState); //

        // Do a deep compare of new and old `defaultOption` and
        // if they are different reset `option = defaultOption`
        var defaultableOptions = ['sorted', 'filtered', 'resized', 'expanded'];
        defaultableOptions.forEach(function (x) {
          var defaultName = 'default' + (x.charAt(0).toUpperCase() + x.slice(1));
          if (JSON.stringify(oldState[defaultName]) !== JSON.stringify(newState[defaultName])) {
            newState[x] = newState[defaultName];
          }
        });

        // If they change these table options, we need to reset defaults
        // or else we could get into a state where the user has changed the UI
        // and then disabled the ability to change it back.
        // e.g. If `filterable` has changed, set `filtered = defaultFiltered`
        var resettableOptions = ['sortable', 'filterable', 'resizable'];
        resettableOptions.forEach(function (x) {
          if (oldState[x] !== newState[x]) {
            var baseName = x.replace('able', '');
            var optionName = baseName + 'ed';
            var defaultName = 'default' + (optionName.charAt(0).toUpperCase() + optionName.slice(1));
            newState[optionName] = newState[defaultName];
          }
        });

        // Props that trigger a data update
        if (oldState.data !== newState.data || oldState.columns !== newState.columns || oldState.pivotBy !== newState.pivotBy || oldState.sorted !== newState.sorted || oldState.filtered !== newState.filtered) {
          this.setStateWithData(this.getDataModel(newState));
        }
        this.setState(newState, function () {
          console.log('QQ');
        }); //
      }
    }, {
      key: 'setStateWithData',
      value: function setStateWithData(newState, cb) {
        var _this2 = this;

        var oldState = this.getResolvedState();
        var newResolvedState = this.getResolvedState({}, newState);
        var freezeWhenExpanded = newResolvedState.freezeWhenExpanded;

        // Default to unfrozen state

        newResolvedState.frozen = false;

        // If freezeWhenExpanded is set, check for frozen conditions
        if (freezeWhenExpanded) {
          // if any rows are expanded, freeze the existing data and sorting
          var keys = Object.keys(newResolvedState.expanded);
          for (var i = 0; i < keys.length; i += 1) {
            if (newResolvedState.expanded[keys[i]]) {
              newResolvedState.frozen = true;
              break;
            }
          }
        }

        // If the data isn't frozen and either the data or
        // sorting model has changed, update the data
        if (oldState.frozen && !newResolvedState.frozen || oldState.sorted !== newResolvedState.sorted || oldState.filtered !== newResolvedState.filtered || oldState.showFilters !== newResolvedState.showFilters || !newResolvedState.frozen && oldState.resolvedData !== newResolvedState.resolvedData) {
          // Handle collapseOnsortedChange & collapseOnDataChange
          if (oldState.sorted !== newResolvedState.sorted && this.props.collapseOnSortingChange || oldState.filtered !== newResolvedState.filtered || oldState.showFilters !== newResolvedState.showFilters || oldState.sortedData && !newResolvedState.frozen && oldState.resolvedData !== newResolvedState.resolvedData && this.props.collapseOnDataChange) {
            newResolvedState.expanded = {};
          }

          Object.assign(newResolvedState, this.getSortedData(newResolvedState));
        }

        // Set page to 0 if filters change
        if (oldState.filtered !== newResolvedState.filtered) {
          newResolvedState.page = 0;
        }

        // Calculate pageSize all the time
        if (newResolvedState.sortedData) {
          newResolvedState.pages = newResolvedState.manual ? newResolvedState.pages : Math.ceil(newResolvedState.sortedData.length / newResolvedState.pageSize);
          newResolvedState.page = Math.max(newResolvedState.page >= newResolvedState.pages ? newResolvedState.pages - 1 : newResolvedState.page, 0);
        }

        return this.setState(newResolvedState, function () {
          if (cb) {
            cb();
          }
          if (oldState.page !== newResolvedState.page || oldState.pageSize !== newResolvedState.pageSize || oldState.sorted !== newResolvedState.sorted || oldState.filtered !== newResolvedState.filtered) {
            _this2.fireFetchData();
          }
        });
      }
    }]);

    return _class;
  }(Base);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saWZlY3ljbGUuanMiXSwibmFtZXMiOlsicGljayIsIm9taXQiLCJzZXRTdGF0ZVdpdGhEYXRhIiwiZ2V0RGF0YU1vZGVsIiwiZ2V0UmVzb2x2ZWRTdGF0ZSIsImZpcmVGZXRjaERhdGEiLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJpbmZpbml0ZVByb3BzIiwib2xkU3RhdGUiLCJuZXdTdGF0ZSIsIm5leHRJbmZpbml0ZVN0YXRlIiwicmVjb21wdXRlSW5maW5pdGVTdGF0ZUZyb21Qcm9wcyIsInNldFN0YXRlIiwiZGVmYXVsdGFibGVPcHRpb25zIiwiZm9yRWFjaCIsImRlZmF1bHROYW1lIiwieCIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzZXR0YWJsZU9wdGlvbnMiLCJiYXNlTmFtZSIsInJlcGxhY2UiLCJvcHRpb25OYW1lIiwiZGF0YSIsImNvbHVtbnMiLCJwaXZvdEJ5Iiwic29ydGVkIiwiZmlsdGVyZWQiLCJjb25zb2xlIiwibG9nIiwiY2IiLCJuZXdSZXNvbHZlZFN0YXRlIiwiZnJlZXplV2hlbkV4cGFuZGVkIiwiZnJvemVuIiwia2V5cyIsIk9iamVjdCIsImV4cGFuZGVkIiwiaSIsImxlbmd0aCIsInNob3dGaWx0ZXJzIiwicmVzb2x2ZWREYXRhIiwicHJvcHMiLCJjb2xsYXBzZU9uU29ydGluZ0NoYW5nZSIsInNvcnRlZERhdGEiLCJjb2xsYXBzZU9uRGF0YUNoYW5nZSIsImFzc2lnbiIsImdldFNvcnRlZERhdGEiLCJwYWdlIiwicGFnZXMiLCJtYW51YWwiLCJNYXRoIiwiY2VpbCIsInBhZ2VTaXplIiwibWF4IiwiQmFzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxPQUFPQSxJQUFQLE1BQWlCLGFBQWpCO0FBQ0EsT0FBT0MsSUFBUCxNQUFpQixhQUFqQjs7QUFFQSxnQkFBZTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSwyQ0FFVztBQUNwQixhQUFLQyxnQkFBTCxDQUFzQixLQUFLQyxZQUFMLENBQWtCLEtBQUtDLGdCQUFMLEVBQWxCLENBQXRCO0FBQ0Q7QUFKVTtBQUFBO0FBQUEsMENBTVU7QUFDbkIsYUFBS0MsYUFBTDtBQUNEO0FBUlU7QUFBQTtBQUFBLGdEQVVnQkMsU0FWaEIsRUFVMkJDLFNBVjNCLEVBVXNDO0FBQy9DLFlBQU1DLGdCQUFnQixDQUNwQixrQkFEb0IsRUFFcEIseUJBRm9CLEVBR3BCLFFBSG9CLEVBSXBCLGtCQUpvQixFQUtwQixZQUxvQixFQU1wQixtQkFOb0IsRUFPcEIsaUJBUG9CLEVBUXBCLGVBUm9CLEVBU3BCLGlCQVRvQixDQUF0Qjs7QUFZQSxZQUFNQyxXQUFXLEtBQUtMLGdCQUFMLEVBQWpCO0FBQ0EsWUFBTU0sV0FBV1QsS0FBSyxLQUFLRyxnQkFBTCxDQUFzQkUsU0FBdEIsRUFBaUNDLFNBQWpDLENBQUwsRUFBa0RDLGFBQWxELENBQWpCO0FBQ0EsWUFBSUcsb0JBQW9CWCxLQUN0QixLQUFLWSwrQkFBTCxDQUFxQ04sU0FBckMsQ0FEc0IsRUFFdEJFLGFBRnNCLENBQXhCLENBZitDLENBa0I3QztBQUNGLGFBQUtBLGFBQUwsR0FBcUIsS0FBS0ksK0JBQUwsQ0FBcUNOLFNBQXJDLEVBQWdERSxhQUFyRSxDQW5CK0MsQ0FtQm9DO0FBQ25GLGFBQUtLLFFBQUwsQ0FBY0YsaUJBQWQsRUFwQitDLENBb0JkOztBQUVqQztBQUNBO0FBQ0EsWUFBTUcscUJBQXFCLENBQUMsUUFBRCxFQUFXLFVBQVgsRUFBdUIsU0FBdkIsRUFBa0MsVUFBbEMsQ0FBM0I7QUFDQUEsMkJBQW1CQyxPQUFuQixDQUEyQixhQUFLO0FBQzlCLGNBQU1DLDJCQUF3QkMsRUFBRUMsTUFBRixDQUFTLENBQVQsRUFBWUMsV0FBWixLQUE0QkYsRUFBRUcsS0FBRixDQUFRLENBQVIsQ0FBcEQsQ0FBTjtBQUNBLGNBQUlDLEtBQUtDLFNBQUwsQ0FBZWIsU0FBU08sV0FBVCxDQUFmLE1BQTBDSyxLQUFLQyxTQUFMLENBQWVaLFNBQVNNLFdBQVQsQ0FBZixDQUE5QyxFQUFxRjtBQUNuRk4scUJBQVNPLENBQVQsSUFBY1AsU0FBU00sV0FBVCxDQUFkO0FBQ0Q7QUFDRixTQUxEOztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBTU8sb0JBQW9CLENBQUMsVUFBRCxFQUFhLFlBQWIsRUFBMkIsV0FBM0IsQ0FBMUI7QUFDQUEsMEJBQWtCUixPQUFsQixDQUEwQixhQUFLO0FBQzdCLGNBQUlOLFNBQVNRLENBQVQsTUFBZ0JQLFNBQVNPLENBQVQsQ0FBcEIsRUFBaUM7QUFDL0IsZ0JBQU1PLFdBQVdQLEVBQUVRLE9BQUYsQ0FBVSxNQUFWLEVBQWtCLEVBQWxCLENBQWpCO0FBQ0EsZ0JBQU1DLGFBQWdCRixRQUFoQixPQUFOO0FBQ0EsZ0JBQU1SLDJCQUF3QlUsV0FBV1IsTUFBWCxDQUFrQixDQUFsQixFQUFxQkMsV0FBckIsS0FBcUNPLFdBQVdOLEtBQVgsQ0FBaUIsQ0FBakIsQ0FBN0QsQ0FBTjtBQUNBVixxQkFBU2dCLFVBQVQsSUFBdUJoQixTQUFTTSxXQUFULENBQXZCO0FBQ0Q7QUFDRixTQVBEOztBQVNBO0FBQ0EsWUFDRVAsU0FBU2tCLElBQVQsS0FBa0JqQixTQUFTaUIsSUFBM0IsSUFDQWxCLFNBQVNtQixPQUFULEtBQXFCbEIsU0FBU2tCLE9BRDlCLElBRUFuQixTQUFTb0IsT0FBVCxLQUFxQm5CLFNBQVNtQixPQUY5QixJQUdBcEIsU0FBU3FCLE1BQVQsS0FBb0JwQixTQUFTb0IsTUFIN0IsSUFJQXJCLFNBQVNzQixRQUFULEtBQXNCckIsU0FBU3FCLFFBTGpDLEVBTUU7QUFDQSxlQUFLN0IsZ0JBQUwsQ0FBc0IsS0FBS0MsWUFBTCxDQUFrQk8sUUFBbEIsQ0FBdEI7QUFDRDtBQUNELGFBQUtHLFFBQUwsQ0FBY0gsUUFBZCxFQUF3QixZQUFNO0FBQUVzQixrQkFBUUMsR0FBUixDQUFZLElBQVo7QUFBbUIsU0FBbkQsRUF4RCtDLENBd0RNO0FBQ3REO0FBbkVVO0FBQUE7QUFBQSx1Q0FxRU92QixRQXJFUCxFQXFFaUJ3QixFQXJFakIsRUFxRXFCO0FBQUE7O0FBQzlCLFlBQU16QixXQUFXLEtBQUtMLGdCQUFMLEVBQWpCO0FBQ0EsWUFBTStCLG1CQUFtQixLQUFLL0IsZ0JBQUwsQ0FBc0IsRUFBdEIsRUFBMEJNLFFBQTFCLENBQXpCO0FBRjhCLFlBR3RCMEIsa0JBSHNCLEdBR0NELGdCQUhELENBR3RCQyxrQkFIc0I7O0FBSzlCOztBQUNBRCx5QkFBaUJFLE1BQWpCLEdBQTBCLEtBQTFCOztBQUVBO0FBQ0EsWUFBSUQsa0JBQUosRUFBd0I7QUFDdEI7QUFDQSxjQUFNRSxPQUFPQyxPQUFPRCxJQUFQLENBQVlILGlCQUFpQkssUUFBN0IsQ0FBYjtBQUNBLGVBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxLQUFLSSxNQUF6QixFQUFpQ0QsS0FBSyxDQUF0QyxFQUF5QztBQUN2QyxnQkFBSU4saUJBQWlCSyxRQUFqQixDQUEwQkYsS0FBS0csQ0FBTCxDQUExQixDQUFKLEVBQXdDO0FBQ3RDTiwrQkFBaUJFLE1BQWpCLEdBQTBCLElBQTFCO0FBQ0E7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQ7QUFDQTtBQUNBLFlBQ0c1QixTQUFTNEIsTUFBVCxJQUFtQixDQUFDRixpQkFBaUJFLE1BQXRDLElBQ0E1QixTQUFTcUIsTUFBVCxLQUFvQkssaUJBQWlCTCxNQURyQyxJQUVBckIsU0FBU3NCLFFBQVQsS0FBc0JJLGlCQUFpQkosUUFGdkMsSUFHQXRCLFNBQVNrQyxXQUFULEtBQXlCUixpQkFBaUJRLFdBSDFDLElBSUMsQ0FBQ1IsaUJBQWlCRSxNQUFsQixJQUE0QjVCLFNBQVNtQyxZQUFULEtBQTBCVCxpQkFBaUJTLFlBTDFFLEVBTUU7QUFDQTtBQUNBLGNBQ0duQyxTQUFTcUIsTUFBVCxLQUFvQkssaUJBQWlCTCxNQUFyQyxJQUErQyxLQUFLZSxLQUFMLENBQVdDLHVCQUEzRCxJQUNBckMsU0FBU3NCLFFBQVQsS0FBc0JJLGlCQUFpQkosUUFEdkMsSUFFQXRCLFNBQVNrQyxXQUFULEtBQXlCUixpQkFBaUJRLFdBRjFDLElBR0NsQyxTQUFTc0MsVUFBVCxJQUNDLENBQUNaLGlCQUFpQkUsTUFEbkIsSUFFQzVCLFNBQVNtQyxZQUFULEtBQTBCVCxpQkFBaUJTLFlBRjVDLElBR0MsS0FBS0MsS0FBTCxDQUFXRyxvQkFQZixFQVFFO0FBQ0FiLDZCQUFpQkssUUFBakIsR0FBNEIsRUFBNUI7QUFDRDs7QUFFREQsaUJBQU9VLE1BQVAsQ0FBY2QsZ0JBQWQsRUFBZ0MsS0FBS2UsYUFBTCxDQUFtQmYsZ0JBQW5CLENBQWhDO0FBQ0Q7O0FBRUQ7QUFDQSxZQUFJMUIsU0FBU3NCLFFBQVQsS0FBc0JJLGlCQUFpQkosUUFBM0MsRUFBcUQ7QUFDbkRJLDJCQUFpQmdCLElBQWpCLEdBQXdCLENBQXhCO0FBQ0Q7O0FBRUQ7QUFDQSxZQUFJaEIsaUJBQWlCWSxVQUFyQixFQUFpQztBQUMvQlosMkJBQWlCaUIsS0FBakIsR0FBeUJqQixpQkFBaUJrQixNQUFqQixHQUNyQmxCLGlCQUFpQmlCLEtBREksR0FFckJFLEtBQUtDLElBQUwsQ0FBVXBCLGlCQUFpQlksVUFBakIsQ0FBNEJMLE1BQTVCLEdBQXFDUCxpQkFBaUJxQixRQUFoRSxDQUZKO0FBR0FyQiwyQkFBaUJnQixJQUFqQixHQUF3QkcsS0FBS0csR0FBTCxDQUN0QnRCLGlCQUFpQmdCLElBQWpCLElBQXlCaEIsaUJBQWlCaUIsS0FBMUMsR0FDSWpCLGlCQUFpQmlCLEtBQWpCLEdBQXlCLENBRDdCLEdBRUlqQixpQkFBaUJnQixJQUhDLEVBSXRCLENBSnNCLENBQXhCO0FBTUQ7O0FBRUQsZUFBTyxLQUFLdEMsUUFBTCxDQUFjc0IsZ0JBQWQsRUFBZ0MsWUFBTTtBQUMzQyxjQUFJRCxFQUFKLEVBQVE7QUFDTkE7QUFDRDtBQUNELGNBQ0V6QixTQUFTMEMsSUFBVCxLQUFrQmhCLGlCQUFpQmdCLElBQW5DLElBQ0ExQyxTQUFTK0MsUUFBVCxLQUFzQnJCLGlCQUFpQnFCLFFBRHZDLElBRUEvQyxTQUFTcUIsTUFBVCxLQUFvQkssaUJBQWlCTCxNQUZyQyxJQUdBckIsU0FBU3NCLFFBQVQsS0FBc0JJLGlCQUFpQkosUUFKekMsRUFLRTtBQUNBLG1CQUFLMUIsYUFBTDtBQUNEO0FBQ0YsU0FaTSxDQUFQO0FBYUQ7QUFqSlU7O0FBQUE7QUFBQSxJQUNDcUQsSUFERDtBQUFBLENBQWYiLCJmaWxlIjoibGlmZWN5Y2xlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBpY2sgZnJvbSAnbG9kYXNoLnBpY2snXG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gub21pdCdcblxuZXhwb3J0IGRlZmF1bHQgQmFzZSA9PlxuICBjbGFzcyBleHRlbmRzIEJhc2Uge1xuICAgIGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XG4gICAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEodGhpcy5nZXREYXRhTW9kZWwodGhpcy5nZXRSZXNvbHZlZFN0YXRlKCkpKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICAgIHRoaXMuZmlyZUZldGNoRGF0YSgpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgIGNvbnN0IGluZmluaXRlUHJvcHMgPSBbXG4gICAgICAgICdwcmVsb2FkQmF0Y2hTaXplJyxcbiAgICAgICAgJ3ByZWxvYWRBZGRpdGlvbmFsSGVpZ2h0JyxcbiAgICAgICAgJ3N0eWxlcycsXG4gICAgICAgICdpbmZpbml0ZUNvbXB1dGVyJyxcbiAgICAgICAgJ2RhdGFMZW5ndGgnLFxuICAgICAgICAnZGlzcGxheUluZGV4U3RhcnQnLFxuICAgICAgICAnZGlzcGxheUluZGV4RW5kJyxcbiAgICAgICAgJ2VsZW1lbnRIZWlnaHQnLFxuICAgICAgICAnY29udGFpbmVySGVpZ2h0J1xuICAgICAgXVxuXG4gICAgICBjb25zdCBvbGRTdGF0ZSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IG9taXQodGhpcy5nZXRSZXNvbHZlZFN0YXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSwgaW5maW5pdGVQcm9wcylcbiAgICAgIGxldCBuZXh0SW5maW5pdGVTdGF0ZSA9IHBpY2soXG4gICAgICAgIHRoaXMucmVjb21wdXRlSW5maW5pdGVTdGF0ZUZyb21Qcm9wcyhuZXh0UHJvcHMpLFxuICAgICAgICBpbmZpbml0ZVByb3BzXG4gICAgICApIC8vXG4gICAgICB0aGlzLmluZmluaXRlUHJvcHMgPSB0aGlzLnJlY29tcHV0ZUluZmluaXRlU3RhdGVGcm9tUHJvcHMobmV4dFByb3BzKS5pbmZpbml0ZVByb3BzIC8vXG4gICAgICB0aGlzLnNldFN0YXRlKG5leHRJbmZpbml0ZVN0YXRlKSAvL1xuXG4gICAgICAvLyBEbyBhIGRlZXAgY29tcGFyZSBvZiBuZXcgYW5kIG9sZCBgZGVmYXVsdE9wdGlvbmAgYW5kXG4gICAgICAvLyBpZiB0aGV5IGFyZSBkaWZmZXJlbnQgcmVzZXQgYG9wdGlvbiA9IGRlZmF1bHRPcHRpb25gXG4gICAgICBjb25zdCBkZWZhdWx0YWJsZU9wdGlvbnMgPSBbJ3NvcnRlZCcsICdmaWx0ZXJlZCcsICdyZXNpemVkJywgJ2V4cGFuZGVkJ11cbiAgICAgIGRlZmF1bHRhYmxlT3B0aW9ucy5mb3JFYWNoKHggPT4ge1xuICAgICAgICBjb25zdCBkZWZhdWx0TmFtZSA9IGBkZWZhdWx0JHt4LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgeC5zbGljZSgxKX1gXG4gICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShvbGRTdGF0ZVtkZWZhdWx0TmFtZV0pICE9PSBKU09OLnN0cmluZ2lmeShuZXdTdGF0ZVtkZWZhdWx0TmFtZV0pKSB7XG4gICAgICAgICAgbmV3U3RhdGVbeF0gPSBuZXdTdGF0ZVtkZWZhdWx0TmFtZV1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLy8gSWYgdGhleSBjaGFuZ2UgdGhlc2UgdGFibGUgb3B0aW9ucywgd2UgbmVlZCB0byByZXNldCBkZWZhdWx0c1xuICAgICAgLy8gb3IgZWxzZSB3ZSBjb3VsZCBnZXQgaW50byBhIHN0YXRlIHdoZXJlIHRoZSB1c2VyIGhhcyBjaGFuZ2VkIHRoZSBVSVxuICAgICAgLy8gYW5kIHRoZW4gZGlzYWJsZWQgdGhlIGFiaWxpdHkgdG8gY2hhbmdlIGl0IGJhY2suXG4gICAgICAvLyBlLmcuIElmIGBmaWx0ZXJhYmxlYCBoYXMgY2hhbmdlZCwgc2V0IGBmaWx0ZXJlZCA9IGRlZmF1bHRGaWx0ZXJlZGBcbiAgICAgIGNvbnN0IHJlc2V0dGFibGVPcHRpb25zID0gWydzb3J0YWJsZScsICdmaWx0ZXJhYmxlJywgJ3Jlc2l6YWJsZSddXG4gICAgICByZXNldHRhYmxlT3B0aW9ucy5mb3JFYWNoKHggPT4ge1xuICAgICAgICBpZiAob2xkU3RhdGVbeF0gIT09IG5ld1N0YXRlW3hdKSB7XG4gICAgICAgICAgY29uc3QgYmFzZU5hbWUgPSB4LnJlcGxhY2UoJ2FibGUnLCAnJylcbiAgICAgICAgICBjb25zdCBvcHRpb25OYW1lID0gYCR7YmFzZU5hbWV9ZWRgXG4gICAgICAgICAgY29uc3QgZGVmYXVsdE5hbWUgPSBgZGVmYXVsdCR7b3B0aW9uTmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG9wdGlvbk5hbWUuc2xpY2UoMSl9YFxuICAgICAgICAgIG5ld1N0YXRlW29wdGlvbk5hbWVdID0gbmV3U3RhdGVbZGVmYXVsdE5hbWVdXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIC8vIFByb3BzIHRoYXQgdHJpZ2dlciBhIGRhdGEgdXBkYXRlXG4gICAgICBpZiAoXG4gICAgICAgIG9sZFN0YXRlLmRhdGEgIT09IG5ld1N0YXRlLmRhdGEgfHxcbiAgICAgICAgb2xkU3RhdGUuY29sdW1ucyAhPT0gbmV3U3RhdGUuY29sdW1ucyB8fFxuICAgICAgICBvbGRTdGF0ZS5waXZvdEJ5ICE9PSBuZXdTdGF0ZS5waXZvdEJ5IHx8XG4gICAgICAgIG9sZFN0YXRlLnNvcnRlZCAhPT0gbmV3U3RhdGUuc29ydGVkIHx8XG4gICAgICAgIG9sZFN0YXRlLmZpbHRlcmVkICE9PSBuZXdTdGF0ZS5maWx0ZXJlZFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YSh0aGlzLmdldERhdGFNb2RlbChuZXdTdGF0ZSkpXG4gICAgICB9XG4gICAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlLCAoKSA9PiB7IGNvbnNvbGUubG9nKCdRUScpIH0pIC8vXG4gICAgfVxuXG4gICAgc2V0U3RhdGVXaXRoRGF0YSAobmV3U3RhdGUsIGNiKSB7XG4gICAgICBjb25zdCBvbGRTdGF0ZSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXG4gICAgICBjb25zdCBuZXdSZXNvbHZlZFN0YXRlID0gdGhpcy5nZXRSZXNvbHZlZFN0YXRlKHt9LCBuZXdTdGF0ZSlcbiAgICAgIGNvbnN0IHsgZnJlZXplV2hlbkV4cGFuZGVkIH0gPSBuZXdSZXNvbHZlZFN0YXRlXG5cbiAgICAgIC8vIERlZmF1bHQgdG8gdW5mcm96ZW4gc3RhdGVcbiAgICAgIG5ld1Jlc29sdmVkU3RhdGUuZnJvemVuID0gZmFsc2VcblxuICAgICAgLy8gSWYgZnJlZXplV2hlbkV4cGFuZGVkIGlzIHNldCwgY2hlY2sgZm9yIGZyb3plbiBjb25kaXRpb25zXG4gICAgICBpZiAoZnJlZXplV2hlbkV4cGFuZGVkKSB7XG4gICAgICAgIC8vIGlmIGFueSByb3dzIGFyZSBleHBhbmRlZCwgZnJlZXplIHRoZSBleGlzdGluZyBkYXRhIGFuZCBzb3J0aW5nXG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhuZXdSZXNvbHZlZFN0YXRlLmV4cGFuZGVkKVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAobmV3UmVzb2x2ZWRTdGF0ZS5leHBhbmRlZFtrZXlzW2ldXSkge1xuICAgICAgICAgICAgbmV3UmVzb2x2ZWRTdGF0ZS5mcm96ZW4gPSB0cnVlXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGUgZGF0YSBpc24ndCBmcm96ZW4gYW5kIGVpdGhlciB0aGUgZGF0YSBvclxuICAgICAgLy8gc29ydGluZyBtb2RlbCBoYXMgY2hhbmdlZCwgdXBkYXRlIHRoZSBkYXRhXG4gICAgICBpZiAoXG4gICAgICAgIChvbGRTdGF0ZS5mcm96ZW4gJiYgIW5ld1Jlc29sdmVkU3RhdGUuZnJvemVuKSB8fFxuICAgICAgICBvbGRTdGF0ZS5zb3J0ZWQgIT09IG5ld1Jlc29sdmVkU3RhdGUuc29ydGVkIHx8XG4gICAgICAgIG9sZFN0YXRlLmZpbHRlcmVkICE9PSBuZXdSZXNvbHZlZFN0YXRlLmZpbHRlcmVkIHx8XG4gICAgICAgIG9sZFN0YXRlLnNob3dGaWx0ZXJzICE9PSBuZXdSZXNvbHZlZFN0YXRlLnNob3dGaWx0ZXJzIHx8XG4gICAgICAgICghbmV3UmVzb2x2ZWRTdGF0ZS5mcm96ZW4gJiYgb2xkU3RhdGUucmVzb2x2ZWREYXRhICE9PSBuZXdSZXNvbHZlZFN0YXRlLnJlc29sdmVkRGF0YSlcbiAgICAgICkge1xuICAgICAgICAvLyBIYW5kbGUgY29sbGFwc2VPbnNvcnRlZENoYW5nZSAmIGNvbGxhcHNlT25EYXRhQ2hhbmdlXG4gICAgICAgIGlmIChcbiAgICAgICAgICAob2xkU3RhdGUuc29ydGVkICE9PSBuZXdSZXNvbHZlZFN0YXRlLnNvcnRlZCAmJiB0aGlzLnByb3BzLmNvbGxhcHNlT25Tb3J0aW5nQ2hhbmdlKSB8fFxuICAgICAgICAgIG9sZFN0YXRlLmZpbHRlcmVkICE9PSBuZXdSZXNvbHZlZFN0YXRlLmZpbHRlcmVkIHx8XG4gICAgICAgICAgb2xkU3RhdGUuc2hvd0ZpbHRlcnMgIT09IG5ld1Jlc29sdmVkU3RhdGUuc2hvd0ZpbHRlcnMgfHxcbiAgICAgICAgICAob2xkU3RhdGUuc29ydGVkRGF0YSAmJlxuICAgICAgICAgICAgIW5ld1Jlc29sdmVkU3RhdGUuZnJvemVuICYmXG4gICAgICAgICAgICBvbGRTdGF0ZS5yZXNvbHZlZERhdGEgIT09IG5ld1Jlc29sdmVkU3RhdGUucmVzb2x2ZWREYXRhICYmXG4gICAgICAgICAgICB0aGlzLnByb3BzLmNvbGxhcHNlT25EYXRhQ2hhbmdlKVxuICAgICAgICApIHtcbiAgICAgICAgICBuZXdSZXNvbHZlZFN0YXRlLmV4cGFuZGVkID0ge31cbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5hc3NpZ24obmV3UmVzb2x2ZWRTdGF0ZSwgdGhpcy5nZXRTb3J0ZWREYXRhKG5ld1Jlc29sdmVkU3RhdGUpKVxuICAgICAgfVxuXG4gICAgICAvLyBTZXQgcGFnZSB0byAwIGlmIGZpbHRlcnMgY2hhbmdlXG4gICAgICBpZiAob2xkU3RhdGUuZmlsdGVyZWQgIT09IG5ld1Jlc29sdmVkU3RhdGUuZmlsdGVyZWQpIHtcbiAgICAgICAgbmV3UmVzb2x2ZWRTdGF0ZS5wYWdlID0gMFxuICAgICAgfVxuXG4gICAgICAvLyBDYWxjdWxhdGUgcGFnZVNpemUgYWxsIHRoZSB0aW1lXG4gICAgICBpZiAobmV3UmVzb2x2ZWRTdGF0ZS5zb3J0ZWREYXRhKSB7XG4gICAgICAgIG5ld1Jlc29sdmVkU3RhdGUucGFnZXMgPSBuZXdSZXNvbHZlZFN0YXRlLm1hbnVhbFxuICAgICAgICAgID8gbmV3UmVzb2x2ZWRTdGF0ZS5wYWdlc1xuICAgICAgICAgIDogTWF0aC5jZWlsKG5ld1Jlc29sdmVkU3RhdGUuc29ydGVkRGF0YS5sZW5ndGggLyBuZXdSZXNvbHZlZFN0YXRlLnBhZ2VTaXplKVxuICAgICAgICBuZXdSZXNvbHZlZFN0YXRlLnBhZ2UgPSBNYXRoLm1heChcbiAgICAgICAgICBuZXdSZXNvbHZlZFN0YXRlLnBhZ2UgPj0gbmV3UmVzb2x2ZWRTdGF0ZS5wYWdlc1xuICAgICAgICAgICAgPyBuZXdSZXNvbHZlZFN0YXRlLnBhZ2VzIC0gMVxuICAgICAgICAgICAgOiBuZXdSZXNvbHZlZFN0YXRlLnBhZ2UsXG4gICAgICAgICAgMFxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKG5ld1Jlc29sdmVkU3RhdGUsICgpID0+IHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgY2IoKVxuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICBvbGRTdGF0ZS5wYWdlICE9PSBuZXdSZXNvbHZlZFN0YXRlLnBhZ2UgfHxcbiAgICAgICAgICBvbGRTdGF0ZS5wYWdlU2l6ZSAhPT0gbmV3UmVzb2x2ZWRTdGF0ZS5wYWdlU2l6ZSB8fFxuICAgICAgICAgIG9sZFN0YXRlLnNvcnRlZCAhPT0gbmV3UmVzb2x2ZWRTdGF0ZS5zb3J0ZWQgfHxcbiAgICAgICAgICBvbGRTdGF0ZS5maWx0ZXJlZCAhPT0gbmV3UmVzb2x2ZWRTdGF0ZS5maWx0ZXJlZFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmZpcmVGZXRjaERhdGEoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19