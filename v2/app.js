var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SET UP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//    name: "Ocala National Forest", 
//    image: "http://peechierana.weebly.com/uploads/4/2/4/1/4241588/2115013_orig.jpg",
//    description: "This is an amazing forest with a turqiouse, crystal clear lake."
   
// }, function(err, campground){
//    if(err){
//       console.log(err)
//    }
//    else {
//       console.log("Newly created campground!!");
//       console.log(campground);
//    }
// });

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
   Campground.find({}, function(err, allCampgrounds){
      if(err){
         console.log(err);
      }
      else {
         res.render("index", {campgrounds: allCampgrounds});
      }
   });
  //The "campgrounds" refers to the file we are passing the information to
});                                                         //The second campgrounds is the name; the third is the actual info we are passing in

app.post("/campgrounds", function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image: image, description: desc};
   Campground.create(newCampground, function(err, newlyCreated){
      if(err) {
         console.log(err);
         
      }
      else {
         res.redirect("/campgrounds");
      }
   });
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new.ejs"); 
});

app.get("/campgrounds/:id", function(req, res){
   Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
         console.log(err);
      }
      else {
         res.render("show", {campground: foundCampground});
      }
   }); 
});

app.listen(process.env.PORT, process.env.IP, function(req, res){
   console.log("YelpCamp server now running..."); 
});