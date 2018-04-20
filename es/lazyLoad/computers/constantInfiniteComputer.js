var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConstantInfiniteComputer = function () {
	function ConstantInfiniteComputer(heightData, dataLength) {
		_classCallCheck(this, ConstantInfiniteComputer);

		this.heightData = heightData;
		this.dataLength = dataLength;
	}

	_createClass(ConstantInfiniteComputer, [{
		key: "getTotalScrollableHeight",
		value: function getTotalScrollableHeight() {
			return this.heightData * this.dataLength;
		}
	}, {
		key: "getDisplayIndexStart",
		value: function getDisplayIndexStart(windowTop) {
			return Math.floor(windowTop / this.heightData);
		}
	}, {
		key: "getDisplayIndexEnd",
		value: function getDisplayIndexEnd(windowBottom) {
			var nonZeroIndex = Math.ceil(windowBottom / this.heightData);
			if (nonZeroIndex > 0) {
				return nonZeroIndex - 1;
			}
			return nonZeroIndex;
		}
	}, {
		key: "getTopSpacerHeight",
		value: function getTopSpacerHeight(displayIndexStart) {
			return displayIndexStart * this.heightData;
		}
	}, {
		key: "getBottomSpacerHeight",
		value: function getBottomSpacerHeight(displayIndexEnd) {
			var nonZeroIndex = displayIndexEnd + 1;
			return Math.max(0, (this.dataLength - nonZeroIndex) * this.heightData);
		}
	}]);

	return ConstantInfiniteComputer;
}();

export default ConstantInfiniteComputer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXp5TG9hZC9jb21wdXRlcnMvY29uc3RhbnRJbmZpbml0ZUNvbXB1dGVyLmpzIl0sIm5hbWVzIjpbIkNvbnN0YW50SW5maW5pdGVDb21wdXRlciIsImhlaWdodERhdGEiLCJkYXRhTGVuZ3RoIiwid2luZG93VG9wIiwiTWF0aCIsImZsb29yIiwid2luZG93Qm90dG9tIiwibm9uWmVyb0luZGV4IiwiY2VpbCIsImRpc3BsYXlJbmRleFN0YXJ0IiwiZGlzcGxheUluZGV4RW5kIiwibWF4Il0sIm1hcHBpbmdzIjoiOzs7O0lBQXFCQSx3QjtBQUNwQixtQ0FBWUMsVUFBWixFQUF3QkMsVUFBeEIsRUFBb0M7QUFBQTs7QUFDbkMsT0FBS0QsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxPQUFLQyxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBOzs7OzZDQUUwQjtBQUMxQixVQUFPLEtBQUtELFVBQUwsR0FBa0IsS0FBS0MsVUFBOUI7QUFDQTs7O3VDQUVvQkMsUyxFQUFXO0FBQy9CLFVBQU9DLEtBQUtDLEtBQUwsQ0FBV0YsWUFBWSxLQUFLRixVQUE1QixDQUFQO0FBQ0E7OztxQ0FFa0JLLFksRUFBYztBQUNoQyxPQUFNQyxlQUFlSCxLQUFLSSxJQUFMLENBQVVGLGVBQWUsS0FBS0wsVUFBOUIsQ0FBckI7QUFDQSxPQUFJTSxlQUFlLENBQW5CLEVBQXNCO0FBQ3JCLFdBQU9BLGVBQWUsQ0FBdEI7QUFDQTtBQUNELFVBQU9BLFlBQVA7QUFDQTs7O3FDQUVrQkUsaUIsRUFBbUI7QUFDckMsVUFBT0Esb0JBQW9CLEtBQUtSLFVBQWhDO0FBQ0E7Ozt3Q0FFcUJTLGUsRUFBaUI7QUFDdEMsT0FBTUgsZUFBZUcsa0JBQWtCLENBQXZDO0FBQ0EsVUFBT04sS0FBS08sR0FBTCxDQUFTLENBQVQsRUFBWSxDQUFDLEtBQUtULFVBQUwsR0FBa0JLLFlBQW5CLElBQW1DLEtBQUtOLFVBQXBELENBQVA7QUFDQTs7Ozs7O2VBN0JtQkQsd0IiLCJmaWxlIjoiY29uc3RhbnRJbmZpbml0ZUNvbXB1dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uc3RhbnRJbmZpbml0ZUNvbXB1dGVyIHtcblx0Y29uc3RydWN0b3IoaGVpZ2h0RGF0YSwgZGF0YUxlbmd0aCkge1xuXHRcdHRoaXMuaGVpZ2h0RGF0YSA9IGhlaWdodERhdGE7XG5cdFx0dGhpcy5kYXRhTGVuZ3RoID0gZGF0YUxlbmd0aDtcblx0fVxuXG5cdGdldFRvdGFsU2Nyb2xsYWJsZUhlaWdodCgpIHtcblx0XHRyZXR1cm4gdGhpcy5oZWlnaHREYXRhICogdGhpcy5kYXRhTGVuZ3RoO1xuXHR9XG5cblx0Z2V0RGlzcGxheUluZGV4U3RhcnQod2luZG93VG9wKSB7XG5cdFx0cmV0dXJuIE1hdGguZmxvb3Iod2luZG93VG9wIC8gdGhpcy5oZWlnaHREYXRhKTtcblx0fVxuXG5cdGdldERpc3BsYXlJbmRleEVuZCh3aW5kb3dCb3R0b20pIHtcblx0XHRjb25zdCBub25aZXJvSW5kZXggPSBNYXRoLmNlaWwod2luZG93Qm90dG9tIC8gdGhpcy5oZWlnaHREYXRhKTtcblx0XHRpZiAobm9uWmVyb0luZGV4ID4gMCkge1xuXHRcdFx0cmV0dXJuIG5vblplcm9JbmRleCAtIDE7XG5cdFx0fVxuXHRcdHJldHVybiBub25aZXJvSW5kZXg7XG5cdH1cblxuXHRnZXRUb3BTcGFjZXJIZWlnaHQoZGlzcGxheUluZGV4U3RhcnQpIHtcblx0XHRyZXR1cm4gZGlzcGxheUluZGV4U3RhcnQgKiB0aGlzLmhlaWdodERhdGE7XG5cdH1cblxuXHRnZXRCb3R0b21TcGFjZXJIZWlnaHQoZGlzcGxheUluZGV4RW5kKSB7XG5cdFx0Y29uc3Qgbm9uWmVyb0luZGV4ID0gZGlzcGxheUluZGV4RW5kICsgMTtcblx0XHRyZXR1cm4gTWF0aC5tYXgoMCwgKHRoaXMuZGF0YUxlbmd0aCAtIG5vblplcm9JbmRleCkgKiB0aGlzLmhlaWdodERhdGEpO1xuXHR9XG59XG4iXX0=