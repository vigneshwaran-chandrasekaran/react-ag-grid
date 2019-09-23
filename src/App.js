import React, { useState } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';

function App() {

  const gridData = {
    columnDefs: [{
      headerName: "Make", field: "make", sortable: true, filter: true
    }, {
      headerName: "Model", field: "model", sortable: true, filter: true
    }, {
      headerName: "Price amount", field: "price", sortable: true, filter: true
    }],
    rowData: [{
      make: "Toyota", model: "Celica", price: 35000
    }, {
      make: "Ford", model: "Mondeo", price: 32000
    }, {
      make: "Porsche", model: "Boxter", price: 72000
    }]
  };

  return (
    <div className="App">
      <h1>React ag grid</h1>
      <div
        className="ag-theme-blue"
        style={{
          height: '500px',
          width: '600px'
        }}
      >
        <AgGridReact
          columnDefs={gridData.columnDefs}
          rowData={gridData.rowData}>
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;
