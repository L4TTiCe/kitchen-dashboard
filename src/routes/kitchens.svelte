<script>
    import { kitchens } from "../stores/kitchenStore";

    let kitchens_data = [];
    let update_count = 0;

    kitchens.subscribe(value => {
        kitchens_data = value;
        update_count++;
    })

    let selected;

	function handleSubmit() {
		alert(`Chose ${selected.name} with ID "${selected._id}"`);
	}

    let x = 15
</script>

<h2 class="text-lg font-semibold">Select Kitchen</h2>

<form on:submit|preventDefault={handleSubmit}>
    <div class="b-2 p-2">
        <select class="w-60 border p-2 b-2" bind:value={selected}>
            {#each kitchens_data as kitchen}
                <option value={kitchen}>
                    {kitchen.name}
                </option>
            {/each}
        </select>

        <button type=submit class="b-4 p-2 bg-orange-500 rounded text-white">
            Submit
        </button>
    </div>
</form>

<p>selected kitchen {selected ? selected.name : '[waiting...]'}</p>

{#if selected}
	<h3 class="text-lg">{selected.name}</h3>
    <p>id: {selected._id}</p>
    <ul class="list-disc list-outside">
        {#each selected.locations as location}
            <li>{location.name}</li>
                <ol class="list-decimal list-outside">
                {#each location.subLocations as location}
                    <li>{location.name}</li>
                {/each}
                </ol>
        {/each}
    </ul>
{/if}
