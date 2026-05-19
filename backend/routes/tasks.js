import { Router } from "express";
import { handleUpdateTask } from "../controllers/tasks/handleUpdate";
import { deleteTask } from "../controllers/tasks/handleDelete";
const tasksRoute = new Router();

tasksRoute.put("/:id", handleUpdateTask)
tasksRoute.delete("/:id", deleteTask)

export default tasksRoute;