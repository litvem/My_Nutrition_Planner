var express = require('express');
var router = express.Router();

var Recipe = require('../models/recipe');
const User = require('../models/user');

var recipesPath = '/api/profiles/:profileId/recipes';
var specificRecipesPath = '/api/profiles/:profileId/recipes/:recipeId';
/*
router.post(recipesPath,function(req, res,next) {
  User.findById(req.params.profileId)
  .exec()
  .then(user =>{
    if(user ==null){
      return res.status(404).json({message:"User not found"});
    }
    var recipe = new Recipe({
     // _id: recipeID,
      name: req.body.name,
      category: req.body.category,
      picture:req.body.picture,
      tag: req.body.tag,
      instruction: req.body.instruction,
      items:req.body.items
    });

    recipe.save()
    .then(recipe =>{
        res.status(201).json({ 
        recipeCreated: recipe,
        links: {
         ref:'self', 
         type: "GET",
         url: 'http://localhost:3000/api/profiles/'+ user._id + '/recipes/' + recipes._id 
        } 
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });

    user.recipes.push(recipe);
    user.save();
  });
});
*/

router.post(recipesPath,function(req, res,next) {
  User.findById(req.params.profileId)
  .exec()
  .then(user =>{
    if(user ==null){
      return res.status(404).json({message:"User not found"});
    }
    
    var recipeID = user.recipes.length + 1;
    var recipe = new Recipe({
     // _id: recipeID,
      name: req.body.name,
      category: req.body.category,
      picture:req.body.picture,
      tag: req.body.tag,
      instruction: req.body.instruction,
      items:req.body.items
    });

    recipe.save()
    
    res.status(201).json({ 
      recipeCreated: recipe,
      links: {
        rel: "self",
        type: "GET",
        url: 'http://localhost:3000/api/profiles/'+ user._id +/recipes/ + recipe._id 
      }
    });

    user.recipes.push(recipe);
    user.save();
      
  }) 
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});


// get all 
router.get(recipesPath, function(req,res,next){
  User.findById({_id:req.params.profileId})
  .populate('recipes')
  .then(user => {
    if (!user) {
      return res.status(404).json({
        message: "Not found"
      });
    }else if(user.recipes.length === 0){
      return res.status(404).json({
        message: "Recipe not found"
      });
    }else{
      return res.status(200).json({
        recipes: user.recipes,
        link: {
         rel: "Recipe",
         type: "POST",
         url: 'http://localhost:3000/api/profiles/'+ user._id + '/recipes'
       }
     });
    }
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

// Get specific - for patch copy and add. 
router.get(specificRecipesPath, function(req,res,next){

  User.findOne({_id:req.params.profileId })
  .populate({path: 'recipes' , match:{_id: {$eq: req.params.recipeId}},})
  .exec()
  .then(user =>{
    if(user === null){
      return res.status(404).json({message: 'User not found'}); 
    }
    if(user.recipes.length === 0){
      return res.status(404).json({message: 'Recipe not found'})
    }

    res.status(200).json({
      recipe: user.recipes,
      links: {
        rel: "self",
        type: "PATCH",
        url: 'http://localhost:3000/api/profiles/'+ user._id + '/recipes/' + user.recipes._id 
      }
   });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });  
});


// put 
router.put(specificRecipesPath, function(req, res, next) {
  User.findOne({_id:req.params.profileId})
  .populate({path: 'recipes' , match:{_id: {$eq: req.params.recipeId}},})
  .exec()
  .then(user =>{
    if(user === null){
      return res.status(404).json({message: 'User not found'}); 
    }
    if(user.recipes.length === 0){
      return res.status(404).json({message: 'Recipe not found'})
    }
    Recipe.findById({_id:req.params.recipeId })
    .exec()
    .then(recipe =>{

      recipe.name = req.body.name;
      recipe.category = req.body.category;
      recipe.picture = req.body.picture;
      recipe.tag = req.body.tag;
      recipe.instruction = req.body.instruction;
      recipe.items= req.body.items;

      recipe.save();

      res.status(200).json({
        updatedRecipe: recipe,
        links: {
          rel: "self",
          type: "GET",
          url: 'http://localhost:3000/api/profiles/'+ user._id + '/recipes/' + recipe._id 
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  }) 
});


// deleting specific
router.delete(specificRecipesPath, function(req, res, next) {
  User.findOne({_id:req.params.profileId})
  .populate({path: 'recipes' , match:{_id: {$eq: req.params.recipeId}},})
  .exec()
  .then(user =>{
    if(user === null){
      return res.status(404).json({message: 'User not found'}); 
    }
    if(user.recipes.length === 0){
      return res.status(404).json({message: 'Recipe not found'})
    }
    user.recipes.pull({_id: req.params.recipeId});
    user.save();

    Recipe.findOneAndDelete({_id: req.params.recipeId})
    .then(recipe =>{
      var recipeName = recipe.name;

      return res.status(200).send({
        message : "The recipe has been deleted",
        recipeName: recipeName,
        link:{
          rel:'recipes',
          type:'POST',
          url:'http://localhost:3000/api/profiles/' + user._id + '/recipes'
        }
      });
    })
    .catch(err => {
      res.status(500).json({
      error: err
      });
    });
  }) 
});




module.exports = router;