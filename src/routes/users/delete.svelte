<script>
    import axios from "axios";
    // import { users } from "../../stores/UserStores";
    import { variables } from '$lib/env';

    let users_data = [];
    let update_count = 0;

    // users.subscribe(value => {
    //     users_data = value;
    //     update_count++;
    // })

    let selected;

    async function getUsers() {
        axios.get(variables.SERVER_URL + '/users')
        .then(response => {
            const data = response.data;
            // let data = [];
            // data.forEach(kitchen => {
            //     data.push(kitchen);
            // });
            console.log(data);
            users_data = data
        }).catch(error => {
            console.log(error);
        });
    }

    getUsers();

	function handleSubmit() {
		alert(`Chose ${selected.username} with ID "${selected._id}"`);

        console.log(variables.SERVER_URL + '/users/ById/' + selected._id)

        if (selected) {
            axios.delete(variables.SERVER_URL + '/users/ById/' + selected._id)
            .then(response => {
                alert("Delete Sucessful!")
                getUsers();
            }).catch(error => {
                console.log(error);
                alert(error)
            });
        }
	}
</script>

<h2 class="text-lg font-semibold">Select User</h2>

<form on:submit|preventDefault={handleSubmit}>
    <div class="b-2 p-2">
        <select class="w-60 border p-2 b-2" bind:value={selected}>
            {#each users_data as user}
                <option value={user}>
                    {user.username}
                </option>
            {/each}
        </select>

        <button type=submit class="b-4 p-2 bg-red-500 rounded text-white">
            Delete
        </button>
    </div>
</form>

<p>Selected User {selected ? selected.username : '[waiting...]'}</p>