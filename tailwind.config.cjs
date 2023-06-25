/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			inter: ['Inter', 'sans-serif']
		},
		extend: {
			colors: {
				accent1: {
					50: 'hsl(320, 20%, 97%)',
					100: 'hsl(317, 26%, 95%)',
					200: 'hsl(319, 31%, 90%)',
					300: 'hsl(318, 29%, 82%)',
					400: 'hsl(319, 29%, 70%)',
					500: 'hsl(320, 28%, 60%)',
					600: 'hsl(324, 24%, 48%)',
					700: 'hsl(326, 26%, 42%)',
					800: 'hsl(326, 26%, 35%)',
					900: 'hsl(326, 24%, 30%)',
					950: 'hsl(326, 29%, 17%)'
				},
				accent2: {
					50: 'hsl(26, 78%, 96%)',
					100: 'hsl(23, 81%, 92%)',
					200: 'hsl(22, 79%, 83%)',
					300: 'hsl(21, 80%, 72%)',
					400: 'hsl(17, 79%, 63%)',
					500: 'hsl(15, 77%, 53%)',
					600: 'hsl(11, 74%, 48%)',
					700: 'hsl(8, 73%, 40%)',
					800: 'hsl(5, 65%, 34%)',
					900: 'hsl(6, 61%, 28%)',
					950: 'hsl(4, 68%, 15%)'
				}
			}
		}
	},

	plugins: []
};

module.exports = config;
