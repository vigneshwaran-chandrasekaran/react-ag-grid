import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';

export default function DataTableHooksRemoteData(props) {
	const dataTable = useRef();
	const loop = props.userData;
	console.log('props', props);
	console.log('loop', loop);
	const $ = window.jQuery;

	useLayoutEffect(() => {
		const $elmt = $(dataTable.current);
		const $table = $elmt.DataTable({
			dom: 'Bfrtip',
			buttons: ['copy', 'csv', 'excel', 'pdf', 'print', 'colvis'],
			// colvis = column visibility
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
			columnDefs: [
				{
					targets: 0,
					checkboxes: {
						selectRow: true,
					},
					orderable: false,
					className: 'select-checkbox',
				},
			],
			select: {
				style: 'multi',
			},
			// for checkbox selection
			// https://jsfiddle.net/gyrocode/snqw56dw/
			// https://www.gyrocode.com/articles/jquery-datatables-checkboxes/
			// initComplete: function() {
			// 	$('.buttons-copy').html('<i class="fa fa-copy" />');
			// 	$('.buttons-csv').html('<i class="fa fa-file-text-o" />');
			// 	$('.buttons-excel').html('<i class="fa fa-file-excel-o" />');
			// 	$('.buttons-pdf').html('<i class="fa fa-file-pdf-o" />');
			// 	$('.buttons-print').html('<i class="fa fa-print" />');
			// },
		});

		$($elmt[0]).on('click', 'tbody tr', function() {
			var data = $table.row(this).data();
			console.log('this.$node', $elmt);
			console.log('this.$table', $table);
			console.log(this);
			console.log(data);
			if (data) {
				// alert('You clicked on ' + data[3] + "'s row");
			}
		});

		$('#button').click(function() {
			console.log($table.rows('.selected').data());
			alert($table.rows('.selected').data().length + ' row(s) selected');
		});

		return () => {
			// cleanup
			// $elmt.destroy();
		};
	}, []);

	return (
		<div>
			<h1>
				DataTable with server send data{' '}
				<button id="button">Row count</button>
			</h1>
			<table
				id="exampleHookServer"
				className="table table-stripedssss table-bordered displays compact hover cell-border order-column"
				ref={dataTable}
			>
				<thead>
					<tr>
						<th></th>
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
								<td></td>
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
						<th></th>
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
