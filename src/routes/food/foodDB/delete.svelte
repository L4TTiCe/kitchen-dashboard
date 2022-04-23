<script context="module">
	import axios from 'axios';
	import { variables } from '$lib/env';

	export async function load() {
		const response = await axios.get(variables.SERVER_URL + '/food');

		return {
			props: {
				food_data: response.data
			}
		};
	}
</script>

<script lang="ts">
	import NutritionLabel from '$lib/components/nutrition/nutrition_label.svelte';
	export let food_data;

	let selected;

	async function getFoodData() {
		axios
			.get(variables.SERVER_URL + '/food')
			.then((response) => {
				food_data = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function handleSubmit() {
		if (selected) {
			axios
				.delete(variables.SERVER_URL + '/food/' + selected._id)
				.then((response) => {
					alert('Delete Sucessful!');
					getFoodData();
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
	<h2 class="text-2xl m-4">Remove Food from FoodDB</h2>
	<form class="w-full max-w-lg mx-4">
		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-username"
				>
					Selected Food
				</label>
				<select
					bind:value={selected}
					class="{!selected
						? 'border-red-500'
						: 'border-gray-200'} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					id="grid-username"
					placeholder="Choose group to update"
				>
					<option value="" selected disabled hidden>Select Food</option>
					{#each food_data as food}
						<option value={food}>
							{food.name}
							{#if food.upc}[{food.upc}]{/if}
						</option>
					{/each}
				</select>
				{#if !selected}
					<p class="text-red-500 text-xs italic ">Please choose the item to Delete</p>
					<p>Selected Food {selected ? selected.name : '[waiting...]'}</p>
				{/if}
			</div>
		</div>
		{#if selected}
			<div class="content-center -mx-3 mb-6">
				<div class="px-3 ">
					<button
						on:click={handleSubmit}
						class="block shadow tracking-wide bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
						type="button"
					>
						Delete Food
					</button>
				</div>
				{#if selected.nutrition}
					<div class="p-3 w-full flex justify-center items-center">
						<NutritionLabel
							description={selected.nutrition.description}
							serving_size={selected.nutrition.serving_size}
							serving_unit={selected.nutrition.serving_unit}
							calories={selected.nutrition.calories}
							total_fat={selected.nutrition.total_fat}
							saturated_fat={selected.nutrition.saturated_fat}
							trans_fat={selected.nutrition.trans_fat}
							cholesterol={selected.nutrition.cholesterol}
							sodium={selected.nutrition.sodium}
							total_carbohydrates={selected.nutrition.total_carbohydrates}
							dietary_fiber={selected.nutrition.dietary_fiber}
							total_sugar={selected.nutrition.total_sugar}
							added_sugar={selected.nutrition.added_sugar}
							protein={selected.nutrition.protein}
						/>
					</div>
				{/if}
			</div>
		{/if}
	</form>
</div>
