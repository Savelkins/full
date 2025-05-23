const createError = require("http-errors");
const Sport = require("../models/Sport");
const Athlete = require("../models/Athlete");
const CONSTANTS = require("../constants");
const fs = require("fs/promises");
const path = require("path");
module.exports.createAthlete = async (req, res, next) => {
  try {
    const { name, country, birthYear, sportId } = req.body;
    const sport = await Sport.findById(sportId);
    if (!sport) {
      return next(createError(404, "Sport not found"));
    }
    const avatar = req.file
      ? `/${CONSTANTS.UPLOAD_FOLDER}${req.file.filename}`
      : null;
    const newAthlete = await Athlete.create({
      name,
      country,
      birthYear,
      sportId,
      avatar,
    });
    res.status(201).send({ data: newAthlete });
  } catch (error) {
    next(createError(400, error.message));
  }
};

module.exports.findAllAthletes = async (req, res, next) => {
  try {
    const { limit, skip } = req.pagination;
    const athletes = await Athlete.find(req.filter)
      .populate({
        path: "sportId",
        select: "name isOlimpic",
      })
      .limit(limit)
      .skip(skip);
    res.status(200).send({ data: athletes });
  } catch (error) {
    next(createError(400, error.message));
  }
};

module.exports.findAthleteById = async (req, res, next) => {
  try {
    const { athleteId } = req.params;

    const athlete = await Athlete.findById(athleteId).populate({
      path: "sportId",
      select: "name isOlimpic",
    });
    if (!athlete) {
      return next(createError(404, "Athlete not found"));
    }
    res.status(200).send({ data: athlete });
  } catch (error) {
    next(createError(400, error.message));
  }
};

module.exports.updateAthleteById = async (req, res, next) => {
  try {
    const { athleteId } = req.params;
    const { name, country, birthYear, sportId } = req.body;
    const athlete = await Athlete.findById(athleteId);
    if (!athlete) {
      return next(createError(404, "Athlete not found"));
    }
    if (sportId) {
      const sport = await Sport.findById(sportId);
      if (!sport) {
        return next(createError(404, "Sport not found"));
      }
    }
    if (req.file) {
      if (athlete.avatar) {
        const imagePath = path.join(__dirname, "..", athlete.avatar);
        await fs.unlink(imagePath);
      }
      athlete.avatar = `/${CONSTANTS.UPLOAD_FOLDER}${req.file.filename}`;
    }
    athlete.name = name || athlete.name;
    athlete.country = country || athlete.country;
    athlete.birthYear = birthYear || athlete.birthYear;
    athlete.sportId = sportId || athlete.sportId;
    await athlete.save();
    const updatedAthlete = await Athlete.findById(athlete._id).populate({
      path: "sportId",
      select: "name",
    });
    res.status(200).send({ data: updatedAthlete });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteAthleteById = async (req, res, next) => {
  try {
    const { athleteId } = req.params;
    const athlete = await Athlete.findByIdAndDelete(athleteId);
    if (!athlete) {
      return next(createError(404, "Athlete not found"));
    }
    if (athlete.avatar) {
      const imagePath = path.join(__dirname, "..", athlete.avatar);
      await fs.unlink(imagePath);
    }

    res.status(200).send({ data: athlete });
  } catch (error) {
    next(createError(400, error.message));
  }
};
