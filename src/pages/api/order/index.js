export default function handler(req, res) {
  /* Be sure to replace the parameters in the following connection string. */
  /* Requires mysql2 package('npm install --save mysql2'). Please check https://www.npmjs.com/package/mysql2 for install guide. */
  if (req.method === 'POST') {
  var mysql = require("mysql2");
const body = req.body;
const person = body.person;
const order = body.order;
  var connection = mysql.createConnection({
    host: "gateway01.us-west-2.prod.aws.tidbcloud.com",
    port: 4000,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: "food_menu",
    ssl: {
      minVersion: "TLSv1.2",
      rejectUnauthorized: true,
    },
  });
  connection.connect(function (err) {
    if (err) {
      connection.query(
        "ROLLBACK;",function (err, rows) {
           if (err) {
             throw err;
           }
         }
       );
      res.status(500).json({message:'database error',error:err});
    connection.end();

      throw err;
    }
    connection.query(
      " START TRANSACTION; ;",function (err, rows) {
         if (err) {
           throw err;
         }
       }
     );
    connection.query(
    `INSERT INTO food_menu.clients(name, email, _address,tel)
     VALUES (?,?,?,?);
     `,[person.name,person.email, person.address,person.tel],
      function (err, rows) {
        if (err) {
          throw err;
        }
      }
    );
    connection.query(
      ` INSERT INTO food_menu.orders(client_id)
       SELECT MAX(id) from food_menu.clients;
       `,
        function (err, rows) {
          if (err) {
            throw err;
          }
        }
      );
    order.map((product)=>{
      connection.query(
       `insert into food_menu.orders_products(order_id,product_id,amount,price)
        SELECT MAX(id), ?, ?, ? FROM food_menu.orders;`
       ,[product.item.id,product.amount,product.item.price],
        function (err, rows) {
          if (err) {
            throw err;
          }
        }
      );
    });
  
      connection.query(
       "COMMIT;",function (err, rows) {
          if (err) {
            throw err;
          }
        }
      );
  
    res.status(200).json({message:'Success'})
    connection.end();

  });
}else {
  res.status(400).json({message:'Only post request'})
}
}
