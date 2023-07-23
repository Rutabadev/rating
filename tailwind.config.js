const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Futura', 'Josefin Sans', ...defaultTheme.fontFamily.serif]
			}
		}
	},
	plugins: []
};
