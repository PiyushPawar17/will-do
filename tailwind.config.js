/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{ts,tsx,scss}', './components/**/*.{ts,tsx,scss}'],
	theme: {
		extend: {
			lineHeight: {
				0: 0
			}
		}
	},
	plugins: []
};
