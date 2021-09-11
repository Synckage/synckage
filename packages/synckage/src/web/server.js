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
	console.log('socket', socket.id)
	socket.emit('projects', await Projects.find())
	socket.on('disconnect', function () {
		console.log('A user disconnected')
	})
})

module.exports = http
