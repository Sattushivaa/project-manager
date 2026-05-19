import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.js";
import tasksRoute from "./routes/tasks.js";
import { attachAuth } from "./middlewares/attachAuth.js";
import projectsRoute from "./routes/projects.js";
import { checkAuth } from "./controllers/auth/checkauth.js";

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(cookieParser())
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Failed to connect to MongoDB", err);
})

app.use("/api/auth", authRoute)
app.use("/api/projects", attachAuth, projectsRoute)
app.use("/api/tasks", attachAuth, tasksRoute)
app.post("/api/checkAuth", checkAuth)
app.get("/api/checkAuth", checkAuth)

if(process.env.NODE_ENV === "production"){
    app.use(express.static("../frontend/dist"))
}

const PORT = process.env.PORT || 5000
app.listen(PORT,(err)=>{
    if(err) console.log(err);
    else console.log(`listening at ${PORT}`)
})