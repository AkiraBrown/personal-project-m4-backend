DROP DATABASE IF EXISTS cars_dev;
CREATE DATABASE cars_dev;
\c cars_dev

CREATE TABLE cars(
    id SERIAL PRIMARY KEY,
    car_Make TEXT,
    car_Model TEXT,
    year INT,
    body_Type TEXT,
    color_Options TEXT,
    fuel_Type TEXT,
    engine_Size DECIMAL,
    horsepower INT,
    torque INT,
    transmission_Type TEXT,
    acceleration TEXT,
    top_Speed INT,
    mileage  INT,
    safety_Features TEXT,
    entertainment_Features TEXT,
    interior_Features TEXT,
    exterior_Features TEXT,
    price INT,
    customer_Ratings TEXT,
    sales_Figures INT,
    image_url TEXT
);

/*
car_Make TEXT
car_Model TEXT
year INT
body_Type TEXT
color_Options TEXT
fuel_Type TEXT
engine_Size DECIMAL  (L Litres)
horsepower INT
torque TEXT     (Nm Newton Metres)
transmission_Type TEXT
acceleration TEXT (0-60 mph)
top_Speed TEXT (mph)
mileage  TEXT (mpg)
safety_Features TEXT
entertainment_Features TEXT
interior_Features TEXT
exterior_Features TEXT
price TEXT
customer_Ratings TEXT
sales_Figures TEXT  (units sold)
*/


