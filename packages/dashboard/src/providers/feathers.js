const feathersjs = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio-client')
const io = require('socket.io-client')

const HOST =
	process.env.NODE_ENV === 'development' ? 'http://localhost:9999' : '/'

const socket = io(HOST)
const feathers = feathersjs()

feathers.configure(socketio(socket))

export default feathers
