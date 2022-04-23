<script lang="ts">
    import axios from "axios";
    import { variables } from '$lib/env';
    import type { Food } from '$lib/models/Food'
    import NutritionLabel from '$lib/components/nutrition/nutrition_label.svelte';
    import { placeholder } from '$lib/components/placeholders/NutritionData'

    export let owner_id: string;
    export let food_id: string;
    export let quantity: number;
    export let quantity_unit: string;
    export let procured;
    export let expiry;
    export let location: Location;

    export let status_message;
    export let users_data;
    export let food_data;
    export let location_data;

    export let handleSubmit;
    export let button_text;

    export let disable = false;

    let food: Food = null;

    async function getFoodById(id: string) {
        await axios.get(variables.SERVER_URL + '/food/' + id)
            .then(response => {
                food = response.data;
            }).catch(error => {
                console.log(error);
            });
    }

    $: if(food_id) {
        getFoodById(food_id)
    }
</script>
    

<div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
        <label 
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
            for="grid-username">
            Owner
        </label>
        <select 
            bind:value={owner_id} 
            disabled={users_data.length == 0 || disable} 
            class="{!owner_id ? "border-red-500" : "border-gray-200"} { users_data.length == 0 ? "disabled" : ""} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            id="grid-owner">

            <option value={null} selected={!owner_id} disabled hidden>{users_data.length==0 ? "No Users in this Group" : "Choose User"}</option>
            {#each users_data as user}
                <option value={user._id}>
                    {user.username}
                </option>
            {/each}

        </select>
    </div>
</div>

<div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
        <label 
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
            for="grid-food">
            Selected Food
        </label>

        <select 
            bind:value={food_id} 
            disabled = {disable}
            class="{!food_id ? "border-red-500" : "border-gray-200"} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-food">
            <option value={null} selected disabled hidden>Select Food</option>
            {#each food_data as food}
                <option value={food._id}>
                    {food.name} {#if food.upc}[{food.upc}]{/if}
                </option>
            {/each}
        </select>

    </div>
</div>

<div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label 
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
            for="grid-qty">
        Quantity
        </label>
        <input 
            bind:value={quantity} 
            disabled = {disable}
            type="number" 
            min = 0
            max = 100000
            class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            id="grid-qty" 
            placeholder='0'>
    </div>

    <div class="w-full md:w-1/2 px-3">
        <label 
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
            for="grid-qty-u">
        Quantity Unit
        </label>
        <input 
            bind:value={quantity_unit} 
            disabled = {disable}
            type="text" 
            class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            id="grid-qty-u" 
            placeholder='pieces'>
    </div>

</div>

<div class="flex flex-wrap -mx-3 mb-6">

    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label 
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
            for="grid-procured">
        Date Procured
        </label>
        <input 
            bind:value={procured} 
            disabled = {disable}
            type="date" 
            class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            id="grid-procured">
    </div>

    <div class="w-full md:w-1/2 px-3">
        <label 
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
            for="grid-expiry">
        Expiry Date
        </label>
        <input 
            bind:value={expiry} 
            disabled = {disable}
            type="date" 
            class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            id="grid-expiry">
    </div>
</div>

<div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
        <label 
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
            for="grid-location">
            Location
        </label>
        <select 
            bind:value={location} 
            disabled={location_data.length==0 || disable} 
            class="{!location ? "border-red-500" : "border-gray-200"} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            id="grid-location">
            <option value={null} disabled hidden>{location_data.length == 0 ? "No Available Locations" : "Select Location"}</option>
            {#each location_data as location_d}
                <option value={location_d}>
                    {location_d.name}
                </option>
            {/each}
        </select>
    </div>
</div>

<div class="content-center -mx-3 mb-6">
    <div class="px-3">
        <button 
            on:click={handleSubmit} 
            class="{disable ? "bg-red-500 hover:bg-red-400" : "bg-blue-500 hover:bg-blue-400"}block shadow tracking-wide focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4" 
            type="button">
            {button_text}
        </button>
        {#if status_message != ''}
        <p class="text-red-500 text-s italic ">{status_message}</p>
        {/if}
    </div>
</div>

{#if food}
{#if food.nutrition}
<div class="w-full max-w-lg mx-4 flex justify-center items-center">
    <NutritionLabel 
        description={food.nutrition.description} 
        serving_size={food.nutrition.serving_size} 
        serving_unit={food.nutrition.serving_unit} 
        calories={food.nutrition.calories} 
        total_fat={food.nutrition.total_fat} 
        saturated_fat={food.nutrition.saturated_fat} 
        trans_fat={food.nutrition.trans_fat} 
        cholesterol={food.nutrition.cholesterol} 
        sodium={food.nutrition.sodium} 
        total_carbohydrates={food.nutrition.total_carbohydrates}
        dietary_fiber={food.nutrition.dietary_fiber} 
        total_sugar={food.nutrition.total_sugar} 
        added_sugar={food.nutrition.added_sugar} 
        protein={food.nutrition.protein} 
        placeholder={placeholder}/>
</div>
{/if}
{/if}
