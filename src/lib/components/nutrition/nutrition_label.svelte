<script lang="ts">
	import type { Nutrition } from '$lib/models/Nutrition';

	export let serving_size: number;
	export let serving_unit: string;
	export let calories: number;
	export let total_fat: number;
	export let saturated_fat: number;
	export let trans_fat: number;
	export let cholesterol: number;
	export let sodium: number;
	export let total_carbohydrates: number;
	export let dietary_fiber: number;
	export let total_sugar: number;
	export let added_sugar: number;
	export let protein: number;
	export let description: string;
	export let placeholder: Nutrition = {
		upc: '70501635720',
		description: 'Tomato 🍅',
		serving_size: 0,
		serving_unit: 'cups (32g)',
		calories: 0,
		total_fat: 0,
		saturated_fat: 0,
		trans_fat: 0,
		cholesterol: 0,
		sodium: 0,
		total_carbohydrates: 0,
		dietary_fiber: 0,
		total_sugar: 0,
		added_sugar: 0,
		protein: 0
	};
</script>

<!-- https://tailwindcomponents.com/component/food-nutrition-label -->
<!-- https://www.fda.gov/food/food-labeling-nutrition/changes-nutrition-facts-label -->
<div class="p-1 border-2 border-black font-sans w-72">
	<div class="text-4xl font-extrabold leading-none">Nutrition Facts</div>
	<!-- <div class="leading-snug">8 servings per container</div> -->
	<div class="leading-snug">{description}</div>
	<div class="flex justify-between font-bold border-b-8 border-black">
		<div>Serving size</div>
		<div>
			{#if serving_size}{serving_size}{:else}{placeholder.serving_size}{/if}
			{#if serving_unit}{serving_unit}{:else}{placeholder.serving_unit}{/if}
		</div>
	</div>
	<div class="flex justify-between items-end font-extrabold">
		<div>
			<div class="font-bold">Amount per serving</div>
			<div class="text-4xl">Calories</div>
		</div>
		<div class="text-5xl">
			{#if calories}{calories}{:else}{placeholder.calories}{/if}
		</div>
	</div>
	<div class="border-t-4 border-black text-sm pb-1">
		<div class="text-right font-bold pt-1 pb-1">% Daily value*</div>
		<hr class="border-gray-500" />
		<div class="flex justify-between">
			<div>
				<span class="font-bold">Total Fat</span>
				{#if total_fat}{total_fat}{:else}{placeholder.total_fat}{/if}g
			</div>
			<div class="font-bold">
				{#if total_fat}{((Number(total_fat) / 78) * 100).toFixed(0)}{:else}0{/if}%
			</div>
		</div>
		<hr class="border-gray-500" />
		<div class="flex justify-between pl-4">
			<div>
				Saturated Fat {#if saturated_fat}{saturated_fat}{:else}{placeholder.saturated_fat}{/if}g
			</div>
			<div class="font-bold">
				{#if saturated_fat}{((Number(saturated_fat) / 20) * 100).toFixed(0)}{:else}0{/if}%
			</div>
		</div>
		<hr class="border-gray-500" />
		<div class="pl-4">
			<span class="italic">Trans Fat</span>
			{#if trans_fat}{trans_fat}{:else}{placeholder.trans_fat}{/if}g
		</div>
		<hr class="border-gray-500" />
		<div class="flex justify-between">
			<div>
				<span class="font-bold">Cholesterol</span>
				{#if cholesterol}{cholesterol}{:else}{placeholder.cholesterol}{/if}mg
			</div>
			<div class="font-bold">
				{#if cholesterol}{((Number(cholesterol) / 300) * 100).toFixed(0)}{:else}0{/if}%
			</div>
		</div>
		<hr class="border-gray-500" />
		<div class="flex justify-between">
			<div>
				<span class="font-bold">Sodium</span>
				{#if sodium}{sodium}{:else}{placeholder.sodium}{/if}mg
			</div>
			<div class="font-bold">
				{#if sodium}{((Number(sodium) / 2300) * 100).toFixed(0)}{:else}0{/if}%
			</div>
		</div>
		<hr class="border-gray-500" />
		<div class="flex justify-between">
			<div>
				<span class="font-bold">Total Carbohydrate</span>
				{#if total_carbohydrates}{total_carbohydrates}{:else}{placeholder.total_carbohydrates}{/if}g
			</div>
			<div class="font-bold">
				{#if total_carbohydrates}{((Number(total_carbohydrates) / 275) * 100).toFixed(
						0
					)}{:else}0{/if}%
			</div>
		</div>
		<hr class="border-gray-500" />
		<div class="flex justify-between">
			<div class="pl-4">
				Dietary Fiber {#if dietary_fiber}{dietary_fiber}{:else}{placeholder.dietary_fiber}{/if}g
			</div>
			<div class="font-bold">
				{#if dietary_fiber}{((Number(dietary_fiber) / 28) * 100).toFixed(0)}{:else}0{/if}%
			</div>
		</div>
		<hr class="border-gray-500" />
		<div class="pl-4">
			Total Sugar {#if total_sugar}{total_sugar}{:else}{placeholder.total_sugar}{/if}g
			<!-- <div class="pl-4">
                <hr class="border-gray-500"/>
                <div class="flex justify-between">
                    <div>Includes 10g Added Sugars</div>
                    <div class="font-bold">20%</div>
                </div>
            </div> -->
		</div>
		<hr class="border-gray-500" />
		<div class="pl-8 flex justify-between">
			<span
				>Includes {#if added_sugar}{added_sugar}{:else}{placeholder.added_sugar}{/if}g Added Sugars</span
			>
			<div class="font-bold">
				{#if added_sugar}{((Number(added_sugar) / 50) * 100).toFixed(0)}{:else}0{/if}%
			</div>
		</div>
		<hr class="border-gray-500" />
		<div class="flex justify-between">
			<div>
				<span class="font-bold">Protein</span>
				{#if protein}{protein}{:else}{placeholder.protein}{/if}g
			</div>
			<div class="font-bold">
				{#if protein}{((Number(protein) / 50) * 100).toFixed(0)}{:else}0{/if}%
			</div>
		</div>
		<!-- </div>
    <div class="border-t-8 border-black pt-1 text-sm">
        <div class="flex justify-between">
            <div>Vitamin D 2mcg</div>
            <div>10%</div>
        </div>
        <hr class="border-gray-500"/>
        <div class="flex justify-between">
            <div>Calcium 260mg</div>
            <div>20%</div>
        </div>
        <hr class="border-gray-500"/>
        <div class="flex justify-between">
            <div>Iron 8mg</div>
            <div>45%</div>
        </div>
        <hr class="border-gray-500"/>
        <div class="flex justify-between">
            <div>Potassium 240mg</div>
            <div>6%</div>
        </div> -->
		<div class="border-t-4 border-black flex leading-none text-xs pt-2 pb-1">
			<div class="pr-1">*</div>
			<div>
				The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a
				daily diet. 2,000 calories a day is used for general nutrition advice.
			</div>
		</div>
	</div>
</div>
