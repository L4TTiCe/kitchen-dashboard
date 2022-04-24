<script lang="ts">
	import axios from 'axios';
	import { variables } from '$lib/env';
	import type { Group } from '$lib/models/Group';
	import type { Ownership } from '$lib/models/Ownership';
	import OwnershipForm from '$lib/components/ownership/ownership_form.svelte';

	function addDays(date, days) {
		var result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}

	let selected_group: Group = null;
	let groupId: string = null;

	let selected_ownership: Ownership = null;
	let ownershipId: string = null;

	let owner_id: string;
	let food_id: string;
	let quantity: number;
	let quantity_unit: string;
	let procured = new Date().toISOString().slice(0, 10);
	let expiry = addDays(procured, 14).toISOString().slice(0, 10);
	let location: Location;

	let status_message = '';
	let item_status = '';
	let group_data = [];
	let users_data = [];
	let food_data = [];
	let location_data = [];
	let ownership_data = [];

	function resetData() {
		owner_id = null;
		food_id = null;
		quantity = null;
		quantity_unit = null;
		procured = new Date().toISOString().slice(0, 10);
		expiry = addDays(procured, 14).toISOString().slice(0, 10);
		location = null;

		status_message = '';
		item_status = '';
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

	function getSubLocationsContent(location) {
		let contents = [];
		if (location.subLocations.length > 0) {
			location.subLocations.forEach((subL) => {
				contents = contents.concat(getSubLocationsContent(subL));
			});
		}
		location.contents.forEach((content) => {
			content.location = location;
			contents.push(content);
		});
		return contents;
	}

	function getOwnerships(group) {
		ownership_data = [];

		if (!group.kitchen) {
			item_status = 'This Group has no attached Kitchen yet!';
		} else {
			group.kitchen.locations.forEach((element) => {
				ownership_data = ownership_data.concat(getSubLocationsContent(element));
			});
		}
	}

	function getUsers(group) {
		users_data = [];
		group.members.forEach((member) => {
			users_data.push(member);
		});
	}

	function getSubLocations(location) {
		let subLocations = [];
		if (location.subLocations.length > 0) {
			location.subLocations.forEach((subL) => {
				subLocations = subLocations.concat(getSubLocations(subL));
			});
		}
		subLocations.push(location);
		return subLocations;
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
			// @ts-ignore
			ownership['located_at'] = location._id;
		}

		if (food_id && owner_id) {
			canPost = true;
			// @ts-ignore
			ownership['owner'] = owner_id;
			// @ts-ignore
			ownership['food'] = food_id;
		}

		if (canPost) {
			axios
				.put(variables.SERVER_URL + '/inventory/ById/' + ownershipId, ownership)
				.then((response) => {
					alert('Food Item Updated!');
					selected_group = null;
					selected_ownership = null;
					groupId = null;
					ownershipId = null;

					resetData();
					getGroups();
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		} else {
			status_message = "'Owner' and 'Food' are required fields.";
		}
	}

	$: if (selected_group && selected_group._id != groupId) {
		console.log('Trigger 0');
		resetData();
		selected_ownership = null;
		ownershipId = null;

		getUsers(selected_group);
		getLocations(selected_group);
		getOwnerships(selected_group);

		groupId = selected_group._id;
	}

	$: if (selected_ownership && selected_ownership._id != ownershipId) {
		ownershipId = selected_ownership._id;

		resetData();
		owner_id = selected_ownership.owner._id;
		food_id = selected_ownership.food._id;
		quantity = selected_ownership.quantity;
		quantity_unit = selected_ownership.quantity_unit;
		procured = new Date(selected_ownership.date_procured).toISOString().slice(0, 10);
		expiry = new Date(selected_ownership.date_expiry).toISOString().slice(0, 10);
		// @ts-ignore
		location = selected_ownership.location;
	}
</script>

<div>
	<h2 class="text-2xl m-4">Add Food to Inventory</h2>

	<form class="w-full max-w-lg mx-4">
		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-group"
				>
					Group
				</label>
				<select
					bind:value={selected_group}
					class="{!selected_group
						? 'border-red-500'
						: 'border-gray-200'} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					id="grid-owner"
				>
					<option value={null} selected disabled hidden>Choose Group</option>
					{#each group_data as group}
						<option value={group}>
							{group.name}
						</option>
					{/each}
				</select>
			</div>
		</div>

		{#if selected_group}
			<div class="flex flex-wrap -mx-3 mb-6">
				<div class="w-full px-3">
					<label
						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="grid-item"
					>
						Selected Item
					</label>
					<select
						bind:value={selected_ownership}
						disabled={ownership_data.length == 0}
						class="{!selected_ownership
							? 'border-red-500'
							: 'border-gray-200'} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="grid-owner"
					>
						<option value={null} selected disabled hidden
							>{ownership_data.length == 0 ? 'No Items Available' : 'Choose Item'}</option
						>
						{#each ownership_data as o_item}
							<option value={o_item}>
								{o_item.food.name} [{o_item.owner.username}] @{o_item.location.name}
							</option>
						{/each}
					</select>
					{#if item_status != null}
						<p class="text-red-500 text-xs italic ">{item_status}</p>
					{/if}
				</div>
			</div>

			{#if selected_ownership}
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
					button_text={'Update Food in Inventory'}
				/>
			{/if}
		{/if}
	</form>
</div>
