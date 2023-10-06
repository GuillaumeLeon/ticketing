<script lang="ts">
    import clsx from 'clsx';

    export let page = 1;
    export let perPage = 25;
    export let total: number;
    export let baseUrl: string;

    $: totalNumberOfPages = Math.round(total / perPage);
</script>

<div class="join">
    {#each Array(totalNumberOfPages) as _, index}
        <a
            href={`${baseUrl}?page=${index + 1}&per_page=${perPage}`}
            class={clsx('join-item btn', { 'btn-active': index + 1 === page })}
        >
            {index + 1}
        </a>
    {/each}
</div>
