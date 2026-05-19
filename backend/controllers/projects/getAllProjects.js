const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({ parent : req.user._id })
        res.json({ projects })
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects" })
    }
}

export { getAllProjects }