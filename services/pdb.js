const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "JS_QAP3",
  password: "cupcake",
  port: 5432,
});

module.exports = pool;
