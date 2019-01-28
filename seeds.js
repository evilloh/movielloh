var mongoose = require("mongoose");
var Movie    = require('./models/movies');
var Comment  = require("./models/comments");

var data = [
    {
        title: "Arrival", 
        image: "https://static.wixstatic.com/media/839d6d_f0b4323cb3214991b195c51c810fd476~mv2.jpg/v1/crop/x_0,y_0,w_1050,h_630/fill/w_300,h_180,al_c,q_80,usm_0.66_1.00_0.01/839d6d_f0b4323cb3214991b195c51c810fd476~mv2.webp",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        title: "Mulholland Drive", 
        image: "https://static.wixstatic.com/media/839d6d_045556209b1440d6949bd5047c784494~mv2.jpg/v1/crop/x_0,y_96,w_1280,h_768/fill/w_300,h_180,al_c,q_80,usm_0.66_1.00_0.01/839d6d_045556209b1440d6949bd5047c784494~mv2.webp",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        title: "La La Land", 
        image: "https://static.wixstatic.com/media/839d6d_15f7f4d68e1d4ffea07187db991cc974~mv2.png/v1/crop/x_0,y_13,w_780,h_468/fill/w_300,h_180,al_c,q_80,usm_0.66_1.00_0.01/839d6d_15f7f4d68e1d4ffea07187db991cc974~mv2.webp",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]


function seedDB(){
// REMOVE ALL MOVIES  
    Movie.remove({}, function(err){
        if (err){
            console.log(err)
        }
        console.log("removed movies!!!!")
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
        console.log("removed comments!!!!")
    // add a few movies
        data.forEach(function(seed){
        Movie.create(seed, function(err, movie){
            if(err){
                console.log(err);
            } else {
                console.log("added a movie!");
                // add a few comments
                Comment.create(
                    {
                        text: "I totally agree with you!",
                        author: "Whoever"
                    }, function (err, comment){
                        if(err){
                            console.log(err)
                        } else {
                            movie.comments.push(comment);
                            movie.save();
                            console.log("added a comment");
                        }
                    })
                }
            })
         })
        });
    });
};


module.exports = seedDB;