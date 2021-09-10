import {
	Box,
	Center,
	Flex,
	GridItem,
	Heading,
	SimpleGrid,
	Stack,
	Text,
} from '@chakra-ui/layout'
import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react'
import { projectType } from '../utils/project-type'

const Project = ({ location }) => {
	const { state: project } = location

	const { name, description, dependencies, license } = project
	const allDeps = Object.keys(dependencies)

	const Stats = () => {
		const depCount = allDeps.length
		const types = projectType(allDeps)

		return (
			<SimpleGrid columns={3} spacing={4}>
				{/*  Total Dependencies */}
				<GridItem colSpan={1}>
					<Stat shadow='md' rounded='lg' p={4}>
						<StatNumber fontSize='4xl'>
							{depCount < 10 ? `0${depCount}` : depCount}
						</StatNumber>
						<StatLabel fontSize='xl'>Total Dependencies</StatLabel>
					</Stat>
				</GridItem>

				{/*  LICENSE */}
				<GridItem colSpan={1}>
					<Stat shadow='md' rounded='lg' p={4}>
						<StatNumber fontSize='4xl'>{license || 'None'}</StatNumber>
						<StatLabel fontSize='xl'>License</StatLabel>
					</Stat>
				</GridItem>

				{/*  Project Type */}
				<Flex shadow='md' rounded='lg' p={4}>
					<Center>
						{types.map(({ icon }, idx) => (
							<Box key={idx} mr={2} fontSize='6xl'>
								{icon}
							</Box>
						))}
					</Center>
				</Flex>
			</SimpleGrid>
		)
	}

	return (
		<Box>
			<Stack bg='gray.700' p={4} textColor='gray.300'>
				<Heading>{name}</Heading>
				<Text>{description}</Text>
			</Stack>
			<Box p={4}>
				<Stats />
			</Box>
		</Box>
	)
}

export default Project
