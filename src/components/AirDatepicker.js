import React, { Component } from 'react';

export default class AirDatepicker extends Component {
	constructor(props) {
		super(props);
		this.handleOnSelect = this.handleOnSelect.bind(this);
	}

	componentDidMount() {
		this.initDatepicker();
	}

	componentWillUnmount() {
		this.$node.destroy();
	}

	initDatepicker() {
		this.$node = window.jQuery(this.refs.datepicker);
		this.$node.datepicker();
	}

	handleOnSelect() {
		console.log(this.$node.data('datepicker'));
	}

	render() {
		return (
			<div>
				<h3>Choose date!</h3>
				<input
					type="text"
					ref="datepicker"
					language={'en'}
					onSelect={e => this.handleOnSelect(e)}
				/>
			</div>
		);
	}
}
