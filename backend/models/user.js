import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: String,
    password: String
})

const User = model("User",userSchema)

export {
    User
}