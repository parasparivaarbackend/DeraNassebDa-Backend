import {
  BlogValidationSchema,
  contactValidationSchema,
  donationValidationSchema,
  InnerBlogValidationSchema,
  loginValidationSchema,
  RegisterValidationSchema,
  volunteersValidationSchema,
} from "./validationSchema.js";
import { validate } from "./validate.js";

export const loginValidation = validate(loginValidationSchema);
export const RegisterValidation = validate(RegisterValidationSchema);
export const BlogValidation = validate(BlogValidationSchema);
export const InnerBlogValidation = validate(InnerBlogValidationSchema);
export const contactUsValidation = validate(contactValidationSchema);
export const donationValidation = validate(donationValidationSchema);
export const volunteersValidation = validate(volunteersValidationSchema);
