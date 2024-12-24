import vine from "@vinejs/vine";

import { errors } from "@vinejs/vine";

class customError {
  hasErrors = false;

  errors = {};

  report(message, rule, field, meta) {
    this.hasErrors = true;

    this.errors[field.wildCardPath] = message;
  }

  createError() {
    return new errors.E_VALIDATION_ERROR(this.errors);
  }
}
vine.errorReporter = () => new customError();

export const loginValidationSchema = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(16),
});
export const RegisterValidationSchema = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(16),
});

export const BlogValidationSchema = vine.object({
  title: vine.string().minLength(3).maxLength(100),
  slug: vine.string().minLength(2).maxLength(50),
  alt: vine.string().minLength(2).maxLength(50),
  description: vine.string().minLength(2),
  metaDescription: vine.string().minLength(2),
});

export const InnerBlogValidationSchema = vine.object({
  subTitle: vine.string(),
  description: vine.string(),
  alt: vine.string(),
  link: vine.string(),
  iframe: vine.string(),
  // image: vine.array() || vine.string()
});

export const contactValidationSchema = vine.object({
  firstName: vine.string().minLength(3),
  lastName: vine.string().minLength(3),
  email: vine.string().email(),
  message: vine.string().minLength(5),
});

export const donationValidationSchema = vine.object({
  fullName: vine.string(),
  DonationFor: vine.string(),
  email: vine.string().email(),
  country: vine.string(),
  state: vine.string(),
  AadharNumber: vine.string(),
  amount: vine.number(),
});

export const volunteersValidationSchema = vine.object({
  fullName: vine.string(),
  languages: vine.string(),
  email: vine.string().email(),
  phone: vine.string(),
  country: vine.string(),
  state: vine.string(),
  time: vine.string(),
  address: vine.string(),
  howYouKnowUs: vine.string(),
  whyJoinUs: vine.string(),
});
