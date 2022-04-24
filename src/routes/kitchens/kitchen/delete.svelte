<script lang="ts">
	import axios from 'axios';
	import { variables } from '$lib/env';
	import type { Kitchen } from '$lib/models/Kitchen';
	import JsonTree from '$lib/components/JSONTree.svelte';

	let kitchen_data = [];

	let selected: Kitchen = null;
	let kitchenId: string = '';

	let name: string = null;
	let using_since_s: string = null;

	let status_message = '';

	async function getKitchenData() {
		axios
			.get(variables.SERVER_URL + '/kitchens')
			.then((response) => {
				kitchen_data = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	getKitchenData();

	function resetData() {
		name = null;
		using_since_s = null;

		status_message = '';
	}

	function handleSubmit() {
		if (selected) {
			axios
				.delete(variables.SERVER_URL + '/kitchens/' + selected._id)
				.then((response) => {
					console.log(response);
					alert('Kitchen Deleted!');
					selected = null;

					resetData();
					getKitchenData();
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		}
	}

	$: if (selected && selected._id != kitchenId) {
		resetData();

		kitchenId = selected._id;
		name = selected.name;
		using_since_s = new Date(selected.using_since).toISOString().slice(0, 10);
	}
</script>

<div>
	<h2 class="text-2xl m-4">Delete Kitchen</h2>

	<form class="w-full max-w-lg mx-4">
		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-username"
				>
					Selected Kitchen
				</label>
				<select
					bind:value={selected}
					class="{!selected
						? 'border-red-500'
						: 'border-gray-200'} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					id="grid-username"
					placeholder="Choose group to update"
				>
					<option value={null} selected>Select Kitchen</option>
					{#each kitchen_data as kitchen}
						<option value={kitchen}>
							{kitchen.name}
							{#if kitchen.using_since}[{new Date(kitchen.using_since)
									.toISOString()
									.slice(0, 10)}]{/if}
						</option>
					{/each}
				</select>
				{#if !selected}
					<p class="text-red-500 text-xs italic ">Please choose the item to delete</p>
					<p>Selected Kitchen {selected ? selected.name : '[waiting...]'}</p>
				{/if}
			</div>
		</div>

		{#if selected}
			<div class="content-center -mx-3 mb-6">
				<div class="px-3">
					<button
						on:click={handleSubmit}
						class="block shadow tracking-wide bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
						type="button"
					>
						Delete Kitchen
					</button>
					{#if status_message != ''}
						<p class="text-red-500 text-s italic ">{status_message}</p>
					{/if}
				</div>
			</div>
		{/if}

		<JsonTree bind:json={selected}/>

	</form>
</div>
