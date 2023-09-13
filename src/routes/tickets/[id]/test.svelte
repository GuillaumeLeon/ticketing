<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Check } from 'lucide-svelte';
    export let form;
    export let name;
    console.log({form, name});
</script>

<Button variant="ghost" class="p-0 h-0"><Check size="16" /></Button>
