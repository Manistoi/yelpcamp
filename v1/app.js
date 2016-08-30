var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
      {name: "Everglades National Park", image: "https://www.nps.gov/ever/planyourvisit/images/tigerkeycampsite2010bi.jpg"},    
      {name: "Ocala National Forest", image: "http://peechierana.weebly.com/uploads/4/2/4/1/4241588/2115013_orig.jpg"},    
      {name: "Anastasia State Park", image: "https://www.floridastateparks.org/sites/default/files/styles/slider_large/public/Division%20of%20Recreation%20and%20Parks/gallery/IMG_7427.JPG?itok=_oG44Vxy"},    
];

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
   res.render("campgrounds", {campgrounds: campgrounds});  //The "campgrounds" refers to the file we are passing the information to
});                                                         //The second campgrounds is the name; the third is the actual info we are passing in

app.post("/campgrounds", function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image};
   campgrounds.push(newCampground);
   res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(req, res){
   console.log("YelpCamp server now running..."); 
});