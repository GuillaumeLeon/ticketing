import { join } from 'path';
import type { Config } from 'tailwindcss';

import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import daisyUi from 'daisyui';
import theme from 'daisyui/src/theming/themes';

const config = {
    darkMode: 'class',
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {},
    },
    plugins: [daisyUi, forms, typography],
    daisyui: {
        themes: [
            {
                night: {
                    ...theme['[data-theme=night]'],
                    '--rounded-box': '0.5rem', // border radius rounded-box utility class, used in card and other large boxes
                    '--rounded-btn': '0.5rem', // border radius rounded-btn utility class, used in buttons and similar element
                    '--rounded-badge': '0.5rem', // border radius rounded-badge utility class, used in badges and similar
                },
                minWidth: {
                    message: '4rem',
                },
            },
        ],
    },
} satisfies Config;

export default config;
