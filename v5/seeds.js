var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    { name: "Anastasia State Park", image: "https://www.floridastateparks.org/sites/default/files/styles/slider_large/public/Division%20of%20Recreation%20and%20Parks/gallery/IMG_7427.JPG?itok=_oG44Vxy",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam molestie tellus vestibulum leo faucibus suscipit. In non tristique tortor. Nulla non eros et purus elementum blandit. Fusce ut enim imperdiet, egestas elit eu, tempus nunc. Sed blandit vestibulum volutpat. Proin tincidunt placerat ipsum, eget convallis nisl pharetra id. Morbi non eros nunc. Duis in aliquet lacus, vestibulum lobortis sem. Ut iaculis mauris ullamcorper erat placerat tristique. Aliquam erat volutpat."
    },
    { name: "Anastasia State Park", image: "https://www.floridastateparks.org/sites/default/files/styles/slider_large/public/Division%20of%20Recreation%20and%20Parks/gallery/IMG_7427.JPG?itok=_oG44Vxy",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam molestie tellus vestibulum leo faucibus suscipit. In non tristique tortor. Nulla non eros et purus elementum blandit. Fusce ut enim imperdiet, egestas elit eu, tempus nunc. Sed blandit vestibulum volutpat. Proin tincidunt placerat ipsum, eget convallis nisl pharetra id. Morbi non eros nunc. Duis in aliquet lacus, vestibulum lobortis sem. Ut iaculis mauris ullamcorper erat placerat tristique. Aliquam erat volutpat."
    },
    { name: "Anastasia State Park", image: "https://www.floridastateparks.org/sites/default/files/styles/slider_large/public/Division%20of%20Recreation%20and%20Parks/gallery/IMG_7427.JPG?itok=_oG44Vxy",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam molestie tellus vestibulum leo faucibus suscipit. In non tristique tortor. Nulla non eros et purus elementum blandit. Fusce ut enim imperdiet, egestas elit eu, tempus nunc. Sed blandit vestibulum volutpat. Proin tincidunt placerat ipsum, eget convallis nisl pharetra id. Morbi non eros nunc. Duis in aliquet lacus, vestibulum lobortis sem. Ut iaculis mauris ullamcorper erat placerat tristique. Aliquam erat volutpat."
    }    
]


function seedDB(){
    Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("removed campgrounds");
    });
    //add a few campgrounds
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){console.log(err);}
            else {
                console.log("Added a campground");
                //Create a campground
                Comment.create({text: "This place is great, but I wish there was internet!",
                    author: "Homer Simpson"
                }, function(err, comment){
                        if(err){
                            console.log(err);
                        }
                        else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comment!");
                        }
                })
            }
        });
    });
    //add a few comments
};

module.exports = seedDB;