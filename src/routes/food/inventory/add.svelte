<script lang="ts">
	import axios from 'axios';
	import { variables } from '$lib/env';
	import type { Group } from '$lib/models/Group';
	import type { Ownership } from '$lib/models/Ownership';
	import OwnershipForm from '$lib/components/ownership/ownership_form.svelte';
	import { getSubLocations } from '$lib/dao/locationsDao';

	function addDays(date, days) {
		var result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}

	let selected_group: Group = null;
	let groupId: string = null;

	let owner_id: string;
	let food_id: string;
	let quantity: number;
	let quantity_unit: string;
	let procured = new Date().toISOString().slice(0, 10);
	let expiry = addDays(procured, 14).toISOString().slice(0, 10);
	let location: Location;

	let status_message = '';
	let group_data = [];
	let users_data = [];
	let food_data = [];
	let location_data = [];

	function resetData() {
		owner_id = null;
		food_id = null;
		quantity = null;
		quantity_unit = null;
		procured = new Date().toISOString().slice(0, 10);
		expiry = addDays(procured, 14).toISOString().slice(0, 10);
		location = null;

		status_message = '';
	}

	async function getGroups() {
		await axios
			.get(variables.SERVER_URL + '/groups')
			.then((response) => {
				group_data = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function getUsers(group) {
		users_data = [];
		group.members.forEach((member) => {
			users_data.push(member);
		});
	}

	function getLocations(group) {
		location_data = [];

		if (!group.kitchen) {
			status_message = "This group doen't have a Kitchen attached yet!";
		} else {
			group.kitchen.locations.forEach((element) => {
				location_data = location_data.concat(getSubLocations(element));
			});
		}
	}

	async function getFoodData() {
		await axios
			.get(variables.SERVER_URL + '/food')
			.then((response) => {
				food_data = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	getGroups();
	getFoodData();

	function handleSubmit() {
		let canPost: boolean = false;
		let ownership: Ownership = {};

		if (quantity) {
			ownership['quantity'] = quantity;
		}
		if (quantity_unit) {
			ownership['quantity_unit'] = quantity_unit;
		}
		if (procured) {
			ownership['date_procured'] = procured;
		}
		if (expiry) {
			ownership['date_expiry'] = expiry;
		}
		if (location) {
			ownership['located_at'] = location;
		}

		if (food_id && owner_id) {
			canPost = true;
		}

		if (canPost) {
			axios
				.post(variables.SERVER_URL + '/users/byId/' + owner_id + '/inventory/' + food_id, ownership)
				.then((response) => {
					alert('Food Item Created!');
					selected_group = null;

					resetData();
					getGroups();
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		} else {
			status_message = "'Location Name' is a required field.";
		}
	}

	$: if (selected_group && selected_group._id != groupId) {
		resetData();
		getUsers(selected_group);
		getLocations(selected_group);

		groupId = selected_group._id;
	}
</script>

<div>
	<h2 class="text-2xl m-4">Add Food to Inventory</h2>

	<form class="w-full max-w-lg mx-4">
		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-username"
				>
					Group
				</label>
				<select
					bind:value={selected_group}
					disabled={group_data.length == 0}
					class="{!selected_group
						? 'border-red-500'
						: 'border-gray-200'} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					id="grid-owner"
				>
					<option value={null} selected disabled hidden
						>{group_data.length == 0 ? 'No Groups' : 'Choose Group'}</option
					>
					{#each group_data as group}
						<option value={group}>
							{group.name}
						</option>
					{/each}
				</select>
			</div>
		</div>

		{#if selected_group}
			<OwnershipForm
				bind:owner_id
				bind:food_id
				bind:quantity
				bind:quantity_unit
				bind:procured
				bind:expiry
				bind:location
				bind:status_message
				bind:users_data
				bind:food_data
				bind:location_data
				{handleSubmit}
				button_text={'Add Food to Inventory'}
			/>
		{/if}
	</form>
</div>
