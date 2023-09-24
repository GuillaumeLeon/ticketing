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

<div class="form-group">
	<Form.Field {config} {name}>
		<Form.Label class="label">{label}</Form.Label>
		<div class="input-group input-group-divider grid-cols-[1fr_auto]">
			<Form.Input class="input" {type} />
			<!-- <button type="button" class="btn variant-ghost-surface" on:click={handleClick}>
			{#if !visible} <Eye /> {:else} <EyeOff /> {/if}
		</button> -->
		</div>
		<Form.Validation />
	</Form.Field>
</div>
