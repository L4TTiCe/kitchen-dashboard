<script>
	import { page } from '$app/stores';

	const active_classes =
		'text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white';
	const inactive_classes =
		'text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4';
	const disabled_classes = 'block py-2 px-4 text-gray-400 cursor-not-allowed';

	let active = '';
	function refresh() {
		const url = $page.url.pathname;
		if (url.includes('add_membership')) {
			active = 'add';
		} else if (url.includes('remove_membership')) {
			active = 'remove';
		} else if (url.includes('attach')) {
			active = 'attach';
		} else if (url.includes('detach')) {
			active = 'detach';
		} else {
			active = 'rename';
		}
	}
	refresh();

	$: if ($page.url.pathname) refresh();
</script>

<ul class="flex my-3">
	<li class="flex-1 mr-2">
		<a class={active == 'rename' ? active_classes : inactive_classes} href="/groups/update/rename"
			>Rename Group</a
		>
	</li>
	<li class="flex-1 mr-2">
		<a
			class={active == 'add' ? active_classes : inactive_classes}
			href="/groups/update/add_membership">Add Member</a
		>
	</li>
	<li class="flex-1 mr-2">
		<a
			class={active == 'remove' ? active_classes : inactive_classes}
			href="/groups/update/remove_membership">Remove Member</a
		>
	</li>
	<li class="flex-1 mr-2">
		<a
			class={active == 'attach' ? active_classes : inactive_classes}
			href="/groups/update/attach_kitchen">Attach Kitchen</a
		>
	</li>
	<li class="flex-1 mr-2">
		<a
			class={active == 'detach' ? active_classes : inactive_classes}
			href="/groups/update/detach_kitchen">Detach Kitchen</a
		>
	</li>
</ul>

<slot />
