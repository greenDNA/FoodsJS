//idk comments

const mongoose = require('mongoose');

//create or connect to database at end of URL
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    rating: 3,
    review: "Delicious peaches"
});


const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "John",
    age: 37
});

//person.save();
fruit.save();

Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    } else {
        mongoose.connection.close();

        fruits.forEach( fruit => {
            console.log(fruit.name);
        });
        
    }
});

// Fruit.updateOne({_id: "5c43f94a2bbda4605e31f99a"}, {name: "Peach"}, function(err){
//     if(err){
//         console.log(err);
//     }else {
//         console.log("Successfully updated the document");
//     }
// });

Fruit.deleteOne({_id: "5c43f94a2bbda4605e31f99a"}, function(err){
    if(err){
        console.log(err);
    } else {
        console.log("Deleted successfully");
    }
});