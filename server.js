const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use((_req, res) => {
  res.status(404).json({error: 'Not Found'})
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}🚀`);
});
