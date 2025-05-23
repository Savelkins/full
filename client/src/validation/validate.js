import CONSTANTS from "../constants";
import * as Yup from "yup";

export const schemaImage = Yup.mixed()
  .test("fileSize", "Filesize must be less 5Mb", (value) => {
    return !value || CONSTANTS.MAX_FILE_SIZE;
  })
  .test("fileType", "Filetype not available", (value) => {
    return !value || CONSTANTS.FILE_TYPES.includes(value.type);
  });