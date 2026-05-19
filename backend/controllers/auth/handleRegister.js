import bcrypt from "bcrypt"
import { User } from "../../models/User.js"

const handleRegister = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ error: false, message: "User created successfully" });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: true, message: error.message || "Error creating user" });
  }
}

export { handleRegister }