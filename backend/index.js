import express from "express";
import cors from "cors"
import authRoute from "./routes/auth.js";
import projectsRoute from "./routes/projects.js";

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use("/auth", authRoute)
app.use("/projects", projectsRoute)
app.use("/tasks", tasksRoute)

if(process.env.NODE_ENV === "production"){
    app.use(express.static("../frontend/dist"))
}

const PORT = process.env.PORT || 3000
app.listen(PORT,(err)=>{
    if(err) console.log(err);
    else console.log(`listening at ${PORT}`)
})