const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}🚀`);
});
