<script lang="ts">
	import { writable } from 'svelte/store';
	import { createEventDispatcher, onMount } from 'svelte';

	export let groupId: string;

	let colorblind: boolean;

	let otherGroupIds = Object.keys(localStorage).filter((v) => v !== groupId);
	console.log(`Group name: ${groupId}, Other group: ${otherGroupIds[0]}`);
	type MyGroup = {
		name: string;
		participants: string[];
		grid: string[];
	};
	let otherGroups = new Map<string, MyGroup>();
	for (let otherGroupId of otherGroupIds) {
		otherGroups.set(otherGroupId, JSON.parse(localStorage.getItem(otherGroupId) || ''));
	}

	let data = writable(
		JSON.parse(localStorage.getItem(groupId) || `{"name": "", "participants": [], "grid": []}`)
	);

	data.subscribe((value) => {
		localStorage.setItem(groupId, JSON.stringify(value));
	});

	// const changeParticipants = (event: Event) => {
	// 	$data.participants = (event?.target as HTMLTextAreaElement).value
	// 		.split(',')
	// 		.map((v: string) => v.trim());
	// 	data.update((v) => {
	// 		return { ...v, participants: $data.participants };
	// 	});
	// };

	// const dispatch = createEventDispatcher();
	// const destroy = () => {
	// 	localStorage.removeItem(groupId);
	// 	dispatch('destroy');
	// };

	const checkbox = (e: Event) => {
		const form = e.currentTarget as HTMLFormElement;
		const grid = Array.from(new FormData(form).keys());
		data.update((v) => {
			return { ...v, grid };
		});
	};
</script>

<!-- <button on:click={destroy}>Destroy</button> -->
<form on:change={checkbox}>
	<table style={colorblind ? "--colorblind-v: 'v'; --colorblind-x: 'x'" : ''}>
		{#if $data.participants.length > 0}
			<thead>
				<tr>
					<th>
						<label style="width: 100%; height: 100%;">
							<input type="checkbox" name="colorblind" bind:checked={colorblind} />
						</label>
					</th>
					{#each $data.participants as participant}
						<th><div><span>{participant}</span></div></th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each $data.participants as participant, k1}
					<tr>
						<td>{participant}'s thread</td>
						{#each $data.participants as _p2, k2}
							{#if k1 == k2}
								<td class="black">&nbsp;</td>
							{:else}
								<td>
									<label>
										<input
											type="checkbox"
											name={`${k1}-${k2}`}
											checked={$data.grid.indexOf(`${k1}-${k2}`) !== -1}
										/>
									</label>
								</td>
							{/if}
						{/each}
					</tr>
				{/each}
			</tbody>
		{/if}
	</table>

	{#each otherGroups as [_groupName, otherGroup], b1}
		<table style={colorblind ? "--colorblind-v: 'v'; --colorblind-x: 'x'" : ''} class="bonus">
			<thead>
				<tr>
					{#each otherGroup.participants as participant}
						<th><div><span>{participant}</span></div></th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each $data.participants as mainParticipant, k1}
					<tr>
						{#each otherGroup.participants as _participant, k2}
							<td>
								<label>
									<input
										type="checkbox"
										name={`b${b1}-${k1}-${k2}`}
										checked={$data.grid.indexOf(`b${b1}-${k1}-${k2}`) !== -1}
									/>
								</label>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	{/each}
</form>

<style>
	form {
		display: grid;
		grid-column: 1 / -1;
		grid-template-columns: subgrid;
		justify-items: start;
	}
	table {
		border-collapse: collapse;
	}
	tr {
		height: 30px;
	}
	th {
		height: 80px;
		vertical-align: bottom;
	}
	th > div {
		transform: translate(17px, -11px) rotate(-45deg);
		width: 30px;
	}
	th > div > span {
		border-bottom: 1px solid #ccc;
		padding: 5px 10px 5px 0;
	}
	td {
		padding: 0;
		border: 1px solid #ccc;
		background: rgb(255, 99, 99);
		width: 30px;
		aspect-ratio: 1;
		white-space: nowrap;
		position: relative;
	}
	table.bonus td {
		background: #777;
	}
	table:not(.bonus) td:first-child {
		border-top: unset;
		border-left: unset;
		background: unset;
		padding: 0.375rem;
		width: 40ch;
	}
	.black {
		background-color: black;
	}

	label {
		display: block;
		height: 28px;
	}
	input[type='checkbox'] {
		display: none;
	}

	.bonus td:has(:checked),
	td:has(:checked) {
		background: lightgreen;
	}
	table.bonus td:has(:checked)::after,
	td:has(:checked)::after {
		content: var(--colorblind-v);
	}
	table.bonus td::after,
	td:not(:first-child)::after {
		overflow: hidden;
		position: absolute;
		inset: 0;
		content: var(--colorblind-x);
		font-family: sans-serif;
		text-align: center;
		/* outline: 1px solid blue; */
		top: 0.3rem;
		pointer-events: none;
	}
</style>
