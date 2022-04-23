<script lang="ts">
	import type { Nutrition } from '$lib/models/Nutrition';
	import { placeholder } from '$lib/components/placeholders/NutritionData';

	export let upc: string;
	export let name: string;
	export let nutrition: Nutrition;

	export let nutrition_data = [];
</script>

<div class="flex flex-wrap -mx-3 mb-6">
	<div class="w-full px-3">
		<label
			class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
			for="grid-username"
		>
			UPC
		</label>
		<input
			bind:value={upc}
			class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
			id="grid-upc"
			type="text"
			placeholder={placeholder.upc}
		/>
		<p class="text-gray-600 text-xs italic">
			Does this product have a Universal Product Code (UPC)?
		</p>
	</div>
</div>
<div class="flex flex-wrap -mx-3 mb-6">
	<div class="w-full px-3">
		<label
			class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
			for="grid-username"
		>
			Name
		</label>
		<input
			bind:value={name}
			class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
			id="grid-upc"
			type="text"
			placeholder={placeholder.description}
		/>
		<p class="text-gray-600 text-xs italic">Name the product. (Could be a nickname too...)</p>
	</div>
</div>
<div class="flex flex-wrap -mx-3 mb-6">
	<div class="w-full px-3">
		<label
			class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
			for="grid-username"
		>
			Nutrition Information
		</label>
		<select
			bind:value={nutrition}
			class="{!nutrition
				? 'border-red-500'
				: 'border-gray-200'} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
			id="grid-username"
			placeholder="Choose group to update"
		>
			<option value={null} selected>None</option>
			{#each nutrition_data as nutrition_i}
				<option value={nutrition_i}>
					{nutrition_i.description}
					{#if nutrition_i.upc}[{nutrition_i.upc}]{/if}
				</option>
			{/each}
		</select>
	</div>
</div>
