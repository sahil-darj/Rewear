/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Indigo Blue
        secondary: '#38BDF8', // Sky Blue
        accent: '#10B981', // Emerald Green
        background: '#F8FAFC', // Light Slate
        surface: '#FFFFFF', // White
        text: '#1E293B', // Charcoal
        mutedText: '#64748B', // Gray
        danger: '#F43F5E', // Rose Red
      },
    },
  },
  plugins: [],
};
