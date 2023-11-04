#! /usr/bin/env node
const Gel = require("./models/gel");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(process.env.MONDODB_KEY);
  console.log("Debug: Should be connected?");
  await createGels();
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
