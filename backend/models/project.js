import { model, Schema } from "mongoose";

const projectSchema = new Schema({
    name : String,
    description : String,
    parent : Schema.ObjectId
}, {
    timestamps : {
        createdAt : true,
        updatedAt : false
    }
})

const Project = model("Project",projectSchema)

export { Project }