var mongoose = require("mongoose");

//SCHEMA SET UP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment" //ref tells mongoose which model to use
        }   
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);
