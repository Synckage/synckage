import { Link } from 'react-router-dom'
import { Box, HStack, Text } from '@chakra-ui/layout'
import { Tag } from '@chakra-ui/tag'

const SidebarItem = (project) => {
	const { name, version, dependencies, isActive } = project
	const totalDeps = Object.keys(dependencies).length

	return (
		<Box
			m={2}
			p={3}
			bg={isActive && 'gray.700'}
			textColor={isActive && 'white'}
			transition='background 0.2s, color 0.2s'
			_hover={{ bg: 'gray.700', color: 'white' }}
			cursor='pointer'
			rounded='lg'
		>
			<Link to={{ pathname: `/${name}`, state: project }}>
				<Text fontSize='xl'>{name}</Text>
				<HStack mt={2}>
					<Tag size='sm' colorScheme='cyan'>
						v{version}
					</Tag>
					<Tag size='sm'>{totalDeps} deps</Tag>
				</HStack>
			</Link>
		</Box>
	)
}

export { SidebarItem }
