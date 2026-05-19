import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret"

const checkAuth = async (req, res) => {
    try {
        const token = req.cookies?.token
        if (!token) {
            return res.status(401).json({ error: true, message: "No token provided" });
        }
        jwt.verify(token, JWT_SECRET);
        res.status(200).json({ error: false, message: "Token is valid" });
    } catch (error) {
        console.error('CheckAuth error:', error)
        res.status(401).json({ error: true, message: "Error checking authentication" });
    }
};

export { checkAuth };