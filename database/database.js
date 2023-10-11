const Sequelize = require('sequelize');
const connection = new Sequelize("guiapress", "root", "91DC056430", {
       hist: "localhost",
       dialect: "mysql",
       logging: false
});

module.exports = connection;