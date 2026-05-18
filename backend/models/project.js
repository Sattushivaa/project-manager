import { Model, Schema } from "mongoose";

const projectSchema = new Schema({
    name : String,
    description : String
}, {
    timestamps : {
        createdAt : true,
        updatedAt : false
    }
})

const Project = Model(projectSchema)

export { Project }