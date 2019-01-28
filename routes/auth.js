var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User    = require("../models/users")

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            res.redirect("/register");
        } passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome " + user.username + "!");
            res.redirect("/movies");
        });
    });
});

router.get("/login", function(req, res) {
    res.render("login");
})

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/movies",
        failureRedirect: "/login"
    }), function(req, res) {
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/movies");
});


module.exports = router