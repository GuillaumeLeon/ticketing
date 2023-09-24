import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const zeTheme: CustomThemeConfig = {
    name: 'ze-theme',
    properties: {
        // =~= Theme Properties =~=
        "--theme-font-family-base": `system-ui`,
        "--theme-font-family-heading": `system-ui`,
        "--theme-font-color-base": "0 0 0",
        "--theme-font-color-dark": "255 255 255",
        "--theme-rounded-base": "8px",
        "--theme-rounded-container": "8px",
        "--theme-border-base": "1px",
        // =~= Theme On-X Colors =~=
        "--on-primary": "var(--color-primary-50)",
        "--on-secondary": "0 0 0",
        "--on-tertiary": "255 255 255",
        "--on-success": "0 0 0",
        "--on-warning": "0 0 0",
        "--on-error": "255 255 255",
        "--on-surface": "255 255 255",
        // =~= Theme Colors  =~=
        // primary | #4d3fe3 
        "--color-primary-50": "228 226 251", // #e4e2fb
        "--color-primary-100": "219 217 249", // #dbd9f9
        "--color-primary-200": "211 207 248", // #d3cff8
        "--color-primary-300": "184 178 244", // #b8b2f4
        "--color-primary-400": "130 121 235", // #8279eb
        "--color-primary-500": "77 63 227", // #4d3fe3
        "--color-primary-600": "69 57 204", // #4539cc
        "--color-primary-700": "58 47 170", // #3a2faa
        "--color-primary-800": "46 38 136", // #2e2688
        "--color-primary-900": "38 31 111", // #261f6f
        // secondary | #e68a00 
        "--color-secondary-50": "251 237 217", // #fbedd9
        "--color-secondary-100": "250 232 204", // #fae8cc
        "--color-secondary-200": "249 226 191", // #f9e2bf
        "--color-secondary-300": "245 208 153", // #f5d099
        "--color-secondary-400": "238 173 77", // #eead4d
        "--color-secondary-500": "230 138 0", // #e68a00
        "--color-secondary-600": "207 124 0", // #cf7c00
        "--color-secondary-700": "173 104 0", // #ad6800
        "--color-secondary-800": "138 83 0", // #8a5300
        "--color-secondary-900": "113 68 0", // #714400
        // tertiary | #016fc7 
        "--color-tertiary-50": "217 233 247", // #d9e9f7
        "--color-tertiary-100": "204 226 244", // #cce2f4
        "--color-tertiary-200": "192 219 241", // #c0dbf1
        "--color-tertiary-300": "153 197 233", // #99c5e9
        "--color-tertiary-400": "77 154 216", // #4d9ad8
        "--color-tertiary-500": "1 111 199", // #016fc7
        "--color-tertiary-600": "1 100 179", // #0164b3
        "--color-tertiary-700": "1 83 149", // #015395
        "--color-tertiary-800": "1 67 119", // #014377
        "--color-tertiary-900": "0 54 98", // #003662
        // success | #26cf97 
        "--color-success-50": "222 248 239", // #def8ef
        "--color-success-100": "212 245 234", // #d4f5ea
        "--color-success-200": "201 243 229", // #c9f3e5
        "--color-success-300": "168 236 213", // #a8ecd5
        "--color-success-400": "103 221 182", // #67ddb6
        "--color-success-500": "38 207 151", // #26cf97
        "--color-success-600": "34 186 136", // #22ba88
        "--color-success-700": "29 155 113", // #1d9b71
        "--color-success-800": "23 124 91", // #177c5b
        "--color-success-900": "19 101 74", // #13654a
        // warning | #ff7212 
        "--color-warning-50": "255 234 219", // #ffeadb
        "--color-warning-100": "255 227 208", // #ffe3d0
        "--color-warning-200": "255 220 196", // #ffdcc4
        "--color-warning-300": "255 199 160", // #ffc7a0
        "--color-warning-400": "255 156 89", // #ff9c59
        "--color-warning-500": "255 114 18", // #ff7212
        "--color-warning-600": "230 103 16", // #e66710
        "--color-warning-700": "191 86 14", // #bf560e
        "--color-warning-800": "153 68 11", // #99440b
        "--color-warning-900": "125 56 9", // #7d3809
        // error | #d32f2f 
        "--color-error-50": "248 224 224", // #f8e0e0
        "--color-error-100": "246 213 213", // #f6d5d5
        "--color-error-200": "244 203 203", // #f4cbcb
        "--color-error-300": "237 172 172", // #edacac
        "--color-error-400": "224 109 109", // #e06d6d
        "--color-error-500": "211 47 47", // #d32f2f
        "--color-error-600": "190 42 42", // #be2a2a
        "--color-error-700": "158 35 35", // #9e2323
        "--color-error-800": "127 28 28", // #7f1c1c
        "--color-error-900": "103 23 23", // #671717
        // surface | #10426c 
        "--color-surface-50": "219 227 233", // #dbe3e9
        "--color-surface-100": "207 217 226", // #cfd9e2
        "--color-surface-200": "195 208 218", // #c3d0da
        "--color-surface-300": "159 179 196", // #9fb3c4
        "--color-surface-400": "88 123 152", // #587b98
        "--color-surface-500": "16 66 108", // #10426c
        "--color-surface-600": "14 59 97", // #0e3b61
        "--color-surface-700": "12 50 81", // #0c3251
        "--color-surface-800": "10 40 65", // #0a2841
        "--color-surface-900": "8 32 53", // #082035

    }
}