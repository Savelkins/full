const express = require("express");
const {
  createAthlete,
  findAllAthletes,
  findAthleteById,
  deleteAthleteById,
} = require("../controllers/athlete.controller");
const upload = require("../middlewares/uploadImg");
const {
  buildAthleteFilter,
  validateAthlete,
} = require("../middlewares/athlete.mw");
const { paginate } = require("../middlewares/pagination.mw");
const {
  athleteSchemaPost,
  athleteSchemaUpdate,
} = require("../validations/athlete.validation");

const athleteRouter = express.Router();

athleteRouter.post(
  "/",
  upload.single("avatar"),
  buildAthleteFilter,
  validateAthlete(athleteSchemaPost),
  createAthlete
);
athleteRouter.get("/", paginate, buildAthleteFilter, findAllAthletes);
athleteRouter.get("/:athleteId", findAthleteById);
athleteRouter.patch(
  "/:athleteId",
  upload.single("avatar"),
  buildAthleteFilter,
  validateAthlete(athleteSchemaUpdate),
  findAthleteById
);
athleteRouter.delete("/:athleteId", deleteAthleteById);

module.exports = athleteRouter;
