"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
app.use(express.json());
const BucketListModel = require("./models/bucketList");

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
// seed db route
app.use("/seed", seed);

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// test seed the db
// Seeding the database
async function seed(req, res) {
  let testBuckets = await BucketListModel.find({});
  if (testBuckets.length === 0) {
    const testBucketOne = new BucketListModel({
      countryCode: "CO",
      countryName: "Colombia",
      countryLat: "4.0",
      countryLon: "-72.0",
      email: "vbchomp@gmail.com",
    });
    const testBucketTwo = new BucketListModel({
      countryCode: "RE",
      countryName: "Reunion",
      countryLat: "-21.15",
      countryLon: "55.5",
      email: "vbchomp@gmail.com",
    });
    const testBucketThree = new BucketListModel({
      countryCode: "PT",
      countryName: "Portugal",
      countryLat: "39.5",
      countryLon: "-8.0",
      email: "vbchomp@gmail.com",
    });
    const testBucketFour = new BucketListModel({
      countryCode: "KZ",
      countryName: "Kazakhstan",
      countryLat: "48.0",
      countryLon: "68.0",
      email: "vbchomp@gmail.com",
    });
    testBucketOne.save();
    testBucketTwo.save();
    testBucketThree.save();
    testBucketFour.save();
    console.log(
      "I have excersiiiiiiiiiiized the database",
      "http://localhost:3001/seed"
    );
  }
  console.log("DB has been seeded");
}

// MONGODB_URI is the MongoDB Atlas Server URI saved as variable in heroku ***
// snagged directions on how to setup connection for Atlas Server from
// https://github.com/vbchomp/seattle-code-301n22/tree/main/class-14

// setup default db connection

mongoose.connect(`${process.env.DATABASE_URL}/bucketList`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// connect to the default db connection
const db = mongoose.connection;
// get notifications of connections errors

db.on("error", (error) => console.error(error))

  // ***seed a few test buckets. delete .then, seed(), and closing}) before production***
  .then(async () => {
    seed();
    // get notified when connected to db
    db.once("open", () => console.log("Connected to Database"));
  });

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
