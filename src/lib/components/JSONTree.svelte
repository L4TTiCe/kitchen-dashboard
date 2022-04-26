<script lang="ts">
	import renderjson from '$lib/renderjson';

	export let json = null;

	let JSONTree = null;
	let id = null;

	// renderjson.set_icons('+', '-');
	renderjson.set_show_to_level(1);
	// renderjson.set_max_string_length(length);

	function removeAllChildNodes(parent) {
		while (parent.firstChild) {
			parent.removeChild(parent.firstChild);
		}
	}

	$: if (json && json._id != id) {
		id = json._id;
		removeAllChildNodes(JSONTree);
		JSONTree.appendChild(renderjson(json));
	}

	$: if (json == null && JSONTree) {
		id = null;
		removeAllChildNodes(JSONTree);
	}
</script>

<div class="renderjson" bind:this={JSONTree} />

<style>
	/* 
    .disclosure    ("⊕", "⊖")
    .syntax        (",", ":", "{", "}", "[", "]")
    .string        (includes quotes)
    .number
    .boolean
    .key           (object key)
    .keyword       ("null", "undefined")
    .object.syntax ("{", "}")
    .array.syntax  ("[", "]") 
    */

	:global(.renderjson a) {
		text-decoration: none;
	}
	:global(.renderjson .disclosure) {
		color: crimson;
		font-size: 120%;
	}
	:global(.renderjson .syntax) {
		color: grey;
	}
	:global(.renderjson .string) {
		color: black;
	}
	:global(.renderjson .number) {
		color: black;
	}
	:global(.renderjson .boolean) {
		color: plum;
	}
	:global(.renderjson .key) {
		color: grey;
	}
	:global(.renderjson .keyword) {
		color: blue;
	}
	:global(.renderjson .object.syntax) {
		color: blue;
	}
	:global(.renderjson .array.syntax) {
		color: orange;
	}

	/* .renderjson { 
        border-style: dotted;
        border-width: medium; 
        border-color: black;
    } */
</style>
