// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// use json
app.use(bodyParser.json());

// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './client/dist')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

// require mongoose
var mongoose = require('mongoose');
// Connect to database
mongoose.connect('mongodb://localhost/Restaurants');
mongoose.Promise = global.Promise;

// create schema and model
let Schema = mongoose.Schema;
let RestSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3},
    cuisine: { type: String, required: true, minlength: 3},
    reviews: [{
        user: {type: String, minlength: 3},
        desc: {type: String, minlength: 3},
        stars: {type: Number, min: 1, max: 5} } ]}, 
    { strict: true }, {timestamps: true});

// set unique index to prevent duplication
RestSchema.index({name: 1}, {unique: true});

let Rest = mongoose.model("Rest", RestSchema);

// Routes
// Root Request
// get all restaurants
app.get('/rests', function(req, res) {
    Rest.find({}, function(err, rests) {
        if (err) {  
            console.log("Error retrieving restaurants");
            console.log(err)
            res.json({message: "Error", error: err});
        } 
        res.json({message: "Success", data: rests});
    })
})


// get one restaurant
app.get('/rests/:id', function(req, res) {
    console.log("enter get")
    Rest.findOne({_id: req.params.id}, function(err, rest) {
        if(err) {
            console.log('Error retrieving data');
            res.json({message: "Error", error: err})
        } else { // else console.log that we did well and then redirect to the root route
            console.log('Successfully retrieved a restaurant');
            res.json({message: "Success", data: rest});
        }
    }).sort({reviews: -1})
})

// create new restaurant
app.post('/rests', function(req, res) {
    console.log(req.body)
    var rest = new Rest({name: req.body.name, 
                    cuisine: req.body.cuisine});
            
    // Try to save that new restaurant to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    rest.save(function(err) {
        // if there is an error console.log that something went wrong!
        if(err) {
            console.log('Error saving new restaurant');
            res.json({message: "Error", error: err})
        } else { // else console.log that we did well and then redirect to the root route
            console.log('Successfully added a restaurant');
            res.json({message: "Success", data: rest});
        }
    })
})

// update restaurant
app.put('/rests/:id', function(req, res) {
    Rest.findOneAndUpdate({_id: req.params.id}, 
                        {$set: { name: req.body.name, 
                            cuisine: req.body.cuisine,
                            reviews: req.body.reviews}}, 
                        null, function(err) {
        if(err) {
            console.log('Error during update');
            res.json({message: "Error", error: err})
        } else { // else console.log that we did well and then redirect to the root route
            console.log('Successfully updating a restaurant');
            res.json({message: "Success"});
        }
    })
})

// delete restaurant
app.delete('/rests/:id', function(req, res) {
    Rest.deleteOne({_id: req.params.id}, function(err) {
        if(err) {
            console.log('Error during delete');
            res.json({message: "Error", error: err})
        } else { // else console.log that we did well and then redirect to the root route
            console.log('Successfully deleting a restaurant');
            res.json({message: "Success"});
        }
    })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("Restaurants listening on port 8000");
})
