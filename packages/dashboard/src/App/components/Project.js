import { useEffect, useState } from 'react'
import ReactAnsi from 'react-ansi'
import {
	Box,
	Code,
	Flex,
	GridItem,
	Heading,
	HStack,
	SimpleGrid,
	Spacer,
	Stack,
	Text,
} from '@chakra-ui/layout'
import { Stat, StatLabel, StatNumber, Button, Switch } from '@chakra-ui/react'
import { ScrollBarCSS } from '../../constants/scrollbar'
import socket from '../../providers/socket'
import { projectType } from '../utils/project-type'
import { ProjectStore } from '../../store/projects'

const Project = ({ location }) => {
	const { state: project } = location

	const { name, description, dependencies, license, scripts } = project
	const allDeps = Object.keys(dependencies)
	const projectTypes = projectType(allDeps)
	const logs = ProjectStore.useState((s) => s.logs[name]) || ''

	const RunScript = async (script, checked) => {
		socket.emit('run-script', {
			script,
			name,
			checked,
		})
	}

	const logHandler = () => {
		let logkey = `log-${name}`
		let _logs = ''

		socket.on(logkey, (log) => {
			_logs += log
			ProjectStore.update((s) => {
				s.logs[name] = _logs
			})
		})
	}

	useEffect(() => {
		logHandler()
	}, [])

	// const Controls = () => {
	// 	return (
	// 		<Flex>
	// 			<Box shadow='md' rounded='lg' p={4}>
	// 				<Heading fontWeight='normal'>Controls</Heading>
	// 				<Stack mt={4}>
	// 					<Button colorScheme='brand'>Start</Button>
	// 				</Stack>
	// 			</Box>
	// 		</Flex>
	// 	)
	// }

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
				<Box h='300px'>
					<ReactAnsi
						autoScroll={true}
						bodyStyle={{ maxHeight: 500, overflowY: 'auto' }}
						style={{ backgroundColor: 'white' }}
						log={logs || ''}
					/>
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
								<Switch
									colorScheme='brand'
									onChange={(e) => RunScript(script, e.target.checked)}
								/>
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
				{/* Controls */}
				{/* <Controls /> */}

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
