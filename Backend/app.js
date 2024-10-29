const express = require("express");
require("dotenv").config();
const db = require("./src/db/dbconfig");
const sequelize = require("./src/db/dbconfig");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger");
const userRoutes = require("./src/routes/UserRoute");
const notesRoutes = require("./src/routes/NotesRoute");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Middleware to parse JSON request bodies
app.use(express.json());

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.log("Error", error);
  });

// Serve Swagger API documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// USER ROUTES
app.use("/api/v1/users", userRoutes);
// NOTES
app.use("/api/v1/notes", notesRoutes);

const PORT =
  process.env.STATUS === "development"
    ? process.env.DEV_PORT
    : process.env.PROD_PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
