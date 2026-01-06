import jwt from "jsonwebtoken";
import responseHandler from '../utils/responseHandler.js'

export const isAuthenticated = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
        return responseHandler(res, 401, 'User not authenticated')
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.id = decoded.userId;
    next();

  } catch (error) {
    console.error("Invalid or Expired Token");
  }
};