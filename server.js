
// create the server 
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Person = require("./personModel");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(err));


// create and save one person 
 const createAndSavePerson = () => {
    const person = new Person({
      name: "Merla",
      age: 21,
      favoriteFoods: ["pizza", "steak"]
    });
  
    person.save((err, data) => {
      if (err) return console.error(err);
      console.log("Saved Person:", data);
    });
  };

  // create many people 
  
  const arrayOfPeople = [
    { name: "Austin", age: 23, favoriteFoods: ["tacos", "salad"] },
    { name: "Zelda", age: 19, favoriteFoods: ["burritos", "ramen"] },
    { name: "Perla", age: 26, favoriteFoods: ["pasta", "pizza"] }
  ];
  
  const createManyPeople = (people) => {
    Person.create(people, (err, data) => {
      if (err) return console.error(err);
      console.log("Multiple People Created:", data);
    });
  };
  
  
  // find people by name 
  const findPeopleByName = (personName) => {
    Person.find({ name: personName }, (err, data) => {
      if (err) return console.error(err);
      console.log("Found by Name:", data);
    });
  };
  
  
  // finding one person by  favorite food 
  
  const findOneByFood = (food) => {
    Person.findOne({ favoriteFoods: food }, (err, data) => {
      if (err) return console.error(err);
      console.log("Found One by Food:", data);
    });
  };
  

  // find by ID 
  const findPersonById = (personId) => {
    Person.findById(personId, (err, data) => {
      if (err) return console.error(err);
      console.log("Found by ID:", data);
    });
  };
  
// find - edit - save 

const findEditThenSave = (personId) => {
    Person.findById(personId, (err, person) => {
      if (err) return console.error(err);
      person.favoriteFoods.push("hamburger");
      person.save((err, updatedPerson) => {
        if (err) return console.error(err);
        console.log("Updated Favorite Foods:", updatedPerson);
      });
    });
  };
  
  
  // find the person name and update the age 

  const findAndUpdate = (personName) => {
    Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true },
      (err, updatedDoc) => {
        if (err) return console.error(err);
        console.log("Age Updated:", updatedDoc);
      }
    );
  };
  

  //delete one person by ID 

  const deleteById = (personId) => {
    Person.findByIdAndRemove(personId, (err, removedDoc) => {
      if (err) return console.error(err);
      console.log("Deleted:", removedDoc);
    });
  };
  

  // delete many people by name 
  
  const deleteManyPeople = () => {
    Person.remove({ name: "Mary" }, (err, result) => {
      if (err) return console.error(err);
      console.log("Delete Result:", result);
    });
  };
  


  // This function looks for people who love burritos - sorts them by name- limits the result to two - hides their age - and finally logs the results.
// so in this part we are going to handle a multiple queries chained in order and give the final results after axcution 

const chainQuery = () => {
  Person.find({ favoriteFoods: "burritos" }) 
    .sort({ name: 1 })                       
    .limit(2)                                
    .select("-age")                          
    .exec((err, data) => {                   
      if (err) return console.error(err);
      console.log("Chained Query:", data);
    });
};


  

  
  
  
  
  
  