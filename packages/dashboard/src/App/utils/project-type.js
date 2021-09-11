import { SiMongodb, SiNextDotJs, SiReact } from 'react-icons/si'
import { FiFeather } from 'react-icons/fi'
const projectType = (dependencies) => {
	let final = []

	const types = [
		{
			type: 'React',
			icon: <SiReact />,
			deps: ['react', 'react-dom'],
		},
		{
			type: 'Next',
			icon: <SiNextDotJs />,
			deps: ['next'],
		},
		{
			type: 'Feathers',
			icon: <FiFeather />,
			deps: ['@feathersjs/feathers'],
		},
		{
			type: 'MongoDB',
			icon: <SiMongodb />,
			deps: ['mongoose'],
		},
	]

	types.map((type) => {
		let hasDep = true
		for (let dep of type.deps) {
			if (!dependencies.includes(dep)) {
				hasDep = false
			}
		}

		if (hasDep) final.push(type)
	})

	return final
}

export { projectType }
