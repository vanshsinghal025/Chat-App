import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import responseHandler from "../utils/responseHandler.js";

export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return responseHandler(res, 400, "All fields are required");
    }

    if (password !== confirmPassword) {
      return responseHandler(
        res,
        400,
        "Password and Confirm Password mismatch"
      );
    }

    let user = await userModel.findOne({ username });

    if (user) {
      return responseHandler(res, 400, "username already exits try different");
    }

    const hashed = await bcryptjs.hash(password, 10);
    const profilePicture = `https://avatar.iran.liara.run/public/${
      gender === "male" ? "boy" : "girl"
    }?username=${username}`;

    user = await userModel.create({
      fullName,
      username,
      password: hashed,
      gender,
      profilePicture,
    });

    return responseHandler(res, 200, "User registered successfully");
  } catch (error) {
    console.error("Error in user registration", error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return responseHandler(res, 400, "All fields are required");
    }

    let user = await userModel.findOne({ username });

    if (!user) {
      return responseHandler(res, 404, "Incorrect username or password");
    }

    const isTruePassword = await bcryptjs.compare(password, user?.password);

    if (!isTruePassword) {
      return responseHandler(res, 400, "Incorrect username or password");
    }

    const payload = { userId: user?._id, fullName: user?.fullName, username: user?.username };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    user = {
      _id: user?._id,
      fullName: user?.fullName,
      username: user?.username,
      gender: user?.gender,
      profilePicture: user?.profilePicture,
    };

    return responseHandler(res, 200, `Welcome ${user?.fullName}`, user);
  } catch (error) {
    console.error("Erron in user login", error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      maxAge: 0,
      sameSite: "strict",
    });

    return responseHandler(res, 200, 'User logged out successfully')
  } catch (error) {
    console.error("Error in user logout", error);
  }
};


export const getOtherUsers = async (req, res) => {
  try {
    const userId = req.id

    const otherUsers = await userModel.find({_id: {$ne: userId}}).select('-password')

    if (otherUsers.length === 0){
        return responseHandler(res, 404, 'No user found')
    }

    return responseHandler(res, 200, 'other users found successfully', otherUsers)
  } catch (error) {
    console.error('Error in getting other users', error)
  }
}
