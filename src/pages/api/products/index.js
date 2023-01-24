 export function getAllProducts(){
  return new Promise(function (resolve, reject) {
    var mysql = require("mysql2");

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
      reject({message:'error when connecting to database',err:err});
    
    }
    connection.query(
      "SELECT products2.name, products2.id,  products2.price, products2.serving_size as serving, category.name as category  FROM products2 INNER JOIN category ON products2.category_id=category.id limit 300;",
      function (err, rows) {
        if (err) {
          reject({message:'error when connecting to database',err:err});
        }
        resolve(rows);

        connection.end();
      }
    );
  });
});
 }


 
 
//  if (count) {
//   resolve("There is a count value.");
// } else {
//   reject("There is no count value");
// }


  


export default function handler(req, res) {
  /* Be sure to replace the parameters in the following connection string. */
  /* Requires mysql2 package('npm install --save mysql2'). Please check https://www.npmjs.com/package/mysql2 for install guide. */

  var mysql = require("mysql2");

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
      throw err;
    }
    connection.query(
      "SELECT products2.name, products2.id,  products2.price, products2.serving_size as serving, category.name as category  FROM products2 INNER JOIN category ON products2.category_id=category.id limit 300;",
      function (err, rows) {
        if (err) {
          throw err;
        }
        res.status(200).json(rows);

        connection.end();
      }
    );
  });
}
