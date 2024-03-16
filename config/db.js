const mongoose = require("mongoose");

const connection = mongoose.createConnection("mongodb+srv://itzshubhamofficial:Shubham%401166@cluster444.acgkmtb.mongodb.net/FixItParts").on("open", ()=>{
    console.log("Database Connected");
});

module.exports = connection;