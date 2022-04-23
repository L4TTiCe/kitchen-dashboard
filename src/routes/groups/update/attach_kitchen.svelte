<script lang="ts">
	import axios from 'axios';
	import { variables } from '$lib/env';

	let group_data = [];
	let kitchen_data = [];

	let availableGroups = [];
	let availableKitchens = [];

	let selected_group = null;
	let selected_kitchen = null;

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

	async function getKitchens() {
		await axios
			.get(variables.SERVER_URL + '/kitchens')
			.then((response) => {
				kitchen_data = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async function removeFilled() {
		await getGroups();
		await getKitchens();

		availableGroups = [];
		let filledGroups = [];
		availableKitchens = [];
		let kitchensInUse = [];

		group_data.forEach((element) => {
			if (!element.kitchen) {
				availableGroups.push(element);
			} else {
				filledGroups.push(element);
				kitchensInUse.push(element.kitchen);
			}
		});

		availableKitchens = kitchen_data.filter(
			(kitchen) => !kitchensInUse.map((kitchen) => kitchen.name).includes(kitchen.name)
		);
	}

	removeFilled();

	function handleSubmit() {
		if (selected_group && selected_kitchen) {
			let group = {};
			group['kitchen'] = selected_kitchen;

			axios
				.put(variables.SERVER_URL + '/groups/ById/' + selected_group._id, group)
				.then((response) => {
					alert('Kitchen Attached to Group!');
					removeFilled();
					selected_kitchen = null;
					selected_group = null;
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		}
	}
</script>

<div>
	<h2 class="text-2xl m-4">Attach Kitchen to Group</h2>
	<form class="w-full max-w-lg mx-4">
		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-group"
				>
					Selected Group
				</label>
				<select
					bind:value={selected_group}
					class="{!selected_group
						? 'border-red-500'
						: 'border-gray-200'} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					id="grid-group"
				>
					<option value="" selected disabled hidden>Choose Group</option>
					{#each availableGroups as group}
						<option value={group}>
							{group.name}
						</option>
					{/each}
				</select>

				{#if !selected_group}
					<p class="text-red-500 text-xs italic ">Please choose group to attach the Kitchen to.</p>
					<p>Selected Group {selected_group ? selected_group.name : '[waiting...]'}</p>
				{/if}
			</div>
		</div>

		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-username"
				>
					Selected Kitchen
				</label>

				<select
					bind:value={selected_kitchen}
					disabled={availableKitchens.length == 0}
					class="{!selected_kitchen
						? 'border-red-500'
						: 'border-gray-200'} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					id="grid-kitchen"
					placeholder="Choose group to update"
				>
					<option value="" selected disabled hidden
						>{availableKitchens.length == 0 ? 'No Kitchens Available' : 'Choose Kitchen'}</option
					>
					{#each availableKitchens as kitchen}
						<option value={kitchen}>
							{kitchen.name}
						</option>
					{/each}
				</select>

				{#if !selected_kitchen}
					<p class="text-red-500 text-xs italic ">Please select Kitchen to Attach</p>
					<p>Selected Kitchen {selected_kitchen ? selected_kitchen.username : '[waiting...]'}</p>
				{/if}
			</div>
		</div>

		{#if selected_group && selected_kitchen}
			<div class="content-center -mx-3 mb-6">
				<div class="px-3">
					<button
						on:click={handleSubmit}
						class="block shadow tracking-wide bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
						type="button"
					>
						Attach Kitchen
					</button>
				</div>
			</div>
		{/if}
	</form>
</div>
