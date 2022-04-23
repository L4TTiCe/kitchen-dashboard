<script lang="ts">
	import { page } from '$app/stores';

	const active_classes = 'py-4 px-2 text-blue-500 font-semibold';
	const inactive_classes =
		'py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300';

	const classes_small =
		'cursor-pointer text-blue-500 block px-3 py-2 hover:text-blue-500 rounded-md text-base font-medium transition duration-300';
	const classes_small_active =
		'cursor-pointer bg-blue-600 text-white block px-3 py-2 hover:bg-blue-800 rounded-md text-base font-medium transition duration-300';

	let active = '';
	function refresh() {
		const current_url = $page.url.pathname;
		if (current_url.includes('users')) {
			active = 'users';
		} else if (current_url.includes('about')) {
			active = 'about';
		} else if (current_url.includes('groups')) {
			active = 'groups';
		} else if (current_url.includes('food')) {
			active = 'food';
		} else if (current_url.includes('nutrition')) {
			active = 'nutrition';
		} else if (current_url.includes('kitchens')) {
			active = 'kitchens';
		} else {
			active = '/';
		}
	}
	refresh();

	$: if ($page.url.pathname) refresh();
</script>

<nav class="shadow-lg border-t-4 border-blue-500">
	<div class="max-w-6xl mx-auto px-4">
		<div class="flex justify-between">
			<div class="flex space-x-7">
				<div>
					<a href="/" class="flex items-center py-4 px-2">
						<img src="../../restaurant.png" alt="Logo" class="h-8 w-8 mr-2" /><span
							class="font-semibold text-gray-500 text-lg">Kitchen Dashboard</span
						>
					</a>
				</div>
			</div>
			<div class="hidden md:flex items-center space-x-1">
				<a href="/" class={active == '/' ? active_classes : inactive_classes}>Home</a>
				<a href="/about" class={active == 'about' ? active_classes : inactive_classes}>About</a>
				<a href="/users" class={active == 'users' ? active_classes : inactive_classes}>Users</a>
				<a href="/groups" class={active == 'groups' ? active_classes : inactive_classes}>Groups</a>
				<a href="/food" class={active == 'food' ? active_classes : inactive_classes}>Food</a>
				<a href="/nutrition" class={active == 'nutrition' ? active_classes : inactive_classes}
					>Nutrition</a
				>
				<a
					href="/kitchens"
					class="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition duration-300"
					>Kitchens</a
				>
			</div>
			<div class="mr-10 flex md:hidden">
				<button class="inline-flex items-center justify-center p-2 rounded-md text-dark">
					<svg
						stroke="currentColor"
						fill="currentColor"
						stroke-width="0"
						viewBox="0 0 512 512"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z" />
					</svg>
				</button>
			</div>
		</div>
	</div>
	<div class="md:visible">
		<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 md:hidden">
			<a href="/" class={active == '/' ? classes_small_active : classes_small}>Home </a>
			<a href="/users" class={active == 'users' ? classes_small_active : classes_small}>Users</a>
			<a href="/groups" class={active == 'groups' ? classes_small_active : classes_small}>Groups</a>
			<a href="/food" class={active == 'food' ? classes_small_active : classes_small}>Food</a>
			<a href="/nutrition" class={active == 'nutrition' ? classes_small_active : classes_small}
				>Nutrition</a
			>
			<a href="/kitchens" class={active == 'kitchens' ? classes_small_active : classes_small}
				>Kitchens</a
			>
		</div>
	</div>
</nav>
