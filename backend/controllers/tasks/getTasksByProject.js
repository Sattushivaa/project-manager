const getTasksByProject = async (req, res) => {
    try {
        const tasks = await Task.find({ projectId : req.params.id })
        res.status(200).json({ tasks })
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks" })
    }
}

export { getTasksByProject }