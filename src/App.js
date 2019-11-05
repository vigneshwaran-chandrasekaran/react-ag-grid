import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';

function App() {
	const [users, setUsers] = useState([]);
	const [gridApi, setGridApi] = useState();

	const gridData = {
		columnDefs: [
			{
				headerName: 'ID',
				field: 'id',
				sortable: true,
				filter: true,
				resizable: true,
				checkboxSelection: true
			},
			{
				headerName: 'Name',
				field: 'name',
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Username',
				field: 'username',
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Email',
				field: 'email',
				sortable: true,
				filter: true,
				resizable: true,
				checkboxSelection: true
			},
			{
				headerName: 'Phone',
				field: 'phone',
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Website',
				field: 'website',
				sortable: true,
				filter: true,
				resizable: true
			}
		]
	};

	useEffect(() => {
		getRowData();
		return () => {
			console.log(users);
		};
	}, []);

	const getRowData = () => {
		axios
			.get('https://jsonplaceholder.typicode.com/users')
			.then(function(response) {
				// handle success
				setUsers(response.data);
			})
			.catch(function(error) {
				// handle error
				console.log(error);
			})
			.finally(function() {
				// always executed
				console.log('finally');
			});
	};

	const onGridReady = params => {
		console.log(params);
		setGridApi(params.api);
	};

	const onButtonClick = e => {
		console.log(e);
		const selectedNodes = gridApi.getSelectedNodes();
		console.log(selectedNodes);
		const selectedData = selectedNodes.map(node => node.data);
		console.log(selectedData);
		const selectedDataStringPresentation = selectedData
			.map(node => node.email + ' ' + node.username)
			.join(', ');
		alert(`Selected nodes: ${selectedDataStringPresentation}`);
	};

	return (
		<div>
			<h1>React ag grid</h1>
			<div
				className="ag-theme-blue"
				style={{
					height: '500px',
					width: 'auto'
				}}
			>
				<AgGridReact
					columnDefs={gridData.columnDefs}
					rowData={users}
					animateRows
					onGridReady={onGridReady}
				></AgGridReact>
				<button onClick={onButtonClick}>Get selected rows</button>
			</div>
		</div>
	);
}

export default App;
