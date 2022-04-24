<script>
	import axios from 'axios';
	import { variables } from '$lib/env';
	import JsonTree from '$lib/components/JSONTree.svelte';

	let group_data = [];

	let selected;

	async function getGroups() {
		axios
			.get(variables.SERVER_URL + '/groups')
			.then((response) => {
				const data = response.data;
				group_data = data;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	getGroups();

	function handleSubmit() {
		alert(`Chose ${selected.name} with ID "${selected._id}"`);

		if (selected) {
			axios
				.delete(variables.SERVER_URL + '/groups/ById/' + selected._id)
				.then((response) => {
					alert('Delete Sucessful!');
					getGroups();
					selected = '';
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		}
	}
</script>

<div>
	<h2 class="text-2xl m-4">Delete Group</h2>
	<form class="w-full max-w-lg mx-4">
		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-username"
				>
					Selected Group
				</label>
				<select
					bind:value={selected}
					class="{!selected
						? 'border-red-500'
						: 'border-gray-200'} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					id="grid-username"
					placeholder="Choose group to update"
				>
					<option value="" selected disabled hidden>Choose Group</option>
					{#each group_data as group}
						<option value={group}>
							{group.name}
						</option>
					{/each}
				</select>
				{#if !selected}
					<p class="text-red-500 text-xs italic ">Please choose group to Delete</p>
					<p>Selected Group {selected ? selected.name : '[waiting...]'}</p>
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
						Delete Group
					</button>
				</div>
			</div>
		{/if}

		<JsonTree bind:json={selected} />
	</form>
</div>
