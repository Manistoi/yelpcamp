var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    flash            = require("connect-flash"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    methodOverride   = require("method-override"),
    Campground       = require("./models/campground"),
    Comment          = require("./models/comment"),
    User             = require("./models/user"),
    seedDB           = require("./seeds");
   
   
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
   
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
app.use(flash());
app.use(function(req, res, next){
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   res.locals.currentUser = req.user;
   next();
});

mongoose.connect("mongodb://manny:gamersinc@ds013966.mlab.com:13966/yelpcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); // __dirname = "/home/ubuntu/workspace/YelpCamp/v3"
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // seed the database


//REQUIRING ROUTES
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(req, res){
   console.log("YelpCamp server now running..."); 
});