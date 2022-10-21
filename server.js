const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());

//ROUTES
app.use("/post", postRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}🚀`);
});
