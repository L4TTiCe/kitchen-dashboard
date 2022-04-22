<script lang="ts">
    import axios from "axios";
    import { variables } from '$lib/env';
    import type { User } from '$lib/models/User'
    import type { Food } from '$lib/models/Food'

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    let owner: User;
    let food: Food;
    let quantity: number;
    let quantity_unit: string;
    let procured = new Date().toISOString().slice(0, 10);
    let expiry = addDays(procured, 14).toISOString().slice(0, 10);
    console.log(procured)

    let status_message = '';
    let users_data = [];
    let food_data = [];

    async function getUsers() {
        axios.get(variables.SERVER_URL + '/users')
        .then(response => {
            users_data = response.data;
        }).catch(error => {
            console.log(error);
        });
    }

    async function getFoodData() {
        axios.get(variables.SERVER_URL + '/food')
        .then(response => {
            food_data = response.data;
        }).catch(error => {
            console.log(error);
        });
    }

    getUsers();
    getFoodData();

    function handleSubmit() {

    }
</script>

<div>
    <h2 class="text-2xl m-4">Add Food to Inventory</h2>
    <form class="w-full max-w-lg mx-4">
        
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-username">
                  Owner
                </label>
                <select bind:value={owner} class="{!owner ? "border-red-500" : "border-gray-200"} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-owner">
                    <option value={null} selected disabled hidden>Choose User</option>
                    {#each users_data as user}
                        <option value={user}>
                            {user.username}
                        </option>
                    {/each}
                </select>
            </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-username">
                  Selected Food
                </label>
                <select bind:value={food} class="{!food ? "border-red-500" : "border-gray-200"} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-food">
                    <option value={null} selected disabled hidden>Select Food</option>
                    {#each food_data as food}
                        <option value={food}>
                            {food.name} {#if food.upc}[{food.upc}]{/if}
                        </option>
                    {/each}
                </select>
            </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-qty">
                Quantity
                </label>
                <input bind:value={quantity} 
                    type="number" 
                    min = 0
                    max = 100000
                    class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-qty" placeholder='0'>
            </div>
            <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-qty-u">
                Quantity Unit
                </label>
                <input bind:value={quantity_unit} 
                    type="text" 
                    class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-qty-u" placeholder='pieces'>
            </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-procured">
                Date Procured
                </label>
                <input bind:value={procured} 
                    type="date" 
                    class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-procured">
            </div>
            <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-expiry">
                Expiry Date
                </label>
                <input bind:value={expiry} 
                    type="date" 
                    class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-expiry">
            </div>
        </div>

        <div class="content-center -mx-3 mb-6">
            <div class="px-3">
                <button on:click={handleSubmit} class="block shadow tracking-wide bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4" type="button">
                    Add Food to Inventory
                </button>
                {#if status_message != ''}
                <p class="text-red-500 text-s italic ">{status_message}</p>
                {/if}
            </div>
        </div>
    </form>
</div>