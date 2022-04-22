<script lang="ts">
    import axios from "axios";
    import { variables } from '$lib/env';
    import type { Nutrition } from "$lib/models/Nutrition"
    import NutritionLabel from '$lib/components/nutrition/nutrition_label.svelte';
    import NutritionForm from '$lib/components/nutrition/nutrition_form.svelte';

    let nutrition_data = [];

    let selected;

    let nutritionId: string = '';

    let upc: string = '';
    let serving_size: number = null ;
    let serving_unit: string = '';
    let calories: number = null;
    let total_fat: number = null;
    let saturated_fat: number = null;
    let trans_fat: number = null;
    let cholesterol: number = null;
    let sodium: number = null;
    let total_carbohydrates: number = null;
    let dietary_fiber: number = null;
    let total_sugar: number = null;
    let added_sugar: number = null;
    let protein: number = null;
    let description: string = '';

    let status_message = '';

    async function getNutritionData() {
        axios.get(variables.SERVER_URL + '/nutrition')
        .then(response => {
            nutrition_data = response.data;
        }).catch(error => {
            console.log(error);
        });
    }

    getNutritionData();

    function resetData() {
        nutritionId = null;
        description = null;
        upc = null;
        serving_size = null;
        serving_unit = null;
        calories = null;
        total_fat = null;
        saturated_fat = null;
        trans_fat = null;
        cholesterol = null;
        sodium = null;
        total_carbohydrates = null;
        dietary_fiber = null;
        total_sugar = null;
        added_sugar = null;
        protein = null;
    }

	function handleSubmit() {
        if (selected) {
            let nutrition: Nutrition = {}
            let canPost: boolean = false;

            if (upc) {
                nutrition.upc = upc
                canPost = true;
            }  if (description) {
                nutrition['description'] = description
                canPost = true;
            } if (serving_size) {
                nutrition['serving_size'] = serving_size
                canPost = true;
            } if (serving_unit) {
                nutrition['serving_unit'] = serving_unit
                canPost = true;
            } if (calories) {
                nutrition['calories'] = calories
                canPost = true;
            } if (total_fat) {
                nutrition['total_fat'] = total_fat
                canPost = true;
            } if (saturated_fat) {
                nutrition['saturated_fat'] = saturated_fat
                canPost = true;
            } if (trans_fat) {
                nutrition['trans_fat'] = trans_fat
                canPost = true;
            } if (cholesterol) {
                nutrition['cholesterol'] = cholesterol
                canPost = true;
            } if (sodium) {
                nutrition['sodium'] = sodium
                canPost = true;
            } if (total_carbohydrates) {
                nutrition['total_carbohydrates'] = total_carbohydrates
                canPost = true;
            } if (dietary_fiber) {
                nutrition['dietary_fiber'] = dietary_fiber
                canPost = true;
            } if (total_sugar) {
                nutrition['total_sugar'] = total_sugar
                canPost = true;
            } if (added_sugar) {
                nutrition['added_sugar'] = added_sugar
                canPost = true;
            } if (protein) {
                nutrition['protein'] = protein
                canPost = true;
            }

            // Make Description Mandatory
            if (!description) {
                canPost = false;
            }

            if (canPost) {
                axios.put(variables.SERVER_URL + '/nutrition/' + selected._id, nutrition)
                    .then(response => {
                        alert("Update Sucessful!")
                        getNutritionData();
                        selected = '';
                        resetData();
                    }).catch(error => {
                        console.log(error);
                        alert(error)
                    });
            }
        }
	}

    $: if(selected && selected._id != nutritionId) {
        resetData();
        description = selected.description;
        nutritionId = selected._id;

        // upc = null;
        // serving_size = null;
        // serving_unit = null;
        // calories = null;
        // total_fat = null;
        // saturated_fat = null;
        // trans_fat = null;
        // cholesterol = null;
        // sodium = null;
        // total_carbohydrates = null;
        // dietary_fiber = null;
        // total_sugar = null;
        // added_sugar = null;
        // protein = null;

        if (selected.upc) {
            upc = selected.upc;
        } if (selected.serving_size) {
            serving_size = selected.serving_size;
        } if (selected.serving_unit) {
            serving_unit = selected.serving_unit;
        } if (selected.calories) {
            calories = selected.calories;
        } if (selected.total_fat) {
            total_fat = selected.total_fat;
        } if (selected.saturated_fat) {
            saturated_fat = selected.saturated_fat;
        } if (selected.trans_fat) {
            trans_fat = selected.trans_fat;
        } if (selected.cholesterol) {
            cholesterol = selected.cholesterol;
        } if (selected.sodium) {
            sodium = selected.sodium;
        } if (selected.total_carbohydrates) {
            total_carbohydrates = selected.total_carbohydrates;
        } if (selected.dietary_fiber) {
            dietary_fiber = selected.dietary_fiber;
        } if (selected.total_sugar) {
            total_sugar = selected.total_sugar;
        } if (selected.added_sugar) {
            added_sugar = selected.added_sugar;
        } if (selected.protein) {
            protein = selected.protein;
        }

        console.log("attaching...")
    };
</script>

<div>
    <h2 class="text-2xl m-4">Update Nutrition Data</h2>
    <form class="w-full max-w-xl mx-4">
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-username">
                  Selected Nutrition Information
                </label>
                <select bind:value={selected} class="{!selected ? "border-red-500" : "border-gray-200"} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-username" placeholder="Choose group to update">
                    <option value='' selected disabled hidden>Choose Nutrition Information</option>
                    {#each nutrition_data as nutrition}
                        <option value={nutrition}>
                            {nutrition.description} {#if nutrition.upc}[{nutrition.upc}]{/if}
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
            <NutritionForm bind:description={description} bind:serving_size={serving_size} bind:serving_unit={serving_unit} bind:calories={calories} 
                bind:total_fat={total_fat} bind:saturated_fat={saturated_fat} bind:trans_fat={trans_fat} bind:cholesterol={cholesterol} bind:sodium={sodium} 
                bind:total_carbohydrates={total_carbohydrates} bind:dietary_fiber={dietary_fiber} bind:total_sugar={total_sugar} bind:added_sugar={added_sugar} 
                bind:protein={protein} bind:upc={upc} bind:status_message={status_message} 
                handleSubmit={handleSubmit} button_text="Update Nutrition Data"/>
           
            <div class="p-3 w-full flex justify-center items-center">
                <NutritionLabel description={selected.description} serving_size={selected.serving_size} serving_unit={selected.serving_unit} calories={selected.calories} 
                    total_fat={selected.total_fat} saturated_fat={selected.saturated_fat} trans_fat={selected.trans_fat} cholesterol={selected.cholesterol} sodium={selected.sodium} total_carbohydrates={selected.total_carbohydrates}
                    dietary_fiber={selected.dietary_fiber} total_sugar={selected.total_sugar} added_sugar={selected.added_sugar} protein={selected.protein}/>

                <NutritionLabel description={description} serving_size={serving_size} serving_unit={serving_unit} calories={calories} 
                    total_fat={total_fat} saturated_fat={saturated_fat} trans_fat={trans_fat} cholesterol={cholesterol} sodium={sodium} total_carbohydrates={total_carbohydrates}
                    dietary_fiber={dietary_fiber} total_sugar={total_sugar} added_sugar={added_sugar} protein={protein}/>
            </div>
            <div class="p-3 w-full flex justify-center items-center">
                <div class="w-full">
                    <h4 class="text-lg text-center">Old</h4>
                </div>
                <div class="w-full">
                    <h4 class="text-lg text-center">New</h4>
                </div>
            </div>
        </div>
        {/if}
    </form>
</div>