<script lang="ts">
	import axios from 'axios';
	import { variables } from '$lib/env';
	import type { Kitchen } from '$lib/models/Kitchen';
	import type { Location } from '$lib/models/Location';

	let kitchen_data = [];

	let selected_kitchen: Kitchen = null;
	let kitchenId: string = '';

	let name: string = null;

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

		status_message = '';
	}

	function handleSubmit() {
		let canPost: boolean = false;
		let location: Location = {};

		if (name) {
			canPost = true;
			location['name'] = name;
		}

		if (canPost) {
			axios
				.post(variables.SERVER_URL + '/kitchens/' + selected_kitchen._id + '/add', location)
				.then((response) => {
					alert('Kitchen Updated!');
					selected_kitchen = null;

					resetData();
					getKitchenData();
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		} else {
			status_message = "'Location Name' is a required field.";
		}
	}

	$: if (selected_kitchen && selected_kitchen._id != kitchenId) {
		resetData();

		kitchenId = selected_kitchen._id;
	}
</script>

<div>
	<h2 class="text-2xl m-4">Add Location to Kitchen</h2>

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
					bind:value={selected_kitchen}
					disabled={kitchen_data.length == 0}
					class="{!selected_kitchen
						? 'border-red-500'
						: 'border-gray-200'} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					id="grid-username"
					placeholder="Choose group to update"
				>
					<option value={null} selected
						>{kitchen_data.length == 0 ? 'No Kitchens' : 'Select Kitchen'}</option
					>
					{#each kitchen_data as kitchen}
						<option value={kitchen}>
							{kitchen.name}
						</option>
					{/each}
				</select>
				{#if !selected_kitchen}
					<p class="text-red-500 text-xs italic ">Please choose the item to update</p>
					<p>Selected Kitchen {selected_kitchen ? selected_kitchen.name : '[waiting...]'}</p>
				{/if}
			</div>
		</div>
	</form>

	{#if selected_kitchen}
		<form class="w-full max-w-lg mx-4">
			<div class="flex flex-wrap -mx-3 mb-6">
				<div class="w-full px-3">
					<label
						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="grid-name"
					>
						Location Name
					</label>
					<input
						bind:value={name}
						type="text"
						class="{name == ''
							? 'border-red-500'
							: 'border-gray-200'} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="grid-qty-u"
						placeholder="Master Refrigerator"
					/>
					{#if name == ''}
						<p class="text-red-500 text-xs italic ">Please fill out this field.</p>
					{/if}
				</div>
			</div>

			<div class="content-center -mx-3 mb-6">
				<div class="px-3">
					<button
						on:click={handleSubmit}
						class="block shadow tracking-wide bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
						type="button"
					>
						Add Location
					</button>
					{#if status_message != ''}
						<p class="text-red-500 text-s italic ">{status_message}</p>
					{/if}
				</div>
			</div>
		</form>
	{/if}
</div>
