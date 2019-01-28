var express     = require("express"),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Movie       = require("./models/movies"),
    seedDB      = require("./seeds"),
    methodOverride = require("method-override"),
    User        = require("./models/users"),
    Comment     = require("./models/comments");
    
var commentRoutes = require("./routes/comments");
var moviesRoutes = require("./routes/movies");
var authRoutes = require("./routes/auth");

mongoose.connect("mongodb://localhost:27017/movies", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/pubic"))
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// PASSPORT CONFIGURATION 
app.use(require("express-session")({
    secret: "Evilloh is the best!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})





// ===========================
// COMMENTS ROUTES


// =================
// AUTH ROUTES
// =================

app.use(authRoutes);
app.use("/movies", moviesRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("the movie review server has started!");
});