import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import faker from 'faker';

export default function DataTableHooks() {
	const dataTable = useRef();
	const loop = Array.from({ length: 100 }, (v, k) => k + 1);

	useLayoutEffect(() => {
		const $elmt = window.jQuery(dataTable.current);
		const $table = $elmt.DataTable({
			dom: 'Bfrtip',
			buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
			order: [
				[0, 'desc'],
				[1, 'desc'],
			],
			stateSave: true, // on page reload preserve the pagination state
			pagingType: 'full_numbers',
			language: {
				lengthMenu: 'Display _MENU_ records per page',
				zeroRecords: 'Nothing found - sorry', // on search if no data found this error will be shown
				info: 'Showing page _PAGE_ of _PAGES_',
				infoEmpty: 'No records available',
				infoFiltered: '(filtered from _MAX_ total records)',
			},
		});

		window.jQuery($elmt[0]).on('click', 'tbody tr', function() {
			var data = $table.row(this).data();
			console.log('this.$node', $elmt);
			console.log('this.$table', $table);
			console.log(this);
			console.log(data);
			alert('You clicked on ' + data[0] + "'s row");
		});

		return () => {
			// cleanup
			$elmt.destroy();
		};
	}, []);

	return (
		<div>
			<table
				id="exampleHook"
				className="displays compact table table-striped table-bordered"
				ref={dataTable}
			>
				<thead>
					<tr>
						<th rowspan="2">Name</th>
						<th colspan="2">HR Information</th>
						<th colspan="3">Contact</th>
					</tr>
					<tr>
						<th>Position</th>
						<th>Salary</th>
						<th>Office</th>
						<th>Extn.</th>
						<th>E-mail</th>
					</tr>
				</thead>
				<tbody>
					{loop.map(obj => (
						<tr>
							<td>{faker.name.findName()}</td>
							<td>{faker.finance.accountName()}</td>
							<td>${faker.commerce.price()}</td>
							<td>{faker.address.country()}</td>
							<td>{faker.random.number()}</td>
							<td>{faker.internet.email()}</td>
						</tr>
					))}
					{/* <tr>
						<td>Tiger Nixon</td>
						<td>System Architect</td>
						<td>Edinburgh</td>
						<td>61</td>
						<td>2011/04/25</td>
						<td>$320,800</td>
					</tr>
					<tr>
						<td>Donna Snider</td>
						<td>Customer Support</td>
						<td>New York</td>
						<td>27</td>
						<td>2011/01/25</td>
						<td>$112,000</td>
					</tr> */}
				</tbody>
				<tfoot>
					<tr>
						<th>Name</th>
						<th>Position</th>
						<th>Office</th>
						<th>Age</th>
						<th>Start date</th>
						<th>Salary</th>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
