<script lang="ts">
    import { variables } from '$lib/env'
    import type {Group} from '../../models/Group'
    import axios from "axios";
  
    let groupName: string = '';

    let status_message = '';
  
    function validateGroup(group: Group): boolean {
      if (group.name == '') {
        return false;
      }
      return true;
    }

    function handleSubmit() {
      let group: Group = {
        name: groupName
      }
  
      if (validateGroup(group)){    
        axios.post(variables.SERVER_URL + '/groups', group)
        .then(response => {
          console.log(response)
          alert('Group Created!')
        }).catch(error => {
            console.log(error);
            alert(error)
        });} else {
          status_message = 'Please complete the above form!';
        }
    }
</script>

<div>
    <h2 class="text-2xl m-4">Create Group</h2>
    <form class="w-full max-w-lg mx-4">
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-username">
                Group Name
              </label>
              <input bind:value={groupName} class="{groupName == '' ? "border-red-500" : "border-gray-200"} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-username" type="text" placeholder="Test Kitchen">
              <p class="text-gray-600 text-xs italic">Let's get your Group started!</p>
              {#if groupName == ''}
              <p class="text-red-500 text-xs italic ">Please fill out this field.</p>
              {/if}
            </div>
        </div>
        <div class="content-center -mx-3 mb-6">
            <div class="px-3">
                <button on:click={handleSubmit} class="block shadow tracking-wide bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4" type="button">
                    Create Group
                </button>
                {#if status_message != ''}
                <p class="text-red-500 text-s italic ">{status_message}</p>
                {/if}
            </div>
        </div>
      </form>
</div>