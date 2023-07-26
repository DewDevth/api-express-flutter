const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
// const cors = require("cors");
const PORT = process.env.PORT || 4000;
const app = express();
// const allowedOrigins = [
//   "http://localhost:40494", // Replace with the origin of your frontend application
//   // Add more origins as needed
// ];

// Use the cors middleware to enable Cross-Origin Resource Sharing
// app.use(cors(allowedOrigins));

app.use(express.json());
app.use(authRouter);

const DB =
  "mongodb+srv://admin:1234@cluster0.mah5v2u.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection database Successfully");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});
