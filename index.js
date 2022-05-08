require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const userRoutes = require("./routes/user");
const photoRoutes = require("./routes/photo");

app.use("/api/users", userRoutes);
app.use("/api/photos", photoRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
