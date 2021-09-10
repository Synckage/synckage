const config = require('../../utils/config')

class Projects {
	async find() {
		const projects = config.get('projects')
		return projects
	}

	async create(data) {
		this.projects.push(data)
	}
}
module.exports = Projects
