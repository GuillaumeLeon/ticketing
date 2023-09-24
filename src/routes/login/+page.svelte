<script lang="ts">
	import { Form } from 'formsnap';
	import { loginSchema } from './schemas';
	import InputField from '$lib/components/input-form-field.svelte';
	import PasswordField from '$lib/components/password-field.svelte';
	export let data;
</script>

<div class="w-full h-full flex items-center justify-center">
	<div class="card p-4 w-[500px] text-token space-y-4">
		<Form.Root schema={loginSchema} form={data.form} let:config>
			<div class="flex gap-1 flex-col">
				<InputField {config} name="email" label="Email" />
				<PasswordField {config} />
				<div class="w-full flex justify-end">
					<button type="submit" class="btn variant-filled">Log in</button>
				</div>
			</div>
		</Form.Root>
	</div>
</div>
