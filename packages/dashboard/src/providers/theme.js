import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
	fonts: {
		heading: 'Ubuntu',
	},
	colors: {
		brand: {
			50: '#e3fded',
			100: '#bbf9d3',
			200: '#87f6b6',
			300: '#31f295',
			400: '#00ec79',
			500: '#00e464',
			600: '#00d358',
			700: '#00bf4a',
			800: '#00ad3e',
			900: '#008b29',
		},
	},
})

export default theme
