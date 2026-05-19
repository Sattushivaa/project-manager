import { json } from "express";
import mongoose from "mongoose";


const handleLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        res.cookie("token",
            jwt.sign({ userId: user._id }, 
                process.env.JWT_SECRET), 
                { httpOnly: true })
        .status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
}

export { handleLogin }