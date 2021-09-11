const config = require('../../utils/config')

const Projects = {
	async find() {
		const projects = config.get('projects')
		return projects
	},

	async create(data) {
		if (data) this.projects.push(data)
	},
}

module.exports = Projects
