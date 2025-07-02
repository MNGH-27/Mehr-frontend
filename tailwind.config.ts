/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/templates/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                gray: {
                    '100': '#F9F9F9',
                    '200': '#E1E1E1',
                    '300': '#EDEDED',
                    '400': '#CBCBCB',
                    '500': '#ADADAD',
                    '600': '#757575',
                    '700': '#717171',
                    '800': '#353535',
                    DEFAULT: '#ADADAD'
                },
                primary: '#034eaa',
                'primary-tinted': {
                    '100': '#DEEDFE',
                    '200': '#BDDAFE',
                    '300': '#9CC8FD',
                    '400': '#7AB5FD',
                    '500': '#59A3FC',
                    '600': '#3890FC',
                    '700': '#177EFB',
                    '800': '#046DED',
                    '900': '#035DCC',
                    '950': '#034EAB'
                },
                'primary-shade': {
                    '100': '#034EAB',
                    '200': '#02469A',
                    '300': '#023F89',
                    '400': '#023778',
                    '500': '#022F66',
                    '600': '#011F44',
                    '700': '#011F44',
                    '800': '#011733',
                    '900': '#011022',
                    '950': '#000811'
                },
                secondary: {
                    '100': '#f4f6f8',
                    '200': '#f4f6f8',
                    '300': '#eef2f4',
                    '400': '#e9edf0',
                    '500': '#e2e8ec',
                    '600': '#abbdc8',
                    '700': '#7390a4',
                    '800': '#496170',
                    '900': '#253038',
                    DEFAULT: '#E2E8EC'
                },
                success: '#00966D',
                'success-light': '#00BA88',
                'success-extralight': '#F3FDFA',
                error: '#C30000',
                'error-light': '#ED2E2E',
                'error-extralight': '#FFF2F2',
                warning: '#A9791C',
                'warning-light': '#F4B740',
                'warning-extralight': '#FFF8E1',
                transparent: '#ffffff00'
            },
            fontFamily: {
                'iran-yekan-bakh': ['var(--font-iran-yekan-bakh)']
            }
        }
    },
    plugins: [require('tailwindcss-animate')]
}
export default config
