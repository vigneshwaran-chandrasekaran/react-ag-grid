import React, { useState, useEffect } from 'react';
import {
	AgGridBasic,
	AirDatepicker,
	DataTable,
	DataTableHooks,
	DataTableHooksRemoteData,
	ServerData,
} from './components';

function App() {
	return (
		<div>
			{/* <DataTable /> */}
			{/* <DataTableHooksRemoteData /> */}
			<DataTableHooks />
			<hr />
			<ServerData />
			{/* <AirDatepicker /> */}
			{/* <AgGridBasic /> */}
		</div>
	);
}

export default App;
