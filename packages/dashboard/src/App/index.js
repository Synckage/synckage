import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Box, Flex, Center, Image, Heading } from '@chakra-ui/react'
import { Route, Switch } from 'react-router-dom'

import feathers from '../providers/feathers'
import { ProjectStore } from '../store/projects'
import Analytics from './components/Analytics'
import { SidebarItem } from './components/Sidebar'
import Project from './components/Project'

const App = () => {
	const projects = ProjectStore.useState((s) => s.projects)

	const Fetch = async () => {
		const data = await feathers.service('projects').find()
		ProjectStore.update((s) => {
			s.projects = data
		})
	}

	useEffect(Fetch, [])

	return (
		<Flex h='100vh'>
			<Box w={{ base: 'full', md: 80 }} shadow='lg' pos='relative'>
				<Center
					py={2}
					borderBottomWidth='1px'
					bgGradient='linear(to-r, #78D5FF, #87F6B6)'
				>
					<Image src='/logo.png' w={12} />
				</Center>

				{projects.map((project, idx) => {
					return (
						<SidebarItem
							{...project}
							key={idx}
							isActive={window.location.pathname.includes(project.name)}
						/>
					)
				})}
				<Box
					pos='absolute'
					bottom={0}
					p={2}
					bg='gray.700'
					w='100%'
					textColor='white'
					textAlign='center'
				></Box>
			</Box>

			<Box w='full'>
				<Switch>
					<Route path='/:project' component={Project} />
					<Route component={Analytics} />
				</Switch>
			</Box>
		</Flex>
	)
}

export default withRouter(App)
