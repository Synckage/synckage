const config = require('./config')

const remove = (projectName) => {
	let projects = config.get('projects')

	const _exists = projects.find((project) => project.name === projectName)
	if (!_exists) {
		console.log(`Project "${projectName}" doesn't exists`.red.bold)
		return
	}

	projects = projects.filter((project) => project.name !== projectName)

	config.set('projects', projects)
	console.log(`Removed "${projectName}"`.blue.bold)
}

module.exports = remove
