// // controllers/recipes.js

const express = require('express');
const router = express.Router();

const User = require('../model/user.js');
const Recipe = require('../model/recipe.js');
const Ingredient = require('../model/ingredients.js');

// // Routes/ API's/ Core Functionality
// router.get('/', async (req, res) => {
//   const recipes = await Recipe.find().populate('owner')
//   res.render('recipes/index.ejs',{recipes})
// })

// router.get('/new', async (req, res) => {
//   res.render('recipes/new.ejs')
// })

// router.post('/', async (req, res) => {
//   req.body.owner = req.session.user._id;
//   await Recipe.create(req.body);
//   res.redirect('/recipes');
// });

// router.get('/new', async (req, res) => {
//   const ingredient = await Ingredient.find()
//   res.render('recipes/new.ejs',{ingredient})
// })

//some























// router.delete('/:recipeId', async (req,res) => {
//   const recipe = await Recipe.findById(req.params.recipeId)
//   if (recipe.owner.equals(req.session.user._id)) {
//     await recipe.deleteOne();
//     res.redirect('/recipes');
//   } else {
//     res.send("You don't have permission to do that.");
//   } 
// })

// router.get('/:recipeId/edit', async (req,res) => {
//   const recipe = await Recipe.findById(req.params.recipeId)
//   res.render('recipes/edit.ejs',{recipe})
// })

// router.put('/:recipeId', async (req,res) => {
//   const recipe= await Recipe.findById(req.params.recipeId);
//     if (recipe.owner.equals(req.session.user._id)) {
//       await recipe.updateOne(req.body);
//       res.redirect('/recipes');
//     } else {
//       res.send("You don't have permission to do that.");
//     }
// })

//exports
// module.exports= router;

router.get('/', async (req, res) => {
  const recipes = await Recipe.find().populate('owner')
  res.render('recipes/index.ejs',{recipes})
})

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
    await newRecipe.save()
    res.redirect('/recipes')
    
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
});

router.post('/', async (req, res) => {
  req.body.owner = req.session.user._id;
  await Recipe.create(req.body);
  res.render('/recipes/index.ejs');
});

router.get('/:recipeId', async(req, res)=> {
  const recipe = await Recipe.findById(req.params.recipeId).populate('owner');
  
  res.render('recipes/show.ejs', { recipe })
})




router.delete('/:recipeId', async (req,res) => {
  const recipe = await Recipe.findById(req.params.recipeId)
  if (recipe.owner.equals(req.session.user._id)) {
    await recipe.deleteOne();
    res.redirect('/recipes');
  } else {
    res.send("You don't have permission to do that.");
  } 
})

router.get('/:recipeId/edit', async (req,res) => {
  const recipe = await Recipe.findById(req.params.recipeId)
  res.render('recipes/edit.ejs',{recipe})
})

router.put('/:recipeId', async (req,res) => {
  const recipe= await Recipe.findById(req.params.recipeId);
    if (recipe.owner.equals(req.session.user._id)) {
      await recipe.updateOne(req.body);
      res.redirect('/recipes');
    } else {
      res.send("You don't have permission to do that.");
    }
})

module.exports= router;

// router.get('/', async (req, res) => {
//   const recipes = await Recipe.find({ owner: req.session.user._id });
//   res.render('recipe/index.ejs',{recipes})
// })

// router.get('/new', async (req, res) => {
//   try {
//     const recipes = await Recipe.find({ owner: req.session.user._id });
//     res.render('recipes/index', { recipes });
//   } catch (error) {
//     console.log(error);
//     res.redirect('/');
//   }
// });

// router.get('/', async (req,res) => {
//   const populatedListings = await Recipe.find({}).populate('owner');
//   console.log('Populated Recipes:', populatedRecipes);
//   res.render('recipes/index.ejs')
// })

// router.get('/', async (req,res) => {
//   const recipes = await Recipe.find({}).populate('owner');
//   res.render('recipes/index.ejs', {recipes: recipes})
// })


