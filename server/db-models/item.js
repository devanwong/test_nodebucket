/*============================================;
Title: nodebucket;
Author: Professor Krasso ;
Date: 24 March 2021;
Modified By: Douglas Jenkins;
Description: creating the tasks for soap ui
;===========================================*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let itemSchema = new Schema ({
  text: { type: String }
});

module.exports = itemSchema;
