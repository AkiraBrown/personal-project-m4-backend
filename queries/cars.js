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
  image_url,
}) => {
  try {
    const newCar = await db.any(
      "INSERT INTO cars (car_Make,car_Model,year,body_Type,color_Options,fuel_Type,engine_Size,horsepower,torque,transmission_Type,acceleration,top_Speed,mileage,safety_Features,entertainment_Features,interior_Features,exterior_Features,price,customer_Ratings,sales_Figures,image_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)RETURNING *",
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
      "UPDATE cars SET car_Make=$1,car_Model=$2,year=$3,body_Type=$4,color_Options=$5,fuel_Type=$6,engine_Size=$7, horsepower=$8,torque=$9,transmission_Type=$10,acceleration=$11,top_Speed=$12,mileage=$13,safety_Features=$14,entertainment_Features=$15,interior_Features=$16,exterior_Features=$17,price=$18,customer_Ratings=$19,sales_Figures=$20,image_url=$21 WHERE id=$22 RETURNING *",
      [
        car.car_Make,
        car.car_Model,
        car.year,
        car.body_Type,
        car.color_Options,
        car.fuel_Type,
        car.engine_Size,
        car.horsepower,
        car.torque,
        car.transmission_Type,
        car.acceleration,
        car.top_Speed,
        car.mileage,
        car.safety_Features,
        car.entertainment_Features,
        car.interior_Features,
        car.exterior_Features,
        car.price,
        car.customer_Ratings,
        car.sales_Figures,
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
      "SELECT * FROM cars WHERE car_Make ILIKE $1 AND color_Options ILIKE $2 AND body_Type ILIKE $3",
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
