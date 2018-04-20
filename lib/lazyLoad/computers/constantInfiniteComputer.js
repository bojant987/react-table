"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

exports.default = ConstantInfiniteComputer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXp5TG9hZC9jb21wdXRlcnMvY29uc3RhbnRJbmZpbml0ZUNvbXB1dGVyLmpzIl0sIm5hbWVzIjpbIkNvbnN0YW50SW5maW5pdGVDb21wdXRlciIsImhlaWdodERhdGEiLCJkYXRhTGVuZ3RoIiwid2luZG93VG9wIiwiTWF0aCIsImZsb29yIiwid2luZG93Qm90dG9tIiwibm9uWmVyb0luZGV4IiwiY2VpbCIsImRpc3BsYXlJbmRleFN0YXJ0IiwiZGlzcGxheUluZGV4RW5kIiwibWF4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCQSx3QjtBQUNwQixtQ0FBWUMsVUFBWixFQUF3QkMsVUFBeEIsRUFBb0M7QUFBQTs7QUFDbkMsT0FBS0QsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxPQUFLQyxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBOzs7OzZDQUUwQjtBQUMxQixVQUFPLEtBQUtELFVBQUwsR0FBa0IsS0FBS0MsVUFBOUI7QUFDQTs7O3VDQUVvQkMsUyxFQUFXO0FBQy9CLFVBQU9DLEtBQUtDLEtBQUwsQ0FBV0YsWUFBWSxLQUFLRixVQUE1QixDQUFQO0FBQ0E7OztxQ0FFa0JLLFksRUFBYztBQUNoQyxPQUFNQyxlQUFlSCxLQUFLSSxJQUFMLENBQVVGLGVBQWUsS0FBS0wsVUFBOUIsQ0FBckI7QUFDQSxPQUFJTSxlQUFlLENBQW5CLEVBQXNCO0FBQ3JCLFdBQU9BLGVBQWUsQ0FBdEI7QUFDQTtBQUNELFVBQU9BLFlBQVA7QUFDQTs7O3FDQUVrQkUsaUIsRUFBbUI7QUFDckMsVUFBT0Esb0JBQW9CLEtBQUtSLFVBQWhDO0FBQ0E7Ozt3Q0FFcUJTLGUsRUFBaUI7QUFDdEMsT0FBTUgsZUFBZUcsa0JBQWtCLENBQXZDO0FBQ0EsVUFBT04sS0FBS08sR0FBTCxDQUFTLENBQVQsRUFBWSxDQUFDLEtBQUtULFVBQUwsR0FBa0JLLFlBQW5CLElBQW1DLEtBQUtOLFVBQXBELENBQVA7QUFDQTs7Ozs7O2tCQTdCbUJELHdCIiwiZmlsZSI6ImNvbnN0YW50SW5maW5pdGVDb21wdXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnN0YW50SW5maW5pdGVDb21wdXRlciB7XG5cdGNvbnN0cnVjdG9yKGhlaWdodERhdGEsIGRhdGFMZW5ndGgpIHtcblx0XHR0aGlzLmhlaWdodERhdGEgPSBoZWlnaHREYXRhO1xuXHRcdHRoaXMuZGF0YUxlbmd0aCA9IGRhdGFMZW5ndGg7XG5cdH1cblxuXHRnZXRUb3RhbFNjcm9sbGFibGVIZWlnaHQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaGVpZ2h0RGF0YSAqIHRoaXMuZGF0YUxlbmd0aDtcblx0fVxuXG5cdGdldERpc3BsYXlJbmRleFN0YXJ0KHdpbmRvd1RvcCkge1xuXHRcdHJldHVybiBNYXRoLmZsb29yKHdpbmRvd1RvcCAvIHRoaXMuaGVpZ2h0RGF0YSk7XG5cdH1cblxuXHRnZXREaXNwbGF5SW5kZXhFbmQod2luZG93Qm90dG9tKSB7XG5cdFx0Y29uc3Qgbm9uWmVyb0luZGV4ID0gTWF0aC5jZWlsKHdpbmRvd0JvdHRvbSAvIHRoaXMuaGVpZ2h0RGF0YSk7XG5cdFx0aWYgKG5vblplcm9JbmRleCA+IDApIHtcblx0XHRcdHJldHVybiBub25aZXJvSW5kZXggLSAxO1xuXHRcdH1cblx0XHRyZXR1cm4gbm9uWmVyb0luZGV4O1xuXHR9XG5cblx0Z2V0VG9wU3BhY2VySGVpZ2h0KGRpc3BsYXlJbmRleFN0YXJ0KSB7XG5cdFx0cmV0dXJuIGRpc3BsYXlJbmRleFN0YXJ0ICogdGhpcy5oZWlnaHREYXRhO1xuXHR9XG5cblx0Z2V0Qm90dG9tU3BhY2VySGVpZ2h0KGRpc3BsYXlJbmRleEVuZCkge1xuXHRcdGNvbnN0IG5vblplcm9JbmRleCA9IGRpc3BsYXlJbmRleEVuZCArIDE7XG5cdFx0cmV0dXJuIE1hdGgubWF4KDAsICh0aGlzLmRhdGFMZW5ndGggLSBub25aZXJvSW5kZXgpICogdGhpcy5oZWlnaHREYXRhKTtcblx0fVxufVxuIl19