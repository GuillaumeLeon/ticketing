import type { Config } from 'tailwindcss';

import plugin from 'tailwindcss/plugin';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import daisyUi from 'daisyui';
import theme from 'daisyui/src/theming/themes';

const config = {
    darkMode: 'class',
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                magnum: {
                    '50': '#fff9ed',
                    '100': '#fef2d6',
                    '200': '#fce0ac',
                    '300': '#f9c978',
                    '400': '#f7b155',
                    '500': '#f38d1c',
                    '600': '#e47312',
                    '700': '#bd5711',
                    '800': '#964516',
                    '900': '#793a15',
                    '950': '#411c09',
                },
            },
        },
    },
    plugins: [
        daisyUi,
        forms,
        typography,
        plugin(function ({ addVariant, matchUtilities, theme }) {
            addVariant('hocus', ['&:hover', '&:focus']);
            // Square utility
            matchUtilities(
                {
                    square: (value) => ({
                        width: value,
                        height: value,
                    }),
                },
                { values: theme('spacing') },
            );
        }),
    ],
    daisyui: {
        themes: [
            {
                night: {
                    ...theme['[data-theme=corporate]'],
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
