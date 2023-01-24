select orders.id, clients.name, clients._address, clients.tel, orders.set_time, orders.completed_time, orders_products.product_id, products2.name, category.name as category,orders_products.price  from clients inner join orders on orders.client_id = clients.id  right join orders_products on orders.id=orders_products.order_id left join products2 on orders_products.product_id = products2.id inner join category
on products2.category_id=category.id;
select  sum(orders_products.price)  from clients inner join orders on orders.client_id = clients.id  right join orders_products on orders.id=orders_products.order_id left join products2 on orders_products.product_id = products2.id inner join category
on products2.category_id=category.id where orders.id=30004;


mysqldump --connect-timeout 15 -u '' -h gateway01.us-west-2.prod.aws.tidbcloud.com -P 4000 -D food_menu --ssl-mode=VERIFY_IDENTITY --ssl-ca=<path_to_ca_cert> -p  > food_menu_backup.sql