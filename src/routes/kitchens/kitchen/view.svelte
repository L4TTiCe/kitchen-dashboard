<script lang="ts">
	import axios from 'axios';
	import { variables } from '$lib/env';
	import type { Kitchen } from '$lib/models/Kitchen';
	import renderjson from '$lib/renderjson';

	let kitchen_data = [];

	let selected: Kitchen = null;
	let kitchenId: string = '';

	let JSONTree;

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

	function removeAllChildNodes(parent) {
		while (parent.firstChild) {
			parent.removeChild(parent.firstChild);
		}
	}

	$: if (selected && selected._id != kitchenId) {
		kitchenId = selected._id;
		removeAllChildNodes(JSONTree);
		JSONTree.appendChild(renderjson(selected));
	}
</script>

<div>
	<h2 class="text-2xl m-4">View Kitchen</h2>

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
						</option>
					{/each}
				</select>
				{#if !selected}
					<p class="text-red-500 text-xs italic ">Please choose the item to update</p>
					<p>Selected Kitchen {selected ? selected.name : '[waiting...]'}</p>
				{/if}
			</div>
		</div>
	</form>

	<!-- {#if selected} -->
	<div bind:this={JSONTree} />
	<!-- {/if} -->
</div>
