var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    Campground       = require("./models/campground"),
    Comment          = require("./models/comment"),
    User             = require("./models/user"),
    seedDB           = require("./seeds");
   
//PASSPORT CONFIGURATION
app.use(require("express-session")({
   secret: "Biggie Smalls, uh, Baby Baby",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//pass on user info onto all routes without having to type {currentUser: req.user} again and again
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});
    
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); // __dirname = "/home/ubuntu/workspace/YelpCamp/v3"
seedDB();
 
 
app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
   //Get all campgrounds for DB
   Campground.find({}, function(err, allCampgrounds){
      if(err){
         console.log(err);
      }
      else {
         res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
   res.render("campgrounds/new"); 
});

//SHOW ROUTE
app.get("/campgrounds/:id", function(req, res){
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err){
         console.log(err);
      }
      else {
         console.log(foundCampground);
         res.render("campgrounds/show", {campground: foundCampground});
      }
   }); 
});

//=======================
//COMMENTS
//=======================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
   //find campground by id
   Campground.findById(req.params.id, function(err, campground){
      if(err){
         console.log(err);
      }
      else {
         res.render("comments/new", {campground: campground});
      }
   });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, campground){
      if(err){
         console.log(err);
         res.redirect("/campgrounds");
      }
      else {
         Comment.create(req.body.comment, function(err, comment){
            if(err){
               console.log(err);
            }
            else {
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
               
            }
         });
      }
   });
});

//===============
//AUTH ROUTES
//===============

//show register form
app.get("/register", function(req, res) {
    res.render("register");
});

//handle signup logic
app.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
      if(err){
         console.log(err);
         return res.render("register");
      }
      else {
         passport.authenticate("local")(req, res, function(){
             res.redirect("/campgrounds");
         });
      }
   });
});

//SHOW LOGIN FORM

app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local",
   {
      successRedirect: "/campgrounds",
      failureRedirect: "/login"
   }),
   function(req, res) {
});

//add logout route
app.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
   if(req.isAuthenticated()){
      return next();
   }
   res.redirect("/login");
}



app.listen(process.env.PORT, process.env.IP, function(req, res){
   console.log("YelpCamp server now running..."); 
});