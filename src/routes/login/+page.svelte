<script lang="ts">
    import { Form } from 'formsnap';
    import { loginSchema } from './schemas';
    import InputField from '$lib/components/input-form-field.svelte';
    export let data;
</script>

<div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div
        class="max-w-sm rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200 dark:border-gray-700"
    >
        <div class="space-y-2 text-center">
            <h1 class="text-3xl font-bold">Login</h1>
            <p class="text-zinc-500 dark:text-zinc-400">
                By logging in, you accept our
                <a class="text-blue-500 hover:text-blue-700" href="#termss"> terms </a>
                and
                <a class="text-blue-500 hover:text-blue-700" href="#policy"> privacy policy </a>
                .
            </p>
        </div>
        <div class="space-y-4">
            <Form.Root schema={loginSchema} form={data.form} let:config>
                <div class="flex gap-1 flex-col">
                    <InputField {config} name="email" label="Email" />
                    <InputField {config} name="password" label="Password" type="password" />
                    <div class="w-full flex justify-end">
                        <button type="submit" class="btn btn-primary btn-sm">Log in</button>
                    </div>
                </div>
            </Form.Root>
        </div>
    </div>
</div>
