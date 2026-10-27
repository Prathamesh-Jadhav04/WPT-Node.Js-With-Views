import express from "express";
import mongoose from "mongoose";
import dbConnect from "../config/db.js";

const APP = express();
APP.use(express.urlencoded())
dbConnect()
  .then(function (res) {
    console.log("DB Connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const kittySchema = new mongoose.Schema({
  name: String,
  age: Number,
  place: String,
});

const Kitten = mongoose.model("users", kittySchema);
APP.get("/showusers", async function (req, res) {
  try {
    let result = await Kitten.find();
    res.render("show.ejs",{dataSet:result});
  } catch (err) {
    console.log(err);
  }
});
APP.get("/addusers", function (req, res) {
  res.render("add.ejs");
});

APP.post("/user-action", async function (req, res) {
  console.log(req.body);
  try {
    await Kitten.create(req.body);
    res.redirect("/showusers");
  } catch (error) {
    console.log(error);
    
  }
  
});
APP.listen(6900);
