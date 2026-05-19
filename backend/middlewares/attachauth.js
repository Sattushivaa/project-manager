import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret"

const attachAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: true, message: "Invalid token" });
    }
}

export {
    attachAuth
}