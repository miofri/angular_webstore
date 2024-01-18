/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./public/**/*.html', './src/**/*.{html,ts,tsx}'],
	purge: ['./src/**/*.{html,ts}'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['light', 'dark', 'night'],
	},
};
