#!/usr/bin/env node

const { version } = require('../package.json')
const { program } = require('commander')

const { server, add, remove } = require('../src')

program.version(version)

program
	.option('-s, --start', 'starts web server for dashboard')
	.option('-a, --add', 'add current project to synckage')
	.option('-r, --remove <name>', 'remove specific project from synckage')

program.parse(process.argv)

const options = program.opts()

if (options.start) {
	server()
}

if (options.remove) {
	remove(options.remove)
}

if (options.add) {
	add(process.cwd())
}