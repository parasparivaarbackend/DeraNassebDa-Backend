import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js";
import { UserModel } from "../Model/user.model.js";
import dotenv from "dotenv";
dotenv.config();



export const auth = asyncHandler(async (req, res, next) => {

    const token = req?.cookies?.token || req.headers?.authorization?.replace("Bearer ", "");

    if (!token) {
        res.status(404).json({ message: "unauthorised user" })
    }
    try {

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedToken) {
            res.status(404).json({ message: "Invalid Cookies" })
        }

        const user = await UserModel.findById(decodedToken.id).select("-password -createdAt -updatedAt -__v")

        if (!user) {
            res.status(404).json({ message: "Invalid Token" })
        }

        req.user = user
        next()
    } catch (error) {
        res.status(404).json({ message: "Invalid Token" })
    }
})
