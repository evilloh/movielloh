var Movie = require("../models/movies");
var Comment = require("../models/comments");
var middlewareObj = {};

middlewareObj.checkMovieOwnership = function(req, res, next){
         if(req.isAuthenticated()){
            Movie.findById(req.params.id, function(err, foundMovie){
            if(err || !foundMovie){
                req.flash("error", "Movie not found");
                res.redirect("back")
            } else {
                if(foundMovie.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        })
        } else {
            res.redirect("back");
        }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
         if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back")
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        })
        } else {
            req.flash("error", "You need to be logged in to do that!")
            res.redirect("back");
        }
    };

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    } 
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
};


module.exports = middlewareObj