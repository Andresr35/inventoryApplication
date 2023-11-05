#! /usr/bin/env node
const Gel = require("./models/gel");
const Watch = require("./models/watch");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(process.env.MONDODB_KEY);
  console.log("Debug: Should be connected?");
  await createShoeInstances();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function createGels() {
  const gel = new Gel({
    brand: "Honey Stinger",
    price: 2.96,
    caffeineAmount: 50,
    flavor: "Blueberry Pomegranate",
  });
  await gel.save();
  console.log("added Gels");
}

async function createWatches() {
  const watch = new Watch({
    brand: "Garmin",
    model: "ForeRunner 265",
    description:
      "A mid range running watch with tons of functions for most sports",
  });
  const appleWatch = new Watch({
    brand: "Apple",
    model: "Ultra",
    description: "A high end smart watch",
  });
  await watch.save();
  // await appleWatch.save();
  console.log("Watches saved");
}
