const updateProject = async (req, res) => {
    try {
        const project = await Project.findOne({ _id : req.params.id, parent : req.user._id })
        if (!project) {
            return res.status(404).json({ message: "Project not found" })
        }
        project.name = req.body.name || project.name
        project.description = req.body.description || project.description
        await project.save()
        res.json({ message: "Project updated successfully", project })
    } catch (error) {
        res.status(500).json({ message: "Error updating project" })
    }
}

export { updateProject }