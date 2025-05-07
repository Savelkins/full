const express = require("express");
const {
  countAthleteCountry,
  countAthleteBySport,
  getAvgAthletesBySport,
} = require("../controllers/analitics.controller");

const analiticsRouter = express.Router();

analiticsRouter.get("/amount-athlete-by-sport", countAthleteBySport);
analiticsRouter.get("/amount-athlete-by-country", countAthleteCountry);
analiticsRouter.get("/average-age-athletes-by-sport", getAvgAthletesBySport);
analiticsRouter.get("amount-sports-by-country", countAthleteBySport);

module.exports = analiticsRouter;
