import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../../models/User.js"

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret"

const handleLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: true, message: "Invalid username or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: true, message: "Invalid username or password" });
        }
        res.cookie("token",
            jwt.sign({ userId: user._id }, JWT_SECRET),
            { httpOnly: true, sameSite: 'lax' }
        ).status(200).json({ error: false, message: "Login successful" });
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ error: true, message: "Error logging in" });
    }
}

export { handleLogin }