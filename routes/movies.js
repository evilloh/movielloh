var express = require("express");
var router  = express.Router();
var Movie   = require("../models/movies");
var middleware = require("../middleware")

router.get("/", function(req, res){
   //  Get all movies from db
    Movie.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        } else {
            res.render("movies/index", {movies: allMovies, currentUser: req.user});
        }
    });
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    var title = req.body.title;
    var image = req.body.image;
    var score = req.body.score;
    var desc  = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newMovie = {title: title, image: image, score: score, description: desc, author: author};
    Movie.create(newMovie, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Successfully created Movie review!");
            res.redirect("/movies");
        }
    });
});

// NEW
router.get("/new", middleware.isLoggedIn, function (req, res){
    res.render('movies/new');
});

// SHOW
router.get("/:id", function(req, res){
    //find the right id, request it
    Movie.findById(req.params.id).populate("comments").exec(function(err, foundMovie){
        if (err || !foundMovie){
            req.flash("error", "Movie not found");
            res.redirect("back")
        } else {
            res.render('movies/show', {movie: foundMovie});
        }
    });
});



// EDIT MOVIE ROUTE WITH CHECK
router.get("/:id/edit", middleware.checkMovieOwnership, function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if (err){
            req.flash("error", "Movie doesn't exist!");
        } else {
            res.render("movies/edit", {movie: foundMovie});
        }
    });
});


// UPDATE MOVIE
router.put("/:id", middleware.checkMovieOwnership, function(req, res){
    Movie.findByIdAndUpdate(req.params.id, req.body.movie, function(err, updatedMovie){
        if (err){
            res.redirect("/movies");
        } else {
            req.flash("success", "Successfully edited movie!");
            res.redirect("/movies/" + req.params.id);
        }
    });
});



// DELETE MOVIE ROUTE
router.delete("/:id", middleware.checkMovieOwnership, function(req, res){
        Movie.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/movies");
        } else {
            req.flash("success", "Successfully deleted movie!");
            res.redirect("/movies");
        }
    });
});



module.exports = router