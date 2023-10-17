const Sequelize = require('sequelize');
const connection = new Sequelize("guiapress", "root", "91DC056430", {
       hist: "localhost",
       dialect: "mysql",
       timezone: "-03:00",
       logging: false
});

module.exports = connection;