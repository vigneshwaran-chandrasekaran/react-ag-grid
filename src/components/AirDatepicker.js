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
		this.$node.datepicker({
			language: 'en',
			view: 'months',
			autoClose: true,
			onSelect: e => this.handleOnSelect(e),
		});
	}

	handleOnSelect(e) {
		console.log(e);
		console.log(this.$node.data('datepicker'));
	}

	render() {
		return (
			<div>
				<h3>Choose date!</h3>
				<input type="text" ref="datepicker" />
			</div>
		);
	}
}
