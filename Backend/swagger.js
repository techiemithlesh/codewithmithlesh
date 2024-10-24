const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TWILLA",
      version: "1.0.0",
      description: "TWILL API FOR GOOGLE ON DEMAND SERVICE",
    },
    servers: [
      {
        url: "http://localhost:5000/",
        description: "Local server",
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};
const swaggerSpec = swaggerJsDoc(options);
function swaggerDocs(app, port) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

module.exports = swaggerDocs;
