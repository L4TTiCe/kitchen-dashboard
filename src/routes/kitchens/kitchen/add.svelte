<script lang="ts">
	import { variables } from '$lib/env';
	import axios from 'axios';
	import KitchenForm from '$lib/components/kitchen/kitchen_form.svelte';
	import type { Kitchen } from '$lib/models/Kitchen';

	let name: string = null;
	let using_since_s: string = null;

	let status_message = '';

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
		// using_since = null;
		using_since_s = null;

		status_message = '';
	}

	function handleSubmit() {
		let canPost: boolean = false;
		let kitchen: Kitchen = {};

		if (name) {
			canPost = true;
			kitchen['name'] = name;
		}
		if (using_since_s) {
			// @ts-ignore
			kitchen['using_since'] = new Date(using_since_s).toISOString().slice(0, 10);
		}

		console.log(kitchen);

		if (canPost) {
			axios
				.post(variables.SERVER_URL + '/kitchens', kitchen)
				.then((response) => {
					console.log(response);
					alert('Kitchen Added!');
					resetData();
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		} else {
			status_message = "'Kitchen Name' is a required field.";
		}
	}
</script>

<div>
	<h2 class="text-2xl m-4">Add Kitchen</h2>

	<KitchenForm
		bind:name
		bind:using_since_s
		bind:status_message
		{handleSubmit}
		button_text={'Add Kitchen'}
	/>
</div>
