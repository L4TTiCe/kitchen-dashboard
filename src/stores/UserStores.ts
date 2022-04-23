import { writable } from 'svelte/store';
import { variables } from '../lib/env';
import axios from 'axios';

export const users = writable([]);

export async function getUsers() {
	axios
		.get(variables.SERVER_URL + '/users')
		.then((response) => {
			const data = response.data;
			// let data = [];
			// data.forEach(kitchen => {
			//     data.push(kitchen);
			// });
			console.log(data);
			users.set(data);
		})
		.catch((error) => {
			console.log(error);
		});
}

getUsers();
