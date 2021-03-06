var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//ROOT ROUTE
router.get("/", function(req, res){
   res.render("landing"); 
});

//show register form
router.get("/register", function(req, res) {
    res.render("register");
});

//handle signup logic
router.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){  //simply passing the password in as a second argument
      if(err){                                                       //the "user" in this callback function is the new user we created
         console.log(err);
         return res.render("register"); //return here allows us to exit from the callback function
      }
      else {
         passport.authenticate("local")(req, res, function(){  //local here refers to the strategy
             res.redirect("/campgrounds");
         });
      }
   });
});

//SHOW LOGIN FORM

router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local",
   {
      successRedirect: "/campgrounds",
      failureRedirect: "/login"
   }),
   function(req, res) {
});

//add logout route
router.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/campgrounds");
});

//middleware
function isLoggedIn(req, res, next){
   if(req.isAuthenticated()){
      return next();
   }
   res.redirect("/login");
}

module.exports = router;