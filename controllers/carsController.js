const express = require("express");

const router = express.Router();

const {
  getAllCars,
  getCarById,
  createCar,
  deleteCar,
  carMake,
  updateCar,
  bodyType,
  advancedFilter,
} = require("../queries/cars");

const {
  checkCarMake,
  checkModel,
  checkYear,
} = require("../validations/checkCar");

router.get("/", async (req, res) => {
  const allCars = await getAllCars();
  if (allCars[0]) {
    res.status(200).json(allCars);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const car = await getCarById(req.params.id);
    if (!car || car.length === 0) {
      res.status(404).json({ error: "not found" });
    } else {
      res.status(200).json(car[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/", checkCarMake, checkModel, checkYear, async (req, res) => {
  console.log(req.body);
  try {
    const createdCar = await createCar(req.body);
    res.status(200).json(createdCar[0]);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

router.put("/:id", checkCarMake, checkModel, checkYear, async (req, res) => {
  try {
    const updatedCar = await updateCar(req.params.id, req.body);
    if (updatedCar.length === 0) {
      res.status(404).json("Car Not Found");
    } else {
      res.status(200).json(updatedCar[0]);
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.get("/get-car-make/:search", async (req, res) => {
  try {
    const results = await carMake(req.params.search);
    if (!results[0]) {
      res.status(404).json({ error: "Results not found" });
    } else {
      res.status(200).json(results);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedCar = await deleteCar(req.params.id);
    if (deletedCar.length === 0) {
      res.status(404).json(deletedCar[0]);
    } else {
      res.status(200).json(deletedCar[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/get-body-type/:search", async (req, res) => {
  try {
    const results = await bodyType(req.params.search);
    if (!results[0]) {
      res.status(404).json({ error: "Results not found" });
    } else {
      res.status(200).json(results);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/super-search", async (req, res) => {
  const localMake = req.query.carMake;
  const localColor = req.query.color;
  const localBody = req.query.body;
  try {
    const search = await advancedFilter(localMake, localColor, localBody);
    if (!search[0]) {
      res.status(404).json({ error: "Results not found" });
    } else {
      res.status(200).json(search);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
