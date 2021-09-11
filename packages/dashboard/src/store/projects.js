import { Store } from 'pullstate'

export const ProjectStore = new Store({
	projects: [],
	logs: {},
	activeScripts: {},
})
