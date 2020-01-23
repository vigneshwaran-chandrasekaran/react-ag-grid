import React, { useState, useEffect } from 'react';
import {
	AgGridBasic,
	AirDatepicker,
	DataTable,
	DataTableHooks,
} from './components';

function App() {
	return (
		<div>
			<DataTable />
			<DataTableHooks />
			{/* <AirDatepicker /> */}
			{/* <AgGridBasic /> */}
		</div>
	);
}

export default App;
