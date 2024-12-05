// controllers/recipes.js

const express = require('express');
const router = express.Router();

const User = require('../model/user.js');
const Recipe = require('../model/recipe.js');
const Ingredient = require('../model/ingredients.js');




router.get('/', async (req, res) => {
  res.render('recipes/index.ejs');
});

router.post('/', async (req, res) => {
  req.body.owner = req.session.user._id
  await Recipe.create(req.body)
  res.redirect('/recipes')
})


router.get('/new', async (req, res) => {
  const ingredient = await Ingredient.find()
  res.render('recipes/new.ejs',{ingredient})
})

router.post('/', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    newRecipe.owner = req.session.user._id
    await newRecipe.save();
    
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
});

router.get('/', async (req, res) => {
  const recipes = await Recipe.find({ owner: req.session.user._id });
  res.render('recipe/index.ejs',{recipe})
})



router.get('/:recipeId', async(req, res)=> {
  const recipe = await Recipe.findById(req.params.recipeId).populate('recipe');
  // const userRecipe = listing.favoritedByUsers.some((user) =>
  //   user.equals(req.session.user._id)
  // )
  res.render('recipe/show.ejs', { listing, userHasFavorited })
})

module.exports = router;