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
		<Form.Label class="label">{label}</Form.Label>
		<Form.Input class="input input-bordered" {type} />
		<span class="label">
			<Form.Validation class="text-error" />
		</span>
	</Form.Field>
</div>
