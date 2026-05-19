import {Project} from "./../../models/Project.js"

const createProject = async (req, res) => {
    Project.create({
        name : req.body.name,
        description : req.body.description
    })
}

export { createProject }