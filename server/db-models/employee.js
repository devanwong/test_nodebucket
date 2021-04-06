/*============================================;
Title: nodebucket;
Author: Professor Krasso ;
Date: 18 March 2021;
Modified By: Douglas Jenkins;
Description: creating a sign in page
;===========================================*/

const mongoose = require('mongoose');
const Item = require('./item');

// this will let the model know where to connect
let employeeSchema = mongoose.Schema({
  empId: {type: String, required: true, unique: true },
  todo: [Item],
  done: [Item]
// maps it to mongodb
}, { collection: "employees"})


module.exports = mongoose.model("Employee", employeeSchema);
