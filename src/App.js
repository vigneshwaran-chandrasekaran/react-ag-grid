import React, { useState, useEffect } from 'react';
import { AgGridBasic, AirDatepicker, DataTable } from './components';

function App() {
	return (
		<div>
			<DataTable />
			<AirDatepicker />
			{/* <AgGridBasic /> */}
		</div>
	);
}

export default App;
