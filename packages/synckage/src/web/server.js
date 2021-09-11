const Projects = require('./services/projects')

const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

io.on('connection', async (socket) => {
	socket.emit('projects', await Projects.find())
	socket.on('disconnect', function () {
		console.log('A user disconnected')
	})
})

module.exports = http
