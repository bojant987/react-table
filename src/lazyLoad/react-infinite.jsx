import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import infiniteHelpers from './utils/infiniteHelpers';

const timeScrollStateLastsForAfterUserScrolls = 150;

export default class Infinite extends React.Component {
	static propTypes = {
		children: PropTypes.any,
		data: PropTypes.array,
		elementHeight: PropTypes.number.isRequired,
		containerHeight: PropTypes.number.isRequired,
		className: PropTypes.string,
		styles: PropTypes.shape({
			scrollableStyle: PropTypes.object,
		}).isRequired,
		onVisibleChange: PropTypes.func,
	};

	static defaultProps = {
		className: '',
		styles: {},
		onVisibleChange: () => {},
	};

	constructor(props) {
		super(props);
		const nextInternalState = this.recomputeInternalStateFromProps(props);

		this.computedProps = nextInternalState.computedProps;
		this.utils = nextInternalState.utils;

		const state = nextInternalState.newState;
		state.scrollTimeout = undefined;
		state.isScrolling = false;

		this.state = state;
	}

	generateComputedUtilityFunctions = () => {
		let utilities = {};

		utilities.nodeScrollListener = this.infiniteHandleScroll;
		utilities.getScrollTop = () => {
			return this.scrollable ? this.scrollable.scrollTop : 0;
		};

		utilities.setScrollTop = top => {
			if (this.scrollable) {
				this.scrollable.scrollTop = top;
			}
		};
		utilities.scrollShouldBeIgnored = event => event.target !== this.scrollable;

		utilities.buildScrollableStyle = () => {
			return Object.assign(
				{},
				{
					height: this.computedProps.containerHeight,
					overflowX: 'hidden',
					overflowY: 'scroll',
					WebkitOverflowScrolling: 'touch',
				},
				this.computedProps.styles.scrollableStyle || {}
			);
		};

		return utilities;
	};

	recomputeInternalStateFromProps = props => {
		let computedProps = infiniteHelpers.generateComputedProps(props);
		let utils = this.generateComputedUtilityFunctions();

		let newState = {};

		newState.dataLength = computedProps.data.length;
		newState.infiniteComputer = infiniteHelpers.createInfiniteComputer(
			computedProps.elementHeight,
			computedProps.data
		);

		newState.preloadBatchSize = computedProps.preloadBatchSize;
		newState.preloadAdditionalHeight = computedProps.preloadAdditionalHeight;

		newState = Object.assign(
			newState,
			infiniteHelpers.recomputeApertureStateFromOptionsAndScrollTop(newState, utils.getScrollTop())
		);

		return {
			computedProps,
			utils,
			newState,
		};
	};

	// shouldComponentUpdate(nextProps, nextState) {
	// 	console.log(!isEqual(this.props.children, nextProps.children));
	// 	return this.props.containerHeight !== nextProps.containerHeight
	// 		|| this.props.elementHeight !== nextProps.elementHeight
	// 		|| !isEqual(this.props.data, nextProps.data)
	// 		// || !isEqual(this.props.children, nextProps.children)
	// 		|| !isEqual(this.state, nextState);
	// }

	componentWillReceiveProps(nextProps) {
		let nextInternalState = this.recomputeInternalStateFromProps(nextProps);

		this.computedProps = nextInternalState.computedProps;
		this.utils = nextInternalState.utils;

		this.setState(nextInternalState.newState);
	}

	infiniteHandleScroll = e => {
		if (this.utils.scrollShouldBeIgnored(e)) {
			return;
		}

		this.handleScroll(this.utils.getScrollTop());
	};

	manageScrollTimeouts = () => {
		// Maintains a series of timeouts to set this.state.isScrolling
		// to be true when the element is scrolling.

		if (this.state.scrollTimeout) {
			clearTimeout(this.state.scrollTimeout);
		}

		let that = this,
			scrollTimeout = setTimeout(() => {
				that.setState({
					isScrolling: false,
					scrollTimeout: undefined,
				});
			}, timeScrollStateLastsForAfterUserScrolls);

		this.setState({
			isScrolling: true,
			scrollTimeout: scrollTimeout,
		});
	};

	handleScroll = scrollTop => {
		this.manageScrollTimeouts();

		let newApertureState = infiniteHelpers.recomputeApertureStateFromOptionsAndScrollTop(this.state, scrollTop);
		// this.props.onVisibleChange(newApertureState);
		this.setState(Object.assign({}, newApertureState));
	};

	render() {
		let displayables;
		if (this.state.dataLength > 1) {
			displayables = this.computedProps.children.slice(
				this.state.displayIndexStart,
				this.state.displayIndexEnd + 1
			);
		} else {
			displayables = this.computedProps.children;
		}

		let infiniteScrollStyles = {};
		if (this.state.isScrolling) {
			infiniteScrollStyles.pointerEvents = 'none';
		}

		let topSpacerHeight = this.state.infiniteComputer.getTopSpacerHeight(this.state.displayIndexStart),
			bottomSpacerHeight = this.state.infiniteComputer.getBottomSpacerHeight(this.state.displayIndexEnd);

		// topSpacer and bottomSpacer take up the amount of space that the
		// rendered elements would have taken up otherwise
		return (
			<div
				className={this.computedProps.className}
				ref={c => {
					this.scrollable = c;
				}}
				style={this.utils.buildScrollableStyle()}
				onScroll={this.utils.nodeScrollListener}
			>
				<div
					ref={c => {
						this.smoothScrollingWrapper = c;
					}}
					style={infiniteScrollStyles}
				>
					<div
						ref={c => {
							this.topSpacer = c;
						}}
						style={infiniteHelpers.buildHeightStyle(topSpacerHeight)}
					/>
					{displayables}
					{/*{this.props.children}*/}
					<div
						ref={c => {
							this.bottomSpacer = c;
						}}
						style={infiniteHelpers.buildHeightStyle(bottomSpacerHeight)}
					/>
				</div>
			</div>
		);
	}
}
