<script lang="ts">
	import Group from './Group.svelte';
	import { onMount } from 'svelte';
	// import { v4 as uuid } from 'uuid';

	import { writable } from 'svelte/store';

	let groups = writable<string[]>([]);
	let addGroupDialog: HTMLDialogElement;
	let participants = '';

	const addGroup = () => {
		const groupName = 'Group ' + ($groups.length + 1).toString();
		const participantlist = participants
			.split(/[,\n\t]/)
			.map((v) => v.trim())
			.filter((v) => v !== '');

		localStorage.setItem(
			groupName,
			JSON.stringify({ name: groupName, participants: participantlist, grid: [] })
		);
		groups.update((v) => [...v, 'Group ' + ($groups.length + 1).toString()]);

		addGroupDialog.close();
		participants = '';
	};

	let update = () => {
		$groups = Object.keys(localStorage);
	};

	let clear = () => {
		localStorage.clear();
		update();
	};
	onMount(update);
</script>

<div class="buttonwrapper">
	<button on:click={() => addGroupDialog.showModal()}>Add Group</button>
	<button
		on:click={() => {
			if (
				confirm(
					'Are you sure you want to clear all data? There is no undo, and all groups are removed.'
				)
			) {
				clear();
			}
		}}
	>
		Clear
	</button>
</div>

<div class="groupwrapper" style="--colcount: {$groups.length}">
	{#each $groups as groupId}
		<div>
			<h1 style="grid-colum: 1 / -1">{groupId}</h1>
			{#each new Array($groups.length) as _v, i}
				<h2>{i == 0 ? 'main' : 'bonus'}</h2>
			{/each}
			<Group {groupId} on:destroy={update}></Group>
		</div>
	{/each}
</div>
<dialog bind:this={addGroupDialog}>
	<form>
		<label for="participants">Participants for new group (comma or newline separated):</label>
		<textarea name="participants" id="#participants" bind:value={participants} rows="10"></textarea>
		<button on:click={addGroup}>Create Group</button>
		<button on:click={() => addGroupDialog.close()}>Close</button>
	</form>
</dialog>

<style>
	dialog form {
		display: flex;
		flex-direction: column;
	}
	.buttonwrapper {
		display: flex;
		width: fit-content;
		margin: 2rem auto;
	}
	button {
		border: 2px solid silver;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		/* float: right; */
		margin: 0 2rem;
	}
	.groupwrapper {
		margin: 0 auto;
		display: grid;
		width: min-content;
		column-gap: 30px;
		grid-template-columns: repeat(var(--colcount), min-content);
		grid-template-rows: repeat(var(--colcount), min-content);
		justify-items: start;
		align-items: start;
	}
	.groupwrapper div {
		border: 1px solid silver;
		border-radius: 1rem;
		display: grid;
		padding: 0.5rem 5rem 1.5rem 2rem;
		grid-column: 1 / -1;
		grid-template-columns: subgrid;
	}
	.groupwrapper h1 {
		grid-column: 1 / -1;
		font-size: 2.2rem;
		font-family: sans-serif;
		justify-self: center;
		margin: 0;
	}
	.groupwrapper h2 {
		text-transform: uppercase;
		font-family: sans-serif;
		font-size: 2rem;
		justify-self: center;
		margin-block: 0;
	}
</style>
