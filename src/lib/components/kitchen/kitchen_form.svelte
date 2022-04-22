<script lang="ts">
    export let name: string;
    export let using_since_s: string;
    export let status_message: string;

    export let button_text: string;
    export let handleSubmit;
</script>

<form class="w-full max-w-lg mx-4">
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label 
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                for="grid-name">
            Kitchen Name
            </label>
            <input bind:value={name} 
                type="text" 
                class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                id="grid-qty-u" 
                placeholder="Judy's Kitchen">
        </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label 
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                for="grid-using-since">
            Using Since
            </label>
            <input bind:value={using_since_s} 
                type="date" 
                class="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                id="grid-using_since" >
        </div>
    </div>

    <div class="content-center -mx-3 mb-6">
        <div class="px-3">
            <button on:click={handleSubmit} class="block shadow tracking-wide bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4" 
                type="button">
                {button_text}
            </button>
            {#if status_message != ''}
            <p class="text-red-500 text-s italic ">{status_message}</p>
            {/if}
        </div>
    </div>

</form>