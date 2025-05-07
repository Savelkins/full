const createError = require("http-errors");
const Sport = require("../models/Sport");
const Athlete = require("../models/Athlete");

module.exports.countAthleteBySport = async (req, res, next) => {
  try {
    const data = await Sport.aggregate([
      {
        $lookup: {
          from: "athletes",
          localField: "_id",
          foreignField: "sportId",
          as: "athletes",
        },
      },
      {
        $project: {
          _id: 0,
          sport: "$name",
          count: { $size: "$athletes" },
        },
      },
      {
        $sort: { count: 1 },
      },
    ]);

    res.status(200).send({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.countAthleteCountry = async (req, res, next) => {
  try {
    const data = await Athlete.aggregate([
      { $group: { _id: "$country", amount: { $sum: 1 } } },
      { $project: { _id: 0, country: "$_id", amount: 1 } },
      { $sort: { amount: -1 } },
    ]);

    res.status(200).send({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.getAvgAthletesBySport = async (req, res, next) => {
  try {
    const currentYear = new Date().getFullYear();
    const data = await Athlete.aggregate([
      {
        $group: {
          _id: "$sportId",
          avgAge: { $avg: { $subtract: [currentYear, "$birthYear"] } },
        },
      },
      {
        $lookup: {
          from: "sports",
          localField: "_id",
          foreignField: "_id",
          as: "sport",
        },
      },
      {
        $unwind: "$sport",
      },
      {
        $project: {
          _id: 0,
          sport: "$sport.name",
          avgAge: { $round: ["$avgAge", 1] },
        },
      },
    ]);
    res.status(200).send({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.countSportsByCountry = async (req, res, next) => {
  try {
    const data = await Sport.aggregate([
      {
        $lookup: {
          from: "athletes",
          localField: "_id",
          foreignField: "sportId",
          as: "athletes",
        },
      },
      {
        $match: {
          "athlets.0": { $exists: true },
        },
      },
      {
        $unwind: "$athletes",
      },
      {
        $group: {
          _id: "$athletes.country",
          sport: "$name",
        },
      },
      {
        $group: {
          _id: "$_id.country",
          amount: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send({ data });
  } catch (error) {
    next(error);
  }
};
