import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',

  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--sans)', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['var(--mono)', 'ui-monospace', 'Consolas', 'monospace'],
      },
      colors: {
        // Keep a gentle mapping to CSS vars used by the template.
        text: 'var(--text)',
        'text-h': 'var(--text-h)',
        bg: 'var(--bg)',
        border: 'var(--border)',
        'code-bg': 'var(--code-bg)',
        accent: 'var(--accent)',
        'accent-bg': 'var(--accent-bg)',
        'accent-border': 'var(--accent-border)',
      },
      boxShadow: {
        // educational/VSCode-ish soft glow.
        soft: 'var(--shadow)',
      },
    },
  },
  plugins: [],
} satisfies Config

