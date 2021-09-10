const PORT = 9999
const path = require('path')
const feathers = require('@feathersjs/feathers')
const express = require('@feathersjs/express')
const socketio = require('@feathersjs/socketio')

// services
const Common = require('./services/common')
const Projects = require('./services/projects')

const webappDir = path.join(__dirname, 'webapp')

const app = express(feathers())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(webappDir))

app.configure(express.rest())
app.configure(socketio())

app.on('connection', (connection) => {
	app.channel('synckage').join(connection)
})
app.publish(() => app.channel('synckage'))

// setup services
app.use('/common', new Common())
app.use('/projects', new Projects())

app.get('*', (req, res) => {
	res.sendFile(webappDir + '/index.html')
})

module.exports = () => {
	app.listen(PORT, () => console.log(`server listening on ${PORT}`.green.bold))
}
