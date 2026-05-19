import mongoose, { model, Schema } from "mongoose";

const taskSchema = Schema.create({
    projectId : Schema.ObjectId,
    title : String,
    description : String,
    status : {
        type : String,
        enum : ["todo","in-progress","done"]
    },
    assignedTo : String,
},{ 
    timestamps: true 
})

const Task = mongoose.models.Task || model("Task", taskSchema)

export {
    Task
}