const express = require("express");

const router = express.Router();

const {
  getAllCars,
  getCarById,
  createCar,
  deleteCar,
} = require("../queries/cars");

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

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const createdCar = await createCar(req.body);
    res.status(200).json(createdCar[0]);
  } catch (error) {
    res.status(404).json({ error: error });
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

module.exports = router;
