import { Router } from "express";
const projectsRoute = new Router()
import { getAllProjects } from "../controllers/projects/getAllProjects.js";
import { createProject } from "../controllers/projects/handleCreate.js";
import { getTasksByProject } from "../controllers/tasks/getTasksByProject.js";
import { updateProject } from "../controllers/projects/handleUpdate.js";
import { deleteProject } from "../controllers/projects/handleDelete.js";
import { createTask } from "../controllers/tasks/handleCreate.js";

projectsRoute.get("/", getAllProjects)
projectsRoute.post("/", createProject)

projectsRoute.get("/:id", getTasksByProject)
projectsRoute.put("/:id", updateProject)
projectsRoute.delete("/:id", deleteProject)
projectsRoute.post("/:id/tasks", createTask)

export default projectsRoute;