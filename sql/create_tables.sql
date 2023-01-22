CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    price FLOAT NOT NULL,
    PRIMARY KEY (id)
);

-- Category	Item	Serving Size	Price	Calories	Calories from Fat	Total Fat	Total Fat (% Daily Value)	Saturated Fat	Saturated Fat (% Daily Value)	Trans Fat	Cholesterol	Cholesterol (% Daily Value)	Sodium	Sodium (% Daily Value)	Carbohydrates	Carbohydrates (% Daily Value)	Dietary Fiber	Dietary Fiber (% Daily Value)	Sugars	Protein	Vitamin A (% Daily Value)	Vitamin C (% Daily Value)	Calcium (% Daily Value)	Iron (% Daily Value)

-- category

-- CREATE TABLE category (
--     id INT NOT NULL AUTO_INCREMENT,
--     name VARCHAR(200) NOT NULL,
    
-- );
-- CREATE TABLE products2 (
--     category_id INT NOT NULL,
--     id INT NOT NULL AUTO_INCREMENT,
--     name VARCHAR(200) NOT NULL,
--     description TEXT ,
--     serving_size VARCHAR(200) NOT NULL,
--     price FLOAT NOT NULL,
--     calories INT,
--     PRIMARY KEY (id),
--     FOREIGN KEY (category_id)
--         REFERENCES category(id),

-- );