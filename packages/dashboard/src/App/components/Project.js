import {
	Box,
	Code,
	Divider,
	Flex,
	GridItem,
	Heading,
	HStack,
	SimpleGrid,
	Spacer,
	Stack,
	Text,
} from '@chakra-ui/layout'
import { Stat, StatLabel, StatNumber, Button } from '@chakra-ui/react'
import { ScrollBarCSS } from '../../constants/scrollbar'
import { projectType } from '../utils/project-type'

const Project = ({ location }) => {
	const { state: project } = location

	if (!project) {
		window.location.href = '/'
		return
	}

	const { name, description, dependencies, license, scripts } = project
	const allDeps = Object.keys(dependencies)
	const projectTypes = projectType(allDeps)

	const Stats = () => {
		const depCount = allDeps.length

		return (
			<SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} maxW='4xl'>
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

				{/*  Project Status */}
				<GridItem colSpan={1}>
					<Stat shadow='md' rounded='lg' p={4}>
						<StatNumber fontSize='4xl'>{'Stopped'}</StatNumber>
						<StatLabel fontSize='xl'>Status</StatLabel>
					</Stat>
				</GridItem>
			</SimpleGrid>
		)
	}

	const Logs = () => {
		return (
			<Stack borderWidth='1px' rounded='lg' p={2}>
				<Heading fontWeight='normal'>Logs</Heading>
				<Box h='300px' overflow='auto'>
					<p>Nostrud ex irure occaecat id.</p>
				</Box>
			</Stack>
		)
	}

	const Scripts = () => {
		const allScripts = Object.keys(scripts)
		return (
			<Box borderWidth='1px' rounded='lg' p={2}>
				<Heading fontWeight='normal'>Scripts</Heading>
				<Stack mt={4} p={2} h='64' overflow='auto' css={ScrollBarCSS}>
					{allScripts.map((script, idx) => (
						<Box key={idx}>
							<Flex>
								<Box>
									<Text fontWeight='semibold'>{script}</Text>
									<Code>{scripts[script]}</Code>
								</Box>
								<Spacer />
								<Button size='sm'>{script}</Button>
							</Flex>
						</Box>
					))}
				</Stack>
			</Box>
		)
	}

	const Dependencies = () => {
		return (
			<Box borderWidth='1px' rounded='lg' p={2}>
				<Heading fontWeight='normal'>Dependencies</Heading>
				<Stack mt={4} p={2} h='64' overflow='auto' css={ScrollBarCSS}>
					{allDeps.map((dep, idx) => (
						<Box key={idx}>
							<Flex>
								<Box>
									<Text fontWeight='semibold'>{dep}</Text>
									<Code>{dependencies[dep]}</Code>
								</Box>
								<Spacer />
								<Button size='sm'>remove</Button>
							</Flex>
						</Box>
					))}
				</Stack>
			</Box>
		)
	}

	return (
		<Box>
			<Stack bg='gray.700' p={4} textColor='gray.300'>
				<Flex>
					<Stack>
						<Heading>{name}</Heading>
						<Text>{description}</Text>
					</Stack>
					<Spacer />
					<HStack>
						{projectTypes.map((type, idx) => (
							<Box fontSize='4xl' key={idx}>
								{type.icon}
							</Box>
						))}
					</HStack>
				</Flex>
			</Stack>
			<Stack p={4} spacing={6}>
				{/* Stats */}
				<Stats />
				<SimpleGrid columns={10} spacing={4}>
					<GridItem colSpan={{ base: 10, md: 4 }}>
						{/* Scripts */}
						<Scripts />
					</GridItem>
					<GridItem colSpan={{ base: 10, md: 6 }}>
						{/* Dependencies */}
						<Dependencies />
					</GridItem>
				</SimpleGrid>
				{/* Logs */}
				<Logs />
			</Stack>
		</Box>
	)
}

export default Project
