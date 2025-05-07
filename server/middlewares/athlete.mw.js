const createError = require("http-errors");

module.exports.validateAthlete = (athleteSchema) => async (req, res, next) => {
  try {
    req.body = await athleteSchema.validate(req.body);
    next();
  } catch (error) {
    next(createError(400, error.message));
  }
};

module.exports.buildAthleteFilter = (req, res, next) => {
  try {
    const { name, country, minYear, maxYear } = req.query;
    req.filter = {};

    if (name) {
      req.filter.name = { $regex: name, $options: "i" };
    }

    if (country) {
      req.filter.country = { $regex: country, $options: "i" };
    }

    if (minYear || maxYear) {
      req.filter.birthYear = {};
      if (minYear) {
        req.filter.birthYear.$gte = Number(minYear);
      }
      if (maxYear) {
        req.filter.birthYear.$lt = Number(maxYear);
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
