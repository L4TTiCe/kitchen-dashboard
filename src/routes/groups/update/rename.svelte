<script lang="ts">
	import axios from 'axios';
	import { variables } from '$lib/env';
	import type { Group } from '$lib/models/Group';

	let group_data = [];

	let selected;

	let groupId: string = '';
	let groupName: string = '';

	let status_message = '';

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
	function validateGroup(group: Group): boolean {
		if (group.name == '') {
			return false;
		}
		return true;
	}

	function handleSubmit() {
		alert(`Chose ${selected.name} with ID "${selected._id}"`);

		console.log(variables.SERVER_URL + '/groups/ById/' + selected._id);

		if (selected) {
			let group: Group = {
				name: groupName
			};

			if (validateGroup(group)) {
				axios
					.put(variables.SERVER_URL + '/groups/ById/' + selected._id, group)
					.then((response) => {
						alert('Update Sucessful!');
						getGroups();
						groupName = '';
					})
					.catch((error) => {
						console.log(error);
						alert(error);
					});
			}
		}
	}

	$: if (selected && selected._id != groupId) {
		groupName = selected.name;
		groupId = selected._id;

		console.log('attaching...');
	}
</script>

<div>
	<h2 class="text-2xl m-4">Rename Group</h2>
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
					<p class="text-red-500 text-xs italic ">Please choose group to Update</p>
					<p>Selected Group {selected ? selected.name : '[waiting...]'}</p>
				{/if}
			</div>
		</div>
		{#if selected}
			<div class="flex flex-wrap -mx-3 mb-6">
				<div class="w-full px-3">
					<label
						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="grid-username"
					>
						Group Name
					</label>
					<input
						bind:value={groupName}
						class="{groupName == ''
							? 'border-red-500'
							: 'border-gray-200'} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="grid-username"
						type="text"
						placeholder="Test Kitchen"
					/>
					<p class="text-gray-600 text-xs italic">Enter the Groups New name!</p>
					{#if groupName == ''}
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
						Update Group
					</button>
					{#if status_message != ''}
						<p class="text-red-500 text-s italic ">{status_message}</p>
					{/if}
				</div>
			</div>
		{/if}
	</form>
</div>
