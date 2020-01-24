import React, { useState, useEffect } from 'react';
import {
	AgGridBasic,
	AirDatepicker,
	DataTable,
	DataTableHooks,
	DataTableHooksRemoteData,
} from './components';

function App() {
	return (
		<div>
			{/* <DataTable /> */}
			<DataTableHooksRemoteData />
			{/* <DataTableHooks /> */}
			{/* <AirDatepicker /> */}
			{/* <AgGridBasic /> */}
		</div>
	);
}

export default App;
