import jwt from "jsonwebtoken";
import config from "../config";

export async function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(401)
      .send({ auth: false, message: "No Token aws Provided" });
  }

  const decoded = await jwt.verify(token, config.secret);

  req.userId = decoded.id;

  next();
}
