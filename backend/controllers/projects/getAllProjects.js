import { Project } from "../../models/Project.js"

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({ parent : req.user._id })
        res.json({ projects })
    } catch (error) {
        console.error('GetAllProjects error:', error)
        res.status(500).json({ message: "Error fetching projects" })
    }
}

export { getAllProjects }