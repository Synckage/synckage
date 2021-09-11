const config = require('../../utils/config')

class Projects {
	static async find() {
		const projects = config.get('projects')
		return projects
	}

	static async create(data) {
		if (data) this.projects.push(data)
	}
}

module.exports = Projects
