const { existsSync } = require('fs')
const config = require('./config')

const add = (dir) => {
	let packageFile = `${dir}/package.json`

	if (!existsSync(packageFile)) {
		console.log(`Invalid project directory`.red.bold)
		return
	}

	const packageData = require(packageFile)
	const projects = config.get('projects')

	const _exists = projects.filter(
		(project) => project.name === packageData.name
	)

	if (_exists.length > 0) {
		console.log(`Project "${packageData.name}" is already added`.red.bold)
		return
	}

	projects.push({
		...packageData,
		__dir: dir,
	})
	config.set('projects', projects)
	console.log(`Project "${packageData.name}" is successfully added`.blue.bold)
}

module.exports = add
