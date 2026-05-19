import jwt from "jsonwebtoken"

const attachAuth = async (req, res, next) => {
    const token  = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next()
}

export {
    attachAuth
}