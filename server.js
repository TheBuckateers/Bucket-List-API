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



// GET from db 
// bucket route
app.get('/bucketList', async (req, res) => {
  console.log('req', req.query.email);
  let email = req.query.email;
  try {
    await BucketListModel.find({ email }, (err, bucket) => {
      if (err) {
        res.status(500).send('Cannot access the database');
      } else {
        res.status(200).send(bucket);
      }
    });
  }
  catch (err) {
    res.status(500).send('Server error - fix and come back later!');
  }
});

// POST new note to db
app.post('/bucketList', async (req, res) => {
  let { country, countryCode, email, note } = req.body;
  try {
    let newBucket = new BucketListModel({ country, countryCode, email, note });
    await newBucket.save();
    res.status(200).send(newBucket);
  }
  catch (err) {
    console.log('error', err);
    res.status(500).send('Server error');
  }
})

// PUT req to update bucket list in db
app.put('/bucketList/:countryCode', async (req, res) => {
  let bucketId = req.params.countryCode;
  console.log('req.body:', req.body)
  // user is defined with auth0
  try {
    await BucketListModel.findByIdAndDelete(bucketId, req.body);
    res.status(200).send('Updated your Bucket!');
  }
  catch (err) {
    console.log('updateError', err);
    res.status(500).send('Server error!');
  }
})

// DELETE request to delete a bucket from your list in db
app.delete('/bucketList/:id', async (req, res) => {
  let bucketId = req.params.id;
  console.log('req.query:', req.query);
  try {
    await BucketListModel.findByIdAndDelete(bucketId);
    res.send('Deleted that bucket! You should go add another!');
  }
  catch (err) {
    console.log('deleteError', err);
    res.status(500).send('Server error!');
  }
})


// test seed the db
// Seeding the database
async function seed(req, res) {
  let testBuckets = await BucketListModel.find({});
  if (testBuckets.length === 0) {
    const testBucketOne = new BucketListModel({
      countryCode: "CO",
      email: "vbchomp@gmail.com",
      note: "sure, let's go",
    });
    const testBucketTwo = new BucketListModel({
      countryCode: "RE",
      email: "vbchomp@gmail.com",
      note: "Maybe in a  few years.",
    });
    const testBucketThree = new BucketListModel({
      countryCode: "PT",
      email: "vbchomp@gmail.com",
      note: "On the top of my list of places that I want to go!",
    });
    const testBucketFour = new BucketListModel({
      countryCode: "KZ",
      email: "vbchomp@gmail.com",
      note: "I should look more into this.",
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
  
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  // connect to the default db connection
  const db = mongoose.connection;
  // get notifications of connections errors
  
  db.on("error", (error) => console.error(error))
  
  // ***seed a few test buckets. delete .then, seed(), and closing}) before production***
  .then(async () => {
  //   seed();
    // get notified when connected to db
    db.once("open", () => console.log("Connected to Database"));
  })
  
  
  //clearing the database - USE ONLY IN CASES OF EXTREME PARANOIA
  async function clear(req, res) {
    try {
      await BucketListModel.deleteMany({});
      res.status(200).send('Ooops, I did again!');
    }
    catch (err) {
      res.status(500).send('Uhhh, Houston we have a problem!');
    }
  }
  
  // clear route - BE GENTLE with PARANOIA
  app.get('/clear', clear);
  

  app.get("*", (req, res) => {
    res.status(404).send("Page not found");
  });
  
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
  