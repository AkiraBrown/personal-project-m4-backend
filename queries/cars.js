const db = require("../db/dbConfig");

const getAllCars = async () => {
  try {
    const allCars = await db.any("SELECT * FROM cars");
    return allCars;
  } catch (error) {
    return error;
  }
};

const getCarById = async (id) => {
  try {
    const car = await db.any("SELECT * FROM cars WHERE id=$1", [id]);
    return car;
  } catch (error) {
    return error;
  }
};

const createCar = async ({
  car_Make,
  car_Model,
  year,
  body_Type,
  color_Options,
  fuel_Type,
  engine_Size,
  horsepower,
  torque,
  transmission_Type,
  acceleration,
  top_Speed,
  mileage,
  safety_Features,
  entertainment_Features,
  interior_Features,
  exterior_Features,
  price,
  customer_Ratings,
  sales_Figures,
}) => {
  try {
    const newCar = await db.any(
      "INSERT INTO cars (car_Make,car_Model,year,body_Type,color_Options,fuel_Type,engine_Size,horsepower,torque,transmission_Type,acceleration,top_Speed,mileage,safety_Features,entertainment_Features,interior_Features,exterior_Features,price,customer_Ratings,sales_Figures) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)RETURNING *",
      [
        car_Make,
        car_Model,
        year,
        body_Type,
        color_Options,
        fuel_Type,
        engine_Size,
        horsepower,
        torque,
        transmission_Type,
        acceleration,
        top_Speed,
        mileage,
        safety_Features,
        entertainment_Features,
        interior_Features,
        exterior_Features,
        price,
        customer_Ratings,
        sales_Figures,
      ]
    );
    return newCar;
  } catch (error) {
    return error;
  }
};

const deleteCar = async (id) => {
  try {
    const deletedCar = await db.any(
      "DELETE FROM cars WHERE id=$1 RETURNING *",
      [id]
    );
    return deletedCar;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  deleteCar,
};
