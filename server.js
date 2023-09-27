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
app.use((err, _req, res, _next) => {
  if(err instanceof ValidateError) {
    res.status(422).json({
      error: 'Validation Error',
      details: err.fields
    });
    return
  }

  if(err instanceof ApiAuthError) {
    res.status(401).json({
      err: err.name,
      details: err.message,
    });
    return;
  }

  if(err instanceof Error) {
    res.status(500).json({
      error: err.message
    });
    return;
  }
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}🚀`);
});
