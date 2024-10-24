const express = require("express");
require("dotenv").config();
const db = require("./src/db/dbconfig");
const sequelize = require("./src/db/dbconfig");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger");
const userRoutes = require("./src/routes/UserRoute");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Middleware to parse JSON request bodies
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("Database synced successfully!");
    })
    .catch((err) => {
      console.log("Error syncing database:", err);
    });
}

// Serve Swagger API documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// USER ROUTES
app.use("/api/v1/users", userRoutes);

const PORT =
  process.env.STATUS === "development"
    ? process.env.DEV_PORT
    : process.env.PROD_PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
