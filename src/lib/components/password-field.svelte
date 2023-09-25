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
		<Form.Label class="label">
			<div class="label-text">
				{label}
			</div>
		</Form.Label>
		<div class="join">
			<Form.Input class="input input-bordered join-item w-full" {type} />
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
