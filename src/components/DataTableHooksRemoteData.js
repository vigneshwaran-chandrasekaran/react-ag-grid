import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';

export default function DataTableHooksRemoteData(props) {
	const dataTable = useRef();
	const loop = props.userData;
	console.log('props', props);
	console.log('loop', loop);

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
			// searching: false, // to disable search
			// ordering: false, // to disable sorting
			responsive: true,
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
			// $elmt.destroy();
		};
	}, []);

	return (
		<div>
			<h1>DataTable with server send data</h1>
			<table
				id="exampleHookServer"
				className="table table-stripedssss table-bordered displays compact hover cell-border order-column"
				ref={dataTable}
			>
				<thead>
					<tr>
						<th>userId</th>
						<th>id</th>
						<th>title</th>
						<th>body</th>
					</tr>
				</thead>
				<tbody>
					{loop &&
						loop.map(obj => (
							<tr>
								<td>
									<button>Click me {obj.userId}</button>
								</td>
								<td>{obj.id}</td>
								<td>{obj.title}</td>
								<td>{obj.body}</td>
							</tr>
						))}
				</tbody>
				<tfoot>
					<tr>
						<th>userId</th>
						<th>id</th>
						<th>title</th>
						<th>body</th>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
