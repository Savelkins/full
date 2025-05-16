import * as Yup from "yup";
import CONSTANTS from "../constants";

const schemaName = Yup.string()
  .trim()
  .matches(/^[A-Z][a-z]{2,63}$/, "Upper first letter and 2-63 letters");

const schemaImage = Yup.mixed()
  .test("fileSize", "Filesize must be less 5Mb", (value) => {
    return !value || CONSTANTS.MAX_FILE_SIZE;
  })
  .test("fileType", "Filetype not available", (value) => {
    return !value || CONSTANTS.FILE_TYPES.includes(value.type);
  });

export const createValidateSchema = Yup.object({
  name: schemaName.required(),
  isOlimpic: Yup.boolean(),
  image: schemaImage,
});

export const updateValidateSchema = Yup.object({
  name: schemaName,
  isOlimpic: Yup.boolean(),
  image: schemaImage,
});
