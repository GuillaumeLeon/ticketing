<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import DataTableActions from '$lib/components/data-table-action.svelte';
	import Datatable from '$lib/components/datatable.svelte';

	export let data;

	const table = createTable(readable(data.tickets));

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: 'ID'
		}),
		table.column({
			accessor: 'subject',
			header: 'Subject'
		}),
		table.column({
			accessor: 'status',
			header: 'Status'
		}),
		table.column({
			accessor: 'created_at',
			header: 'Created at',
			cell: ({ value }) => {
				return new Date(value).toDateString();
			}
		}),
		table.column({
			accessor: ({ id }) => id,
			header: '',
			cell: ({ value }) => {
				return createRender(DataTableActions, { id: value });
			}
		})
	]);
</script>

<div class="rounded-md border m-4">
	<Datatable {table} {columns} />
</div>
