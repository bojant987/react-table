import React from 'react';
import ConstantInfiniteComputer from '../computers/constantInfiniteComputer.js';
import scaleEnum from './scaleEnum';

function createInfiniteComputer(elementHeight, data) {
	let computer;
	const dataLength = data.length;

	// This should be guaranteed by checkProps
	computer = new ConstantInfiniteComputer(elementHeight, dataLength);

	return computer;
}

// Given the scrollTop of the container, computes the state the
// component should be in. The goal is to abstract all of this
// from any actual representation in the DOM.
// The window is the block with any preloadAdditionalHeight
// added to it.
function recomputeApertureStateFromOptionsAndScrollTop(
  { preloadBatchSize, preloadAdditionalHeight, infiniteComputer },
  scrollTop
) {
  console.log('IC', infiniteComputer);
  const blockNumber = preloadBatchSize === 0 ? 0 : Math.floor(scrollTop / preloadBatchSize)
  const blockStart = preloadBatchSize * blockNumber
  const blockEnd = blockStart + preloadBatchSize
  const apertureTop = Math.max(0, blockStart - preloadAdditionalHeight)
  const apertureBottom = Math.min(
    infiniteComputer.getTotalScrollableHeight(), blockEnd + preloadAdditionalHeight
  )

	return {
		displayIndexStart: infiniteComputer.getDisplayIndexStart(apertureTop),
		displayIndexEnd: infiniteComputer.getDisplayIndexEnd(apertureBottom),
	};
}

function generateInfiniteProps(props) {
	// These are extracted so their type definitions do not conflict.
	let {
		containerHeight,
		...oldProps
	} = props;

	let newProps = {};
	newProps.containerHeight = containerHeight;

	let batchSize = {
		type: scaleEnum.CONTAINER_HEIGHT_SCALE_FACTOR,
		amount: 0.5,
	};

	newProps.preloadBatchSize = newProps.containerHeight * batchSize.amount;

	let additionalHeight = {
		type: scaleEnum.CONTAINER_HEIGHT_SCALE_FACTOR,
		amount: 1,
	};

	newProps.preloadAdditionalHeight = newProps.containerHeight * additionalHeight.amount;

	return Object.assign(oldProps, newProps);
}

function buildHeightStyle(height) {
	return {
		width: '100%',
		height: Math.ceil(height),
	};
}

export default {
	createInfiniteComputer,
	recomputeApertureStateFromOptionsAndScrollTop,
  generateInfiniteProps,
	buildHeightStyle,
};
