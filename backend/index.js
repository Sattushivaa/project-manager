import express from "express";
import cors from "cors"
const app = express()
app.use(cors())


const PORT = process.env.PORT || 3000
app.listen(PORT,(err)=>{
    if(err) console.log(err);
    else console.log(`listening at ${PORT}`)
})