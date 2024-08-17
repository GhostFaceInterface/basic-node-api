const { extractSchemas } = require('extract-pg-schema');

async function run() {
  const connection = {
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
  };

  const result = await extractSchemas(connection);

  console.log(result);
}

run();