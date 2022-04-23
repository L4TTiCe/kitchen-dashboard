<script lang="ts">
    import axios from "axios";
    import { variables } from '$lib/env';
    import type { Group } from '$lib/models/Group';
    import renderjson from 'renderjson/renderjson';

    let group_data = [];

    let selected;

    let groupId: string = '';

    let JSONTree;

    async function getGroups() {
        axios.get(variables.SERVER_URL + '/groups')
        .then(response => {
            const data = response.data;
            group_data = data
        }).catch(error => {
            console.log(error);
        });
    }

    getGroups();

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    $: if(selected && selected._id != groupId) {
        groupId = selected._id;
        removeAllChildNodes(JSONTree);
        JSONTree.appendChild(renderjson(selected));
    };
</script>

<div>
    <h2 class="text-2xl m-4">View Group</h2>
    <form class="w-full max-w-lg mx-4">
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-username">
                  Selected Group
                </label>
                <select bind:value={selected} class="{!selected ? "border-red-500" : "border-gray-200"} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-username" placeholder="Choose group to update">
                    <option value='' selected disabled hidden>Choose Group</option>
                    {#each group_data as group}
                        <option value={group}>
                            {group.name}
                        </option>
                    {/each}
                </select>
                {#if !selected}
                    <p class="text-red-500 text-xs italic ">Please choose group to Update</p>
                    <p>Selected Group {selected ? selected.name : '[waiting...]'}</p>
                {/if}
            </div>
        </div>

        <div bind:this={JSONTree}/>

    </form>
</div>
