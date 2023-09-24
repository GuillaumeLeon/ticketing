import { join } from 'path';
import type { Config } from 'tailwindcss';

import forms from '@tailwindcss/forms'
import { zeTheme } from './src/theme';
import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
    darkMode: 'class',
    content: [
        './src/**/*.{html,js,svelte,ts}',
        join(require.resolve(
            '@skeletonlabs/skeleton'),
            '../**/*.{html,js,svelte,ts}'
        )
    ],
    theme: {
        extend: {},
    },
    plugins: [
        skeleton({
            themes: {
                custom: [
                    zeTheme
                ]
            }
        }),
        forms
    ]
} satisfies Config;

export default config;
