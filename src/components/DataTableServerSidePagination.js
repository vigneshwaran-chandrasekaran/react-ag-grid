import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';

export default function DataTableServerSidePagination() {
	const dataTable = useRef();
	const $ = window.jQuery;

	useLayoutEffect(() => {
		const $elmt = $(dataTable.current);
		const $table = $elmt.DataTable({
			dom: 'Bfrtip',
			processing: true,
			serverSide: true,
			ajax: {
				url: 'https://reqres.in/api/users',
				crossDomain: true,
			},
			columns: [
				{ data: 'id' },
				{ data: 'email' },
				{ data: 'first_name' },
				{ data: 'last_name' },
				{
					render: function(data, type, JsonResultRow, meta) {
						return (
							'<img width="50" src="' +
							JsonResultRow.avatar +
							'">'
						);
					},
				},
			],
		});
		return () => {
			// cleanup
			// $elmt.destroy();
		};
	}, []);

	return (
		<table id="exampleRemotePagination" className="display" ref={dataTable}>
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
	);
}
