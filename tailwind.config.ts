import type { Config } from 'tailwindcss';
export default {
  content: ['./src/**/*.{ts,tsx}'],
  corePlugins: { preflight: false },
  theme: { extend: {
    colors: { paper: '#f7f3ec', walnut: '#7a4a2c', ink: '#2a2622' },
    spacing: { fluid: 'var(--space-m)', gutter: 'var(--space-l-xl)' },
    fontSize: { fluid: 'var(--step-0)' },
  } },
  plugins: [],
} satisfies Config;
