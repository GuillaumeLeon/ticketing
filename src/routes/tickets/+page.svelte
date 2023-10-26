<script lang="ts">
    import { readable } from 'svelte/store';
    import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
    import TableAction from '$lib/components/table-action.svelte';
    import Pagination from '$lib/components/pagination.svelte';

    export let data;

    const tickets = readable(data.tickets ?? []);

    const table = createTable(tickets);

    const columns = table.createColumns([
        table.column({
            header: 'ID',
            accessor: 'id',
        }),
        table.column({
            header: 'Subject',
            accessor: 'subject',
        }),
        table.column({
            header: 'Created at',
            accessor: 'created_at',
            cell: ({ value }) => new Date(value).toDateString(),
        }),
        table.column({
            header: '',
            accessor: ({ id }) => id,
            cell: (item) => createRender(TableAction, { id: item.value }),
        }),
    ]);

    const { headerRows, rows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="overflow-x-auto">
    <table class="table bg-base-300 text-base-content" {...$tableAttrs}>
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
    <Pagination
        baseUrl="/tickets"
        page={data.page}
        total={data.count ?? 0}
        perPage={data.perPage}
    />
</div>
