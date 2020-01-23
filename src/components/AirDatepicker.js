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
		window.jQuery(this.refs.datepicker).destroy();
	}

	initDatepicker() {
		window.jQuery(this.refs.datepicker).datepicker();
	}

	handleOnSelect() {
		console.log(window.jQuery(this.refs.datepicker).data('datepicker'));
	}

	render() {
		return (
			<div>
				<h3>Choose date!</h3>
				<input
					type="text"
					ref="datepicker"
					language={'en'}
					view={'years'}
					onSelect={e => this.handleOnSelect(e)}
				/>
			</div>
		);
	}
}
