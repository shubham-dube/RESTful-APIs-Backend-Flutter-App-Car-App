const mongoose = require("mongoose");

const connection = mongoose.createConnection("mongodb+srv://shubham_dubey:Shubham%401166@mongoserver.jhrakvz.mongodb.net/?retryWrites=true&w=majority&appName=MongoServer/FixItParts").on("open", ()=>{
    console.log("Database Connected");
});

module.exports = connection;