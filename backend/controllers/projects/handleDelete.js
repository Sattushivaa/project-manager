const deleteProject = async (req, res) => {
    try {
        await Project.findAndDelete({ _id : req.params.id, parent : req.user._id })
        res.json({ message: "Project deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error deleting project" })
    }
}

export { deleteProject }