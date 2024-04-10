const database = process.env.database || "vivero";
const username = process.env.username || "user";
const password = process.env.password || "user";
const host = process.env.host || "127.0.0.1";
const port= process.env.port;
const dialect = process.env.dialect || "mysql";
const FRONT_END_URL = process.env.FRONT_END_URL || "http://localhost:3001";
const operatorAliases = process.env.operatorAliases || false;

module.exports = {
  database,
  username,
  password,
  host,
  dialect,
  port,
  operatorAliases,
  FRONT_END_URL
};
