import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            animation: {
                enter: 'fadeInRight 300ms ease-out',
                leave: 'fadeOutLeft 300ms ease-in forwards',
            },
            keyframes: {
                fadeInRight: {
                    '0%': {
                        opacity: '0',
                        transform: 'translate(2rem)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translate(0)',
                    },
                },
                fadeOutLeft: {
                    '0%': {
                        opacity: '1',
                    },
                    '100%': {
                        opacity: '0',
                    },
                },
            },
        },
    },
    plugins: [],
}
export default config
