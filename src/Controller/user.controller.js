import { UserModel } from "../Model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { SendMail } from "../utils/EmailHandler.js";


let ChangePasswordOtp = null
let OTP = null

const GenerateToken = async (data) => {
  return jwt.sign({ id: data._id, email: data.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
};

export const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const find = await UserModel.findOne({ email });
  if (!find) return res.status(400).json({ message: "user do not exist" });
  // delete find.password


  const check = await find?.checkPassword(password);

  if (!check) return res.status(400).json({ message: "wrong password" });

  const user = find.toObject()
  delete user.password
  delete user.createdAt
  delete user.updatedAt
  delete user.__v


  const token = await GenerateToken(find);
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  }

  return res.status(200).cookie("token", token, options).json({ message: "login successfully", ...user, token });
});

export const Signup = asyncHandler(async (req, res) => {
  const data = req.body;

  const find = await UserModel.findOne({ email: data.email });

  if (find) return res.status(400).json({ message: "user already exist" });

  const create = await UserModel.create(data);
  delete create.password;

  const token = await GenerateToken(create);

  return res.status(200).json({ message: "signup successfully", data: create, token });
});


export const SendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body

  if (email?.trim() === "") return res.status(400).json({ message: "wrong Email" })

  const user = await UserModel.findOne({ email })

  if (!user) return res.status(400).json({ message: "User do not exist" })

  OTP = Math.floor(1000 + Math.random() * 9000);
  ChangePasswordOtp = {
    email,
    expire: Date.now() + 1000 * 60 * 5,
    Sub: "Reset password",
    text: `your requested otp reset ,please do not share otp \n ${OTP}  \n otp is valid 5 min `,
  };
  SendMail(ChangePasswordOtp)

  return res.status(200).json({ message: "OTP sent" })
})

export const verifyOTP = asyncHandler(async (req, res) => {
  const { userOtp } = req.body

  if (userOtp !== OTP) return res.status(400).json({ message: "Incorrect OTP or OTP Expire" })

  if (ChangePasswordOtp.expire < Date.now()) return res.status(403).json({ message: "OTP Expire" })

  return res.status(200).json({
    message: "verify",
    redirect: true,
  });
})


export const NewPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (password.trim() === "") return res.status(400).json({ message: "password cannot be empty" })
  if (password.trim().length < 6) return res.status(400).json({ message: "password should be at least 6 character" })

  const user = await UserModel.findOne({ email })
  user.password = password
  user.save()

  return res.status(200).json({
    message: "password Created successful",
  });
})