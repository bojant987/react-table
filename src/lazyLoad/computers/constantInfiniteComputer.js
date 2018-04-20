export default class ConstantInfiniteComputer {
	constructor(heightData, dataLength) {
		this.heightData = heightData;
		this.dataLength = dataLength;
	}

	getTotalScrollableHeight() {
		return this.heightData * this.dataLength;
	}

	getDisplayIndexStart(windowTop) {
		return Math.floor(windowTop / this.heightData);
	}

	getDisplayIndexEnd(windowBottom) {
		const nonZeroIndex = Math.ceil(windowBottom / this.heightData);
		if (nonZeroIndex > 0) {
			return nonZeroIndex - 1;
		}
		return nonZeroIndex;
	}

	getTopSpacerHeight(displayIndexStart) {
		return displayIndexStart * this.heightData;
	}

	getBottomSpacerHeight(displayIndexEnd) {
		const nonZeroIndex = displayIndexEnd + 1;
		return Math.max(0, (this.dataLength - nonZeroIndex) * this.heightData);
	}
}
