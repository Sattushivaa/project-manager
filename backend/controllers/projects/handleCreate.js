import { Project } from "./../../models/Project.js"

const createProject = async (req, res) => {
    try {
        const project = await Project.create({
            name: req.body.name,
            description: req.body.description,
            parent: req.user && req.user._id ? req.user._id : undefined
        })
        res.status(201).json({ error: false, project })
    } catch (error) {
        console.error('CreateProject error:', error)
        res.status(500).json({ error: true, message: 'Error creating project' })
    }
}

export { createProject }