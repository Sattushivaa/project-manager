const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete({ _id : req.params.id })
        res.json({ message: "Task deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error deleting task" })
    }
}

export { deleteTask }