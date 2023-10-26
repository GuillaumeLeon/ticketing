<script lang="ts">
    import { Form } from 'formsnap';
    import { Eye, EyeOff } from 'lucide-svelte';

    export let config: any;
    export let name: string = 'password';
    export let label: string = 'Password';

    let visible = false;

    const handleClick = () => {
        visible = !visible;
    };

    $: type = visible ? 'text' : 'password';
</script>

<div class="form-control">
    <Form.Field {config} {name}>
        <Form.Label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 label"
        >
            <div class="label-text">
                {label}
            </div>
        </Form.Label>
        <div class="join">
            <Form.Input
                class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 input input-bordered join-item w-full"
                {type}
            />
            <button type="button" class="btn btn-ghost join-item" on:click={handleClick}>
                {#if !visible} <Eye /> {:else} <EyeOff /> {/if}
            </button>
        </div>
        <span class="label">
            <span class="label-t">
                <Form.Validation class="error" />
            </span>
        </span>
    </Form.Field>
</div>
