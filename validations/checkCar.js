const checkCarMake = (req, res, next) => {
  if (!req.body.car_make) {
    res.status(400).json({ error: "Car Make is required" });
  } else {
    next();
  }
};

const checkModel = (req, res, next) => {
  if (!req.body.car_model) {
    res.status(400).json({ error: "Car Model is required" });
  } else {
    next();
  }
};

const checkYear = (req, res, next) => {
  if (!req.body.year) {
    res.status(400).json({ error: "Year is required" });
  } else if (req.body.year < 1886) {
    res.status(400).json({ error: "Valid Year is required" });
  } else {
    next();
  }
};
const validateURL = (req, res, next) => {
  if (
    !req.body.image_url.substring(0, 7) === "http://" ||
    !req.body.image_url.substring(0, 8) === "https://"
  ) {
    res
      .status(400)
      .json({ error: "You forgot to start your url with http:// or https://" });
  } else {
    next();
  }
};

module.exports = { checkCarMake, checkModel, checkYear, validateURL };
