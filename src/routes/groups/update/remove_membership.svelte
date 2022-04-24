<script lang="ts">
	import axios from 'axios';
	import { variables } from '$lib/env';

	let users_data = [];
	let group_data = [];

	let selected_group;
	let selected_user;

	async function getGroups() {
		axios
			.get(variables.SERVER_URL + '/groups')
			.then((response) => {
				group_data = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	// async function getUsers() {
	//     axios.get(variables.SERVER_URL + '/users')
	//     .then(response => {
	//         users_data = response.data;
	//     }).catch(error => {
	//         console.log(error);
	//     });
	// }

	async function getUsersFromGroup(gid: string) {
		axios
			.get(variables.SERVER_URL + '/groups/ById/' + gid)
			.then((response) => {
				users_data = response.data.members;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	// getUsers();
	getGroups();

	$: if (selected_group) {
		getUsersFromGroup(selected_group._id);
	}

	function handleSubmit() {
		if (selected_group) {
			axios
				.delete(
					variables.SERVER_URL + '/groups/ById/' + selected_group._id + '/add/' + selected_user._id
				)
				.then((response) => {
					alert('Membership Removed!');
					// getUsers();
					getGroups();
					selected_user = '';
					selected_group = '';
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		}
	}
</script>

<div>
	<h2 class="text-2xl m-4">Remove Member From Group</h2>
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
					bind:value={selected_group}
					class="{!selected_group
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
				{#if !selected_group}
					<p class="text-red-500 text-xs italic ">Please choose group to remove the user from.</p>
					<p>Selected Group {selected_group ? selected_group.name : '[waiting...]'}</p>
				{/if}
			</div>
		</div>
		{#if selected_group}
			<div class="flex flex-wrap -mx-3 mb-6">
				<div class="w-full px-3">
					<label
						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="grid-username"
					>
						Selected User
					</label>
					<select
						bind:value={selected_user}
						disabled={users_data.length == 0}
						class="{!selected_user
							? 'border-red-500'
							: 'border-gray-200'} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="grid-username"
						placeholder="Choose group to update"
					>
						<option value="" selected disabled hidden
							>{users_data.length == 0 ? 'No Members' : 'Choose User'}</option
						>
						{#each users_data as user}
							<option value={user}>
								{user.username}
							</option>
						{/each}
					</select>
					{#if !selected_user}
						<p class="text-red-500 text-xs italic ">Please select user to Delete</p>
						<p>Selected User {selected_user ? selected_user.username : '[waiting...]'}</p>
					{/if}
				</div>
			</div>
		{/if}
		{#if selected_group && selected_user}
			<div class="content-center -mx-3 mb-6">
				<div class="px-3">
					<button
						on:click={handleSubmit}
						class="block shadow tracking-wide bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
						type="button"
					>
						Revoke Membership
					</button>
				</div>
			</div>
		{/if}
	</form>
</div>

<!-- <h2 class="text-lg font-semibold">Select Group</h2>

<form on:submit|preventDefault={handleSubmit}>
    <div class="b-2 p-2">
        <select class="w-60 border p-2 b-2" bind:value={selected}>
            {#each group_data as group}
                <option value={group}>
                    {group.name}
                </option>
            {/each}
        </select>

        <button type=submit class="b-4 p-2 bg-red-500 rounded text-white">
            Delete
        </button>
    </div>
</form>

<p>Selected Group {selected ? selected.name : '[waiting...]'}</p> -->
