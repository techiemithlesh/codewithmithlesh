const express = require("express");
require("dotenv").config();
const db = require("./src/db/dbconfig");
const sequelize = require("./src/db/dbconfig");

const userRoutes = require("./src/routes/UserRoute");
const notesRoutes = require("./src/routes/NotesRoute");
const blogRoutes = require("./src/routes/BlogRoutes");
const { swaggerUi, swaggerSpec } = require("./swagger");
const User = require("./src/models/User");
const Blog = require("./src/models/Blog");
const Notes = require("./src/models/Notes");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Middleware to parse JSON request bodies
app.use(express.json());

const models = {
  User,
  Blog,
  Notes,
};

// Set up associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.error("Error syncing database:", error.message);
    console.error("Detailed error:", error);
  });

// Serve Swagger API documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// USER ROUTES
app.use("/api/v1/users", userRoutes);
// NOTES
app.use("/api/v1/notes", notesRoutes);

// BLOGS
app.use("/api/v1/blog", blogRoutes);

const PORT =
  process.env.STATUS === "development"
    ? process.env.DEV_PORT
    : process.env.PROD_PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
