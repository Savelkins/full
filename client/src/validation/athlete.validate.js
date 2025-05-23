import * as Yup from "yup";
import CONSTANTS from "../constants";
import { schemaImage } from "./validate";

const nameSchema = Yup.string().trim().min(6).max(255);
const countrySchema = Yup.string().oneOf(CONSTANTS.COUNTRIES);
const birthYearSchema = Yup.number()
  .min(1900)
  .max(new Date().getFullYear() - 15)
  .required();

export const createValidateSchema = Yup.object({
  name: nameSchema.required(),
  country: countrySchema.required(),
  birthYear: birthYearSchema.required(),
  sportId: Yup.string().required(),
  avatar: schemaImage,
});

export const updateValidateSchema = Yup.object({
  name: nameSchema,
  country: countrySchema,
  birthYear: birthYearSchema,
  sportId: Yup.string(),
  avatar: schemaImage,
});
