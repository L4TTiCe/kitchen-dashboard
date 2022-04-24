<script lang="ts">
	import axios from 'axios';
	import { variables } from '$lib/env';
	import NutritionLabel from '$lib/components/nutrition/nutrition_label.svelte';

	let nutrition_data = [];

	let selected;

	let nutritionId: string = '';

	async function getNutritionData() {
		axios
			.get(variables.SERVER_URL + '/nutrition')
			.then((response) => {
				nutrition_data = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	getNutritionData();

	$: if (selected && selected._id != nutritionId) {
		nutritionId = selected._id;
	}
</script>

<div>
	<h2 class="text-2xl m-4">View Nutrition Data</h2>
	<form class="w-full max-w-xl mx-4">
		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-username"
				>
					Selected Nutrition Information
				</label>
				<select
					bind:value={selected}
					class="{!selected
						? 'border-red-500'
						: 'border-gray-200'} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					id="grid-username"
					placeholder="Choose group to update"
				>
					<option value="" selected disabled hidden>Choose Nutrition Information</option>
					{#each nutrition_data as nutrition}
						<option value={nutrition}>
							{nutrition.description}
							{#if nutrition.upc}[{nutrition.upc}]{/if}
						</option>
					{/each}
				</select>
				{#if !selected}
					<p class="text-red-500 text-xs italic ">Please choose item to Update</p>
					<p>Selected Nutrition {selected ? selected.description : '[waiting...]'}</p>
				{/if}
			</div>
		</div>
		{#if selected}
			<div class="content-center -mx-3 mb-6">
				<div class="p-3 w-full flex justify-center items-center">
					<NutritionLabel
						description={selected.description}
						serving_size={selected.serving_size}
						serving_unit={selected.serving_unit}
						calories={selected.calories}
						total_fat={selected.total_fat}
						saturated_fat={selected.saturated_fat}
						trans_fat={selected.trans_fat}
						cholesterol={selected.cholesterol}
						sodium={selected.sodium}
						total_carbohydrates={selected.total_carbohydrates}
						dietary_fiber={selected.dietary_fiber}
						total_sugar={selected.total_sugar}
						added_sugar={selected.added_sugar}
						protein={selected.protein}
					/>
				</div>
			</div>
		{/if}
	</form>
</div>
