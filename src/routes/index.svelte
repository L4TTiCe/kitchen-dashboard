<script lang="ts">
	import axios from 'axios';
	import { variables } from '$lib/env';
	import { onInterval } from '$lib/utils';

	console.log('Using Server: ' + variables.SERVER_URL);

	let isServerUp = false;

	async function testServer() {
		axios
			.get(variables.SERVER_URL + '/up')
			.then((response) => {
				if (response.status == 200) {
					isServerUp = true;
				} else {
					isServerUp = false;
				}
			})
			.catch((error) => {
				isServerUp = false;
				console.log(error);
			});
	}

	onInterval(testServer, 10000);
	testServer();
</script>

<div class="pl-2 flex flex-col md:flex-row">
	<div class="flex-auto p-4 shadow-lg">
		<h3 class="text-lg font-mono pt-2 font-semibold">Connection Status</h3>
		<ul class="pl-4">
			<li>
				Server Instance: 
				<a class="underline hover:no-underline hover:text-blue-800" href="{variables.SERVER_URL.toString()}" target="_blank" rel="noopener noreferrer"
					>{variables.SERVER_URL.toString()}</a
				>
			</li>
			<li>
				Status: 
				{#if isServerUp}
					<span class="text-green-800">UP</span>
				{:else}
				<span class="text-red-800">DOWN</span>
				{/if}
			</li>
		</ul>
	</div>
</div>
