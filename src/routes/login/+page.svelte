<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { loginSchema, type LoginSchema } from './schema';
	import { Button } from '$lib/components/ui/button';

	export let form: SuperValidated<LoginSchema>;
</script>

<div class="flex h-screen justify-center items-center">
	<Form.Root method="POST" {form} schema={loginSchema} let:config>
		<Card.Root class="w-[350px]">
			<Card.Header>
				<Card.Title>Login</Card.Title>
			</Card.Header>
			<Card.Content>
				<Form.Item>
					<Form.Field {config} name="email">
						<Form.Label>Email</Form.Label>
						<Form.Input />
						<Form.Validation />
					</Form.Field>
				</Form.Item>
				<Form.Item>
					<Form.Field {config} name="password">
						<Form.Label>Password</Form.Label>
						<Form.Input type="password" />
						<Form.Validation />
					</Form.Field>
				</Form.Item>
			</Card.Content>
			<Card.Footer class="flex justify-between">
				<Form.Button>Submit</Form.Button>
			</Card.Footer>
		</Card.Root>
	</Form.Root>
</div>
