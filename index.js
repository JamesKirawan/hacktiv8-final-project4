require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const userRoutes = require("./routes/user");
const photoRoutes = require("./routes/photo");
const commentRoutes = require("./routes/comment");
const socialmediaRoutes = require("./routes/socialmedia");

app.use("/api/users", userRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/socialmedia", socialmediaRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
