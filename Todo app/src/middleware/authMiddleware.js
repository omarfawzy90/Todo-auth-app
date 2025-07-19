import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  console.log(token);

  if (!token) {
    return res.statues(401).json({ message: "No Token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.statues(401).json({ message: "invalid token" });
    }
    req.userId = decoded.id;
    next();
  });
}

export default authMiddleware;
