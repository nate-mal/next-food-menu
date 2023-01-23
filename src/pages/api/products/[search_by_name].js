export default function handler(req, res) {
  const itemToSearch = req.query.search_by_name.toLowerCase();
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
      `SELECT products2.name, products2.id,  products2.price, products2.serving_size as serving, category.name as category  FROM products2 INNER JOIN category ON products2.category_id=category.id WHERE LOWER(products2.name) LIKE ?  OR   LOWER(category.name) LIKE ? LIMIT  300;`,
      [`%${itemToSearch}%`,`%${itemToSearch}%`],
      function (err, rows) {
        if (err) {
        res.status(500).json('Something whent wrong when conection to database');

          throw err;
        }
        res.status(200).json(rows);

        connection.end();
      }
    );
  });
}
