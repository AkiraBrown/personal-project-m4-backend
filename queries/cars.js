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
  car_make,
  car_model,
  year,
  body_type,
  color_options,
  fuel_type,
  engine_size,
  horsepower,
  torque,
  transmission_type,
  acceleration,
  top_speed,
  mileage,
  safety_features,
  entertainment_features,
  interior_features,
  exterior_features,
  price,
  customer_ratings,
  sales_figures,
  image_url,
}) => {
  try {
    const newCar = await db.any(
      "INSERT INTO cars (car_make,car_model,year,body_type,color_options,fuel_type,engine_size,horsepower,torque,transmission_type,acceleration,top_speed,mileage,safety_features,entertainment_features,interior_features,exterior_features,price,customer_ratings,sales_figures,image_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)RETURNING *",
      [
        car_make,
        car_model,
        year,
        body_type,
        color_options,
        fuel_type,
        engine_size,
        horsepower,
        torque,
        transmission_type,
        acceleration,
        top_speed,
        mileage,
        safety_features,
        entertainment_features,
        interior_features,
        exterior_features,
        price,
        customer_ratings,
        sales_figures,
        image_url,
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

const carMake = async (term) => {
  const formTerm = `%${term}%`;
  try {
    const collection = await db.any(
      "SELECT * FROM cars WHERE car_Make ILIKE $1",
      [formTerm]
    );
    return collection;
  } catch (error) {
    return error;
  }
};

const updateCar = async (id, car) => {
  try {
    const updatedCar = await db.any(
      "UPDATE cars SET car_make=$1,car_model=$2,year=$3,body_type=$4,color_options=$5,fuel_type=$6,engine_size=$7, horsepower=$8,torque=$9,transmission_type=$10,acceleration=$11,top_speed=$12,mileage=$13,safety_features=$14,entertainment_features=$15,interior_features=$16,exterior_features=$17,price=$18,customer_ratings=$19,sales_figures=$20,image_url=$21 WHERE id=$22 RETURNING *",
      [
        car.car_make,
        car.car_model,
        car.year,
        car.body_type,
        car.color_options,
        car.fuel_type,
        car.engine_size,
        car.horsepower,
        car.torque,
        car.transmission_type,
        car.acceleration,
        car.top_speed,
        car.mileage,
        car.safety_features,
        car.entertainment_features,
        car.interior_features,
        car.exterior_features,
        car.price,
        car.customer_ratings,
        car.sales_figures,
        car.image_url,
        id,
      ]
    );
    return updatedCar;
  } catch (error) {
    return error;
  }
};

const bodyType = async (term) => {
  const formatTerm = `%${term}%`;
  try {
    const carBody = await db.any(
      "SELECT * FROM cars WHERE body_Type ILIKE $1",
      [formatTerm]
    );
    return carBody;
  } catch (error) {
    return error;
  }
};

/*For this we need to create a query that takes in multiple columns conditions and 
isolates a small amount of items.
The query we have is

SELECT * FROM cars WHERE car_Make ILIKE '%carmakeHERE%' AND color_Options ILIKE '%colorOptionsHERE%' AND body_Type ILIKE '%bodyTypeHERE%'
*/

const advancedFilter = async (make, color, body) => {
  const formMake = `%${make}%`;
  const formColor = `%${color}%`;
  const formBody = `%${body}%`;
  try {
    const superSearch = await db.any(
      "SELECT * FROM cars WHERE car_make ILIKE $1 AND color_options ILIKE $2 AND body_type ILIKE $3",
      [formMake, formColor, formBody]
    );
    return superSearch;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  deleteCar,
  carMake,
  updateCar,
  bodyType,
  advancedFilter,
};
