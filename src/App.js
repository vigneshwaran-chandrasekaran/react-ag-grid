import React, { useState, useEffect } from 'react';
import {
	AgGridBasic,
	AirDatepicker,
	DataTable,
	DataTableHooks,
	DataTableHooksRemoteData,
	ServerData,
	DataTableServerSidePagination,
} from './components';

function App() {
	return (
		<div>
			{/* <DataTable /> */}
			{/* <DataTableHooksRemoteData /> */}
			<DataTableServerSidePagination />
			<DataTableHooks />
			<hr />
			<ServerData />
			{/* <AirDatepicker /> */}
			{/* <AgGridBasic /> */}
		</div>
	);
}

export default App;
