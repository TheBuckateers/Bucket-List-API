"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
// const mongoose = require("mongoose");
app.use(express.json());

const PORT = process.env.PORT || 3001;

const countryRouter = require("./routes/countryRouter");
const foodRouter = require("./routes/foodRouter");
const advisoryRouter = require("./routes/advisoryRouter");
const enviroRouter = require("./routes/enviroRouter");
app.use("/country", countryRouter);
app.use("/food", foodRouter);
app.use("/advisory", advisoryRouter);
app.use("/enviro", enviroRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// *** change DATABASE_URL to 
// MONGODB_URI is the MongoDB Atlas Server URL w/PW Connection to Application ***

// Connects to our mongoDB with mongo shell
// mongo "mongodb+srv://cluster0.btbni.mongodb.net/bucketList" --username AtlasAdmin
// setup default db connection
mongoose.connect(`${process.env.DATABASE_URL}/bucketList`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// connect to the default db connection 
const db = mongoose.connection;
// get notifications of connections errors
db.on("error", (error) => console.error(error));
// get notified when connected to db
db.once("open", () => console.log("Connected to Database"));

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
