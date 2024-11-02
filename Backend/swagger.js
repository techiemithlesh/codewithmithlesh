const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Basic Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "CODEWITHMITHLESH API Documentation",
    version: "1.0.0",
    description: "API documentation for the codewithmithlesh",
  },
  servers: [
    {
      url: "http://localhost:5000",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
