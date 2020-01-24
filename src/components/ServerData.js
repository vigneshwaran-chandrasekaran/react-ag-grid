import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import DataTableHooksRemoteData from './DataTableHooksRemoteData';

export default function ServerData() {
	const [data, setData] = useState([]);

	useEffect(() => {
		axios
			.get('https://jsonplaceholder.typicode.com/posts')
			.then(function(response) {
				// handle success
				console.log(response);
				setData(response.data);
			})
			.catch(function(error) {
				// handle error
				console.log(error);
			})
			.then(function() {
				// always executed
			});
		return () => {
			// cleanup;
		};
	}, []);

	return (
		<div>
			{data.length > 0 && <DataTableHooksRemoteData userData={data} />}
		</div>
	);
}
