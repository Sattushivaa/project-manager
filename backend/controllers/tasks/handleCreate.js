import { Task } from "../../models/task.js"

const createTask = async (req, res) =>{
    try {
        let payload = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status || "todo",
            projectId : req.params.id
        }
        if(req.body.assignedTo){
            payload.assignedTo = req.body.assignedTo
        }
        const task = await Task.create(payload)
        res.status(201).json({ message: "Task created successfully", task })
    } catch (error) {
        res.status(500).json({ message: "Error creating task" })
    }
}

export { createTask }