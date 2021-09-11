const spawn = require('child_process').spawn
const Projects = require('./services/projects')

const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
	allowEIO3: true,
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
		credentials: true,
	},
})

io.on('connection', async (socket) => {
	// emit all projects on connection
	socket.emit('projects', await Projects.find())

	socket.on('run-script', async (data) => {
		const { script, name, checked } = data
		const projects = await Projects.find()
		const project = projects.find((p) => p.name == name)
		if (!project) {
			socket.emit('run-script', { error: 'Project cannot be found' })
			return
		}

		if (checked) {
			let child = spawn('npm', ['run', script], { cwd: project.__dir })
			child.stdout.setEncoding('utf8')
			child.stdout.on('data', (data) => {
				let logkey = `log-${name}`
				socket.emit(logkey, data)
			})
		}
	})

	socket.on('disconnect', function () {
		console.log('A user disconnected')
	})
})

module.exports = http
