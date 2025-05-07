const yup = require("yup");
const createError = require("http-errors");
const { COUNTRIES } = require("../constants");

const athleteSchemaPost = yup.object().shape({
  name: yup.string().trim().min(6).max(255).required(),
  country: yup.string().trim().oneOf(COUNTRIES).required(),
  birthYear: yup.number().min(1900).max(new Date().getFullYear()).required(),
  sportId: yup.string().required(),
});

const athleteSchemaUpdate = yup.object().shape({
  name: yup.string().trim().min(6).max(255),
  country: yup.string().trim().oneOf(COUNTRIES),
  birthYear: yup.number().min(1900).max(new Date().getFullYear()),
  sportId: yup.string(),
});

module.exports = {athleteSchemaPost, athleteSchemaUpdate};
