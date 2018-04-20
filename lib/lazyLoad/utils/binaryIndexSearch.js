"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var opts = exports.opts = {
	CLOSEST_LOWER: 1,
	CLOSEST_HIGHER: 2
};

var binaryIndexSearch = exports.binaryIndexSearch = function binaryIndexSearch(array, item, opt) {
	var index = void 0;

	var high = array.length - 1,
	    low = 0,
	    middle = void 0,
	    middleItem = void 0;

	while (low <= high) {
		middle = low + Math.floor((high - low) / 2);
		middleItem = array[middle];

		if (middleItem === item) {
			return middle;
		} else if (middleItem < item) {
			low = middle + 1;
		} else if (middleItem > item) {
			high = middle - 1;
		}
	}

	if (opt === opts.CLOSEST_LOWER && low > 0) {
		index = low - 1;
	} else if (opt === opts.CLOSEST_HIGHER && high < array.length - 1) {
		index = high + 1;
	}

	return index;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXp5TG9hZC91dGlscy9iaW5hcnlJbmRleFNlYXJjaC5qcyJdLCJuYW1lcyI6WyJvcHRzIiwiQ0xPU0VTVF9MT1dFUiIsIkNMT1NFU1RfSElHSEVSIiwiYmluYXJ5SW5kZXhTZWFyY2giLCJhcnJheSIsIml0ZW0iLCJvcHQiLCJpbmRleCIsImhpZ2giLCJsZW5ndGgiLCJsb3ciLCJtaWRkbGUiLCJtaWRkbGVJdGVtIiwiTWF0aCIsImZsb29yIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFPLElBQU1BLHNCQUFPO0FBQ25CQyxnQkFBZSxDQURJO0FBRW5CQyxpQkFBZ0I7QUFGRyxDQUFiOztBQUtBLElBQU1DLGdEQUFvQixTQUFwQkEsaUJBQW9CLENBQUNDLEtBQUQsRUFBUUMsSUFBUixFQUFjQyxHQUFkLEVBQXNCO0FBQ3RELEtBQUlDLGNBQUo7O0FBRUEsS0FBSUMsT0FBT0osTUFBTUssTUFBTixHQUFlLENBQTFCO0FBQUEsS0FDQ0MsTUFBTSxDQURQO0FBQUEsS0FFQ0MsZUFGRDtBQUFBLEtBR0NDLG1CQUhEOztBQUtBLFFBQU9GLE9BQU9GLElBQWQsRUFBb0I7QUFDbkJHLFdBQVNELE1BQU1HLEtBQUtDLEtBQUwsQ0FBVyxDQUFDTixPQUFPRSxHQUFSLElBQWUsQ0FBMUIsQ0FBZjtBQUNBRSxlQUFhUixNQUFNTyxNQUFOLENBQWI7O0FBRUEsTUFBSUMsZUFBZVAsSUFBbkIsRUFBeUI7QUFDeEIsVUFBT00sTUFBUDtBQUNBLEdBRkQsTUFFTyxJQUFJQyxhQUFhUCxJQUFqQixFQUF1QjtBQUM3QkssU0FBTUMsU0FBUyxDQUFmO0FBQ0EsR0FGTSxNQUVBLElBQUlDLGFBQWFQLElBQWpCLEVBQXVCO0FBQzdCRyxVQUFPRyxTQUFTLENBQWhCO0FBQ0E7QUFDRDs7QUFFRCxLQUFJTCxRQUFRTixLQUFLQyxhQUFiLElBQThCUyxNQUFNLENBQXhDLEVBQTJDO0FBQzFDSCxVQUFRRyxNQUFNLENBQWQ7QUFDQSxFQUZELE1BRU8sSUFBSUosUUFBUU4sS0FBS0UsY0FBYixJQUErQk0sT0FBT0osTUFBTUssTUFBTixHQUFlLENBQXpELEVBQTREO0FBQ2xFRixVQUFRQyxPQUFPLENBQWY7QUFDQTs7QUFFRCxRQUFPRCxLQUFQO0FBQ0EsQ0E1Qk0iLCJmaWxlIjoiYmluYXJ5SW5kZXhTZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgb3B0cyA9IHtcblx0Q0xPU0VTVF9MT1dFUjogMSxcblx0Q0xPU0VTVF9ISUdIRVI6IDIsXG59O1xuXG5leHBvcnQgY29uc3QgYmluYXJ5SW5kZXhTZWFyY2ggPSAoYXJyYXksIGl0ZW0sIG9wdCkgPT4ge1xuXHRsZXQgaW5kZXg7XG5cblx0bGV0IGhpZ2ggPSBhcnJheS5sZW5ndGggLSAxLFxuXHRcdGxvdyA9IDAsXG5cdFx0bWlkZGxlLFxuXHRcdG1pZGRsZUl0ZW07XG5cblx0d2hpbGUgKGxvdyA8PSBoaWdoKSB7XG5cdFx0bWlkZGxlID0gbG93ICsgTWF0aC5mbG9vcigoaGlnaCAtIGxvdykgLyAyKTtcblx0XHRtaWRkbGVJdGVtID0gYXJyYXlbbWlkZGxlXTtcblxuXHRcdGlmIChtaWRkbGVJdGVtID09PSBpdGVtKSB7XG5cdFx0XHRyZXR1cm4gbWlkZGxlO1xuXHRcdH0gZWxzZSBpZiAobWlkZGxlSXRlbSA8IGl0ZW0pIHtcblx0XHRcdGxvdyA9IG1pZGRsZSArIDE7XG5cdFx0fSBlbHNlIGlmIChtaWRkbGVJdGVtID4gaXRlbSkge1xuXHRcdFx0aGlnaCA9IG1pZGRsZSAtIDE7XG5cdFx0fVxuXHR9XG5cblx0aWYgKG9wdCA9PT0gb3B0cy5DTE9TRVNUX0xPV0VSICYmIGxvdyA+IDApIHtcblx0XHRpbmRleCA9IGxvdyAtIDE7XG5cdH0gZWxzZSBpZiAob3B0ID09PSBvcHRzLkNMT1NFU1RfSElHSEVSICYmIGhpZ2ggPCBhcnJheS5sZW5ndGggLSAxKSB7XG5cdFx0aW5kZXggPSBoaWdoICsgMTtcblx0fVxuXG5cdHJldHVybiBpbmRleDtcbn07XG4iXX0=