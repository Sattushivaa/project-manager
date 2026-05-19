import { Task } from "../../models/task";

const handleUpdateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        Object.assign(task, req.body);
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Error updating task" });
    }
};

export { handleUpdateTask };