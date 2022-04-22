<script lang="ts">
    import type {Nutrition} from "$lib/models/Nutrition";

    export let upc: string;
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
        upc: "70501635720",
        description: "Tomato 🍅",
        serving_size: 0,
        serving_unit: "cups (32g)",
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
    }

    export let button_text;
    export let handleSubmit;
    export let status_message;
</script>

<form class="w-full max-w-lg mx-4">
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-username">
            UPC
            </label>
            <input bind:value={upc} class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-upc" type="number" placeholder={placeholder.upc}>
            <p class="text-gray-600 text-xs italic">Does this product have a Universal Product Code (UPC)?</p>
        </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label class="{description == '' ? "border-red-500" : "border-gray-200"} block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-username">
            Description
            </label>
            <input bind:value={description} class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-upc" type="text" placeholder={placeholder.description}>
            {#if description == ''}
            <p class="text-red-500 text-xs italic ">Please fill out this field.</p>
            {/if}
            <p class="text-gray-600 text-xs italic">Whats this Nutrion Information about?</p>
        </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password-1">
            Serving Size
            </label>
            <input bind:value={serving_size} type="number" class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-serving-size" placeholder={placeholder.serving_size.toString()}>
        </div>
        <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password-2">
            Serving Size Unit
            </label>
            <input bind:value={serving_unit} type="text" class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-serving-unit" placeholder={placeholder.serving_unit}>
        </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-username">
            Calories
            </label>
            <input bind:value={calories} class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-calories" type="number" placeholder={placeholder.calories.toString()}>
        </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-username">
            Total Fat (g)
            </label>
            <input bind:value={total_fat} class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-total_fat" type="number" placeholder={placeholder.total_fat.toString()}>
        </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-saturated_fat">
            Saturated Fat (g)
            </label>
            <input bind:value={saturated_fat} type="number" class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-saturated_fat" placeholder={placeholder.saturated_fat.toString()}>
        </div>
        <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-trans_fat">
            Trans Fat (g)
            </label>
            <input bind:value={trans_fat} type="number" class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-trans_fat" placeholder={placeholder.trans_fat.toString()}>
        </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-cholesterol">
            Cholesterol (mg)
            </label>
            <input bind:value={cholesterol} type="number" class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-saturated_fat" placeholder={placeholder.cholesterol.toString()}>
        </div>
        <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-sodium">
            Sodium (mg)
            </label>
            <input bind:value={sodium} type="number" class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-trans_fat" placeholder={placeholder.sodium.toString()}>
        </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-total_carbohydrates">
            Total Carbohydrates (g)
            </label>
            <input bind:value={total_carbohydrates} class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-total_carbohydrates" type="number" placeholder={placeholder.total_carbohydrates.toString()}>
        </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-cholesterol">
            Dietary Fiber (g)
            </label>
            <input bind:value={dietary_fiber} type="number" class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-dietary_fiber" placeholder={placeholder.dietary_fiber.toString()}>
        </div>
        <div class="w-full md:w-1/3 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-sodium">
            Total Sugars (g)
            </label>
            <input bind:value={total_sugar} type="number" class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-total_sugar" placeholder={placeholder.total_sugar.toString()}>
        </div>
        <div class="w-full md:w-1/3 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-sodium">
                Added Sugar (g)
            </label>
            <input bind:value={added_sugar} type="number" class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-added_sugar" placeholder={placeholder.added_sugar.toString()}>
            </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-total_carbohydrates">
            Protein (g)
            </label>
            <input bind:value={protein} class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-protein" type="number" placeholder={placeholder.protein.toString()}>
        </div>
    </div>
    <!-- <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
            E Mail
            </label>
            <input bind:value={email} class="{email == '' ? "border-red-500" : "border-gray-200"} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="jane.doe@example.com">
            <p class="text-gray-600 text-xs italic">You are safe. We don't spam.</p>
            {#if email == ''}
            <p class="text-red-500 text-xs italic ">Please fill out this field.</p>
            {/if}
        </div>
    </div> -->
    <div class="content-center -mx-3 mb-6">
        <div class="px-3">
            <button on:click={handleSubmit} class="block shadow tracking-wide bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4" type="button">
                {button_text}
            </button>
            {#if status_message != ''}
                <p class="text-red-500 text-s italic ">{status_message}</p>
            {/if}
        </div>
    </div>
</form>