const io = require('socket.io-client')
const HOST =
	process.env.NODE_ENV === 'development' ? 'http://localhost:9999' : '/'

const socket = io(HOST)
export default socket
