<script context="module">
    export async function load() {
    const response = await axios.get(variables.SERVER_URL + '/nutrition')
  
    return {
        props: {
            nutrition_data: response.data,
        }
      };
    }
</script>

<script lang="ts">
    import { variables } from '$lib/env'
    import {placeholder} from '../../components/placeholders/NutritionData'
    import NutritionLabel from '../../components/nutrition/nutrition_label.svelte';
    import axios from "axios";
    import type { Nutrition } from 'src/models/Nutrition';
    import type { Food } from 'src/models/Food';
    import FoodForm from '../../components/food/food_form.svelte';

    let name: string = null;
    let upc:string = null;
    let nutrition: Nutrition = null;

    let status_message = '';
    export let nutrition_data;

    // async function getNutritionData() {
    //     axios.get(variables.SERVER_URL + '/nutrition')
    //     .then(response => {
    //         nutrition_data = response.data;
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }

    // getNutritionData();

    function resetData() {
        name = null;
        upc = null;
        nutrition = null;

        status_message = '';
    }

    function handleSubmit() {
        let canPost: boolean = false;
        let food: Food = {}

        if (name) {
            canPost = true;
            food["name"] = name;
        }
        if (upc) {
            food["upc"] = upc;
        }
        if (nutrition) {
            food["nutrition"] = nutrition;
        }

        if (canPost) {
            axios.post(variables.SERVER_URL + '/food', food)
                .then(response => {
                    console.log(response)
                    alert('Food Added!')
                    resetData();
                }).catch(error => {
                    console.log(error);
                    alert(error)
                });
        }
    }
</script>

<div>
    <h2 class="text-2xl m-4">Add Food to FoodDB</h2>
    <form class="w-full max-w-lg mx-4">
        
        <FoodForm bind:name={name} bind:nutrition={nutrition} bind:upc={upc} bind:nutrition_data={nutrition_data}/>

        <div class="content-center -mx-3 mb-6">
            <div class="px-3">
                <button on:click={handleSubmit} class="block shadow tracking-wide bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4" type="button">
                    Add Food to FoodDB
                </button>
                {#if status_message != ''}
                <p class="text-red-500 text-s italic ">{status_message}</p>
                {/if}
            </div>
        </div>
        {#if nutrition}
            <NutritionLabel description={nutrition.description} serving_size={nutrition.serving_size} serving_unit={nutrition.serving_unit} calories={nutrition.calories} 
            total_fat={nutrition.total_fat} saturated_fat={nutrition.saturated_fat} trans_fat={nutrition.trans_fat} cholesterol={nutrition.cholesterol} sodium={nutrition.sodium} total_carbohydrates={nutrition.total_carbohydrates}
            dietary_fiber={nutrition.dietary_fiber} total_sugar={nutrition.total_sugar} added_sugar={nutrition.added_sugar} protein={nutrition.protein} placeholder={placeholder}/>
        {/if}
    </form>
</div>