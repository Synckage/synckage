import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
	fonts: {
		heading: 'Ubuntu',
	},
	colors: {
		brand: {
			50: '#e6f2ff',
			100: '#c4dfff',
			200: '#a0ccff',
			300: '#7fb8ff',
			400: '#6ca7ff',
			500: '#6298fe',
			600: '#5e8aef',
			700: '#5977db',
			800: '#5365c7',
			900: '#4a46a6',
		},
	},
})

export default theme
