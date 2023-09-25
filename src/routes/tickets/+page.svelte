<script lang="ts">
	import { readable } from 'svelte/store';
	import { Render, Subscribe, createTable } from 'svelte-headless-table';

	export let data;

	const tickets = readable(data.tickets ?? []);

	const table = createTable(tickets);

	const columns = table.createColumns([
		table.column({
			header: 'ID',
			accessor: 'id'
		}),
		table.column({
			header: 'Subject',
			accessor: 'subject'
		}),
		table.column({
			header: 'Created at',
			accessor: 'created_at',
			cell: ({ value }) => new Date(value).toDateString()
		})
	]);

	const { headerRows, rows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="overflow-x-auto">
	<table class="table" {...$tableAttrs}>
		<thead>
			{#each $headerRows as headerRow (headerRow.id)}
				<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
					<tr {...rowAttrs}>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<th {...attrs}>
									<Render of={cell.render()} />
								</th>
							</Subscribe>
						{/each}
					</tr>
				</Subscribe>
			{/each}
		</thead>
		<tbody {...$tableBodyAttrs}>
			{#each $rows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<tr {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<td {...attrs}>
									<Render of={cell.render()} />
								</td>
							</Subscribe>
						{/each}
					</tr>
				</Subscribe>
			{/each}
		</tbody>
	</table>
</div>
