<script>
    import { page } from '$app/stores';

    const active_classes = "text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white";
    const inactive_classes = "text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4";
    const disabled_classes = "block py-2 px-4 text-gray-400 cursor-not-allowed";

    let active = '';
    function refresh() {
        const url = $page.url.pathname;
        if (url.includes('add')) {
            active = 'add'
        } else if (url.includes('delete')) {
            active = 'delete'
        } else {
            active = 'update'
        }
    }
    refresh();

    $: if($page.url.pathname) refresh();

</script>

<!-- <p>Current URL: {$page.url.pathname}</p> -->
<ul class="flex">
    <li class="flex-1 mr-2">
        <a class="{active == 'add' ? active_classes : inactive_classes}" href="/nutrition/add">Add Nutrition</a>
      </li>
    <li class="flex-1 mr-2">
      <a class="{active == 'update' ? active_classes : inactive_classes}" href="/nutrition/update">Update Nutrition</a>
    </li>
    <li class="flex-1 mr-2">
        <a class="{active == 'delete' ? active_classes : inactive_classes}" href="/nutrition/delete">Remove Nutrition</a>
    </li>
</ul>

<slot/>