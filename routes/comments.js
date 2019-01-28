var express = require("express");
var router  = express.Router();
var Movie   = require("../models/movies");
var Comment = require("../models/comments");
var middleware = require("../middleware");

router.get("/movies/:id/comments/new", middleware.isLoggedIn, function(req, res){
    // find movies by ID
    Movie.findById(req.params.id, function(err, movie){
        if (err) {
            console.log(err)
        } else {
            res.render('comments/new', {movie: movie});
        }
    })
});

router.post("/movies/:id/comments", middleware.isLoggedIn, function(req, res){
    // lookup movie using ID
    Movie.findById(req.params.id, function(err, movie){
        if (err){
            console.log(err)
            res.redirect("/movies");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong!");
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    movie.comments.push(comment);
                    movie.save();
                    req.flash("success", "Successfully added comment!");
                    res.redirect('/movies/' + movie._id);
                }
            })
        }
    })
});

// EDIT COMMENTS ROUTE

router.get("/movies/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie) {
        if(err || !foundMovie){
            req.flash("error", "No Movie Found");
            return res.redirect("back");
        }
               Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err || !foundComment){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                res.render("comments/edit", {movie_id: req.params.id, comment: foundComment});
            }
        }) ;
    });
});

// COMMENT UPDATE
router.put("/movies/:id/comments/:comment_id/", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
          if(err){
              res.redirect("back");
          } else {
              req.flash("success", "Successfully edited comment!");
              res.redirect("/movies/" + req.params.id );
          }
       });
});

// COMMENT DESTROY ROUTE
router.delete("/movies/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Successfully deleted comment!");
           res.redirect("/movies/" + req.params.id);
       }
    });
});



module.exports = router