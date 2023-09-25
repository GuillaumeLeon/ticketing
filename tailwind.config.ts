import { join } from 'path';
import type { Config } from 'tailwindcss';

import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography';
import daisyUi from 'daisyui';

const config = {
    darkMode: 'class',
    content: [
        './src/**/*.{html,js,svelte,ts}',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        daisyUi,
        forms,
        typography
    ],
    daisyui: {
        themes: ["business"]
    }
} satisfies Config;

export default config;
