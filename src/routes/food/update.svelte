<script context="module">
    import axios from "axios";
    import { variables } from '$lib/env'

    export async function load() {
    const response = await axios.get(variables.SERVER_URL + '/food')
  
    return {
        props: {
            food_data: response.data,
        }
      };
    }
</script>

<script lang="ts">
    import NutritionLabel from '../../components/nutrition/nutrition_label.svelte';
    import type { Nutrition } from 'src/models/Nutrition';
    import type { Food } from 'src/models/Food';
    import FoodForm from '../../components/food/food_form.svelte';

    export let food_data;

    let selected;

    let fid = null;
    let name: string = null;
    let upc:string = null;
    let nutrition: Nutrition = null;

    async function getFoodData() {
        axios.get(variables.SERVER_URL + '/food')
        .then(response => {
            food_data = response.data;
        }).catch(error => {
            console.log(error);
        });
    }

    let nutrition_data = [];

    async function getNutritionData() {
        axios.get(variables.SERVER_URL + '/nutrition')
        .then(response => {
            nutrition_data = response.data;
        }).catch(error => {
            console.log(error);
        });
    }

    getNutritionData();

    function handleSubmit() {
        let canPost: boolean = false;
        let food: Food = {}

        food["name"] = name;
        food["upc"] = upc;
        food["nutrition"] = nutrition;

        if (name || upc) {
            canPost = true;
        }

        if (canPost) {
            axios.put(variables.SERVER_URL + '/food/' + selected._id, food)
                .then(response => {
                    console.log(response)
                    alert('Food Updated!')
                    selected = null;

                    resetData();
                    getFoodData();
                }).catch(error => {
                    console.log(error);
                    alert(error)
                });
        }
    }

    function resetData() {
        fid = null;
        name = null;
        upc = null;
        nutrition = null;
    }

    $: if(selected && selected._id != fid) {
        resetData();

        fid = selected._id;
        name = selected.name;
        upc = selected.upc;
        nutrition = selected.nutrition;
    }
</script>

<div>
    <h2 class="text-2xl m-4">Update Food in FoodDB</h2>
    <form class="w-full max-w-lg mx-4">
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-username">
                  Selected Food
                </label>
                <select bind:value={selected} class="{!selected ? "border-red-500" : "border-gray-200"} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-username" placeholder="Choose group to update">
                    <option value={null} selected>Select Food</option>
                    {#each food_data as food}
                        <option value={food}>
                            {food.name} {#if food.upc}[{food.upc}]{/if}
                        </option>
                    {/each}
                </select>
                {#if !selected}
                    <p class="text-red-500 text-xs italic ">Please choose the item to update</p>
                    <p>Selected Food {selected ? selected.name : '[waiting...]'}</p>
                {/if}
            </div>
        </div>
        {#if selected}
        <form class="w-full max-w-lg mx-4">
        
            <FoodForm bind:name={name} bind:nutrition={nutrition} bind:upc={upc} bind:nutrition_data={nutrition_data}/>

        </form>
        <div class="content-center -mx-3 mb-6">
            <div class="px-3 ">
                <button on:click={handleSubmit} class="block shadow tracking-wide bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4" type="button">
                    Update Food
                </button>
            </div>
            <div class="p-3 w-full flex justify-center items-center">
            {#if selected.nutrition}
                <NutritionLabel description={selected.nutrition.description} serving_size={selected.nutrition.serving_size} serving_unit={selected.nutrition.serving_unit} calories={selected.nutrition.calories} 
                total_fat={selected.nutrition.total_fat} saturated_fat={selected.nutrition.saturated_fat} trans_fat={selected.nutrition.trans_fat} cholesterol={selected.nutrition.cholesterol} sodium={selected.nutrition.sodium} total_carbohydrates={selected.nutrition.total_carbohydrates}
                dietary_fiber={selected.nutrition.dietary_fiber} total_sugar={selected.nutrition.total_sugar} added_sugar={selected.nutrition.added_sugar} protein={selected.nutrition.protein}/>
            {/if}
            {#if nutrition}
                <NutritionLabel description={nutrition.description} serving_size={nutrition.serving_size} serving_unit={nutrition.serving_unit} calories={nutrition.calories} 
                    total_fat={nutrition.total_fat} saturated_fat={nutrition.saturated_fat} trans_fat={nutrition.trans_fat} cholesterol={nutrition.cholesterol} sodium={nutrition.sodium} total_carbohydrates={nutrition.total_carbohydrates}
                    dietary_fiber={nutrition.dietary_fiber} total_sugar={nutrition.total_sugar} added_sugar={nutrition.added_sugar} protein={nutrition.protein}/>
            {/if}
            </div>
            <div class="p-3 w-full flex justify-center items-center">
                {#if selected.nutrition}
                <div class="w-full">
                    <h4 class="text-lg text-center">Old</h4>
                </div>
                {/if}
                {#if nutrition}
                <div class="w-full">
                    <h4 class="text-lg text-center">New</h4>
                </div>
                {/if}
            </div>
            
        </div>
        {/if}
    </form>
</div>
