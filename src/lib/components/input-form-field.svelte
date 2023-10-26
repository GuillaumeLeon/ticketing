<script lang="ts">
    import { Form } from 'formsnap';
    import type { HTMLInputTypeAttribute } from 'svelte/elements';

    export let config: any;
    export let name: string;
    export let label: string;
    export let type: HTMLInputTypeAttribute = 'text';
</script>

<div class="form-control">
    <Form.Field {config} {name}>
        <Form.Label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 label"
            >{label}</Form.Label
        >
        <Form.Input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            {type}
        />
        <span class="label">
            <Form.Validation class="text-error" />
        </span>
    </Form.Field>
</div>
