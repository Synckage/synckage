import { SiNextDotJs, SiReact } from 'react-icons/si'
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
