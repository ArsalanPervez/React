import jwt from "jsonwebtoken"

const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    // const token = req.headers["authorization"];
    if (!token) return res.status(404).json({ message: "no token found" });

    jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "invalid token" });
        req.userId = user.id;
        next();
    });
};


export default authenticateUser