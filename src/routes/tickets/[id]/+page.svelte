<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { updateSubject, type UpdateSubject } from './schema/subject';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Check } from 'lucide-svelte';

	export let data;
	export let form: SuperValidated<UpdateSubject> = data.form;
</script>

<div class="m-4">
	<div class="flex">
		<Form.Root method="POST" {form} schema={updateSubject} let:config id="subject-update">
			<div class="flex gap-1 items-center">
				<Form.Field {config} name="subject">
					<Form.Input value={data.ticket?.subject} />
				</Form.Field>
				<Test {form} name="subject"/>
			</div>
		</Form.Root>
	</div>
</div>