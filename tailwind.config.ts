import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tscolors: {
          navy: {
            DEFAULT: '#0F2744',
            light: '#1A3A5C',
            dark: '#091C30',
          },
          gold: {
            DEFAULT: '#E8A020',
            light: '#F5C05A',
            dark: '#C4831A',
          },
          cloud: '#F5F6F8',
        },
      },
    },
  },
  plugins: [],
}

export default config
