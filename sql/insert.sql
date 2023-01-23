INSERT INTO products (name, description, price) 
VALUES ("Belgian Waffles", "Two of our famous Belgian Waffles with plenty of real maple syrup", 5.95),
 ("Strawberry Belgian Waffles", "Light Belgian waffles covered with strawberries and whipped cream", 6.95),
 ("Berry-Berry Belgian Waffles", "Light Belgian waffles covered with an assortment of fresh berries and whipped cream", 12.35),
 ("French Toast", "Thick slices made from our homemade sourdough bread", 12.99),
 ("Homestyle Breakfast", "Two eggs, bacon or sausage, toast, and our ever-popular hash browns", 8.99);

--  transaction

START TRANSACTION;
INSERT INTO food_menu.clients(name, email, _address,tel)
  VALUES ('george','ge@.h','str.Alesdulu,nr 1, Oradea',07676473864);

INSERT INTO food_menu.orders(client_id)
SELECT MAX(id) from food_menu.clients;

insert into food_menu.orders_products(order_id,product_id,amount,price)
SELECT MAX(id), 2, 3, 12.99 FROM food_menu.orders;

COMMIT;