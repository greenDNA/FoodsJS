/**
 * Server of the application
 * 
 * Purpose is to allow users to visit the website and provide
 * recipes that will transfered to the server. At this point
 * the server will connect to the database and store the
 * user's recipe(s). Recipes stored in the database will be
 * given to the user upon viewing the website. Effectively
 * keeping valid records of user recipes.
 * 
 * TODO
 * 
 * TODO: Add support for updating/modifying, and deleting existing recipes.
 * TODO: Add support for ingredients and instructions
 * TODO: User accounts and authentication
 * TODO: Add image support
 * TODO: Create site API: Searching, tags, ratings, creators, etc
 * Improve UI/UX
 * Shopping cart/inventory functionality to remind user what ingredients or items they need to buy
 * Scheduler/reminder function to remind the user of scheduled times to make their meals. Later today, or any day in the future.
 * Set favorites
 * Provide links to suggested grocery retailers
 * Print grocery list or recipe functionality
 * 
 * TODO
 * 
 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/recipeDB", {useNewUrlParser: true});

const recipeSchema = new mongoose.Schema({
    _id: Number,
    name: String,

});

const Recipe = mongoose.model("Recipe", recipeSchema);

let list;

app.get("/", function(req, res){
    list = [];
    Recipe.find(function(err, recipes){
        if(err){
            console.log(err);
        } else {
           // mongoose.connection.close();
            recipes.forEach(recipe => {
                console.log(recipe);
                list.push(recipe);
            })
            res.render("list", {list: list});
        }
    })
    console.log("Connected");
});

app.post("/", function(req, res){
    let item = (req.body.newItem);
    console.log("This is the recipe name submitted: " + item);
    console.log("Lenght of the list array: "+list.length);
    //Recipe.updateOne({_id: (list.length+1), name: item.name});
    const recipe = new Recipe({
        _id: (list.length+1),
        name: item
    });
    recipe.save();
    
    //list.push(recipe);
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server listening on port 3000");
});

/**
 * mongoose.connect("mongodb://localhost:27017/recipeDB", {useNewUrlParser: true});

const recipeSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    // ingredients: [String, Number],
    // steps: [String]
});

const Recipe =  mongoose.model("Recipe", recipeSchema);

const recipe = new Recipe({
    _id: 2,
    name: "Pasta Supreme",
});

//recipe.save();

 */