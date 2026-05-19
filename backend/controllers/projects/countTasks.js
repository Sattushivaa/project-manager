import { Task } from "../../models/Task.js";

const countTasks = async (req, res) => {
    try {
        const projectId = req.body.projectId;
        const count = await Task.countDocuments({ projectId });
        res.status(200).json({ error: false, count });
    } catch (error) {
        res.status(500).json({ error: true, message: "Error counting tasks" });
    }
}

export { countTasks }
