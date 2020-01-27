import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';

export default function DataTableServerSidePagination() {
	const dataTable = useRef();
	const $ = window.jQuery;
	let dt;
	useLayoutEffect(() => {
		const $elmt = $(dataTable.current);
		dt = $elmt.DataTable({
			dom: 'Bfrtip',
			processing: true,
			serverSide: true,
			paging: true,
			pageLength: 5,
			deferRender: true,

			ajax: {
				url: 'https://reqres.in/api/users',
				data: function(d) {
					// https://datatables.net/reference/option/ajax.data
					console.log('dddd', d);
					d.page = getPageNumber();

					// newData.page = parseInt(json.start + 1);
					// console.log('json', newData);
				},
				dataFilter: function(data) {
					var json = $.parseJSON(data);
					var newData = {};
					newData.recordsTotal = json.total;
					newData.recordsFiltered = json.per_page;
					newData.data = json.data;
					// newData.page = json.page;
					console.log('json', newData);
					return JSON.stringify(newData); // return JSON string
				},
			},

			// ajax: function(data, callback, settings) {
			// 	$.ajax({
			// 		url: 'https://reqres.in/api/users',
			// 		type: 'get',
			// 		data: {
			// 			RecordsStart: data.page,
			// 			PageSize: data.total_pages,
			// 		},
			// 		success: function(data, textStatus, jQxhr) {
			// 			// https://stackoverflow.com/questions/48867940/how-to-implement-pagination-with-serverside-get-api-in-datatables
			// 			callback({
			// 				data: data.data,
			// 				recordsTotal: data.total,
			// 				recordsFiltered: data.per_page,
			// 			});
			// 			console.log('data', data);
			// 		},
			// 		error: function(jqXhr, textStatus, errorThrown) {
			// 			console.log('jqXhr', jqXhr);
			// 			console.log('textStatus', textStatus);
			// 			console.log('errorThrown', errorThrown);
			// 		},
			// 	});
			// },

			columns: [
				{
					class: 'details-control',
					orderable: false,
					data: 'id',
				},

				{ data: 'email' },
				{ data: 'first_name' },
				{ data: 'last_name' },
				{
					data: 'avatar',
					render: function(data, type, JsonResultRow, meta) {
						// console.log('data', data);
						return (
							'<img width="50" src="' +
							JsonResultRow.avatar +
							'">'
						);
					},
				},
			],
		});

		// Array to track the ids of the details displayed rows
		var detailRows = [];

		$($elmt).on('click', 'tbody tr td.details-control', function() {
			var tr = $(this).closest('tr');
			var row = dt.row(tr);
			var idx = $.inArray(tr.attr('id'), detailRows);

			if (row.child.isShown()) {
				tr.removeClass('details');
				row.child.hide();

				// Remove from the 'open' array
				detailRows.splice(idx, 1);
			} else {
				tr.addClass('details');
				row.child(format(row.data())).show();

				// Add to the 'open' array
				if (idx === -1) {
					detailRows.push(tr.attr('id'));
				}
			}
		});

		// On each draw, loop over the `detailRows` array and show any child rows
		dt.on('draw', function() {
			$.each(detailRows, function(i, id) {
				$('#' + id + ' td.details-control').trigger('click');
			});
		});

		// for column filtering
		// https://datatables.net/extensions/fixedheader/examples/options/columnFiltering.html

		return () => {
			// cleanup
			// $elmt.destroy();
		};
	}, []);

	function getPageNumber() {
		let currentPageIndex = 0;
		//Is datatable already initialized?
		if ($.fn.DataTable.isDataTable(dt)) {
			var info = dt.page.info();

			console.log('info', info);
			currentPageIndex = info.page;
		} else {
			console.log('not init');
		}

		console.log('currentPageIndex', currentPageIndex);

		return parseInt(currentPageIndex + 1);
	}

	function format(d) {
		return (
			'Full name: ' +
			d.first_name +
			' ' +
			d.last_name +
			'<br>' +
			'Salary: ' +
			d.email +
			'<br>' +
			'The child row can contain any data you wish, including links, images, inner tables etc.'
		);
	}

	return (
		<>
			<h1>DataTable Server Side Pagination</h1>
			<table
				id="exampleRemotePagination"
				className="display"
				ref={dataTable}
			>
				<thead>
					<tr>
						<th>ID</th>
						<th>Email</th>
						<th>First name</th>
						<th>Last name</th>
						<th>Avatar</th>
					</tr>
				</thead>
				<tfoot>
					<tr>
						<th>ID</th>
						<th>Email</th>
						<th>First name</th>
						<th>Last name</th>
						<th>Avatar</th>
					</tr>
				</tfoot>
			</table>
		</>
	);
}
