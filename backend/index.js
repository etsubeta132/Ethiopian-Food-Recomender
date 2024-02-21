const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const db = require('./startup/db');
const { exec } = require('child_process');
const multer=require('multer')
const fs=require('fs')
const path=require('path')


require('events').EventEmitter.defaultMaxListeners = 20;
require('./startup/logging');
require('./startup/routes')(app);
// require('./startup/db');

const PORT = 4000;



// file path for the uploaded files
const filePath='./uploads' 


const upload = multer({ dest: filePath });

app.post('/upload', upload.array('image', 50), (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    res.status(400).json({ error: 'No image files provided' });
    return;
  }
  const uploadedImages = [];

  files.forEach((file) => {
    if (!file.mimetype.startsWith('image')) {
      res.status(400).json({ error: 'One or more uploaded files is not an image' });
      return;
    }

    const imageExtension = file.originalname.split('.').pop();
    const imagePath = path.join(__dirname, '/uploads', `${file.filename}.${imageExtension}`);

    fs.rename(file.path, imagePath, (error) => {
      if (error) {
        console.log('Error occurred during file move', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      uploadedImages.push(`${file.filename}.${imageExtension}`);

      if (uploadedImages.length === files.length) {
        let ingredients = [];

        const results = [];
        exec('python3 ./predict.py', (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Internal Server Error');
          }

          const ingredientsStr = stdout.trim().split('\n').slice(-1);
          ingredients = JSON.parse(ingredientsStr[0].replace(/'/g, '"').slice(1, -1));
          console.log(ingredients);
          res.json({ message: 'Image files uploaded successfully', ingredient: ingredients });

          // / Delete the files inside the uploads diectory after the model predicts
          fs.readdir(filePath, (err, files) => {
            if (err) {
              console.error('Error reading folder:', err);
              return;
            }

            files.forEach((file) => {
              const imagePath = path.join(filePath, file);

              fs.unlink(imagePath, (err) => {
                if (err) {
                  console.error('Error deleting file:', err);
                } else {
                  console.log('File deleted:', imagePath);
                }
              });
            });
          })
        });

        
      }
    });
  });
});

app.post('/:id', (req, res) => {
    const recipeId = req.params.id; // Get the recipe ID from the URL
    
    const query = `
      SELECT id, name, ingredients, instructions, required_ingredients, image
      FROM recipes
      WHERE id = ?
    `;
    
    db.get(query, recipeId, (err, row) => {
      if (err) {
        console.error('Error querying recipe:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      
      if (!row) {
        return res.status(404).send('Recipe not found.');
      }
      
      const requiredIngredientsArray = JSON.parse(row.required_ingredients);
      
      const recipe = {
        id: recipeId,
        name: row.name,
        ingredients: row.ingredients,
        instructions: row.instructions,
        required_ingredients: requiredIngredientsArray,
        image: row.image
      };
      
      return res.json(recipe);
    });
  });
  
  app.post('',(req,res) =>{
    const ingredients = req.body.ingredients;

    const placeholders = ingredients.map(() => 'required_ingredients LIKE ?').join(' AND ');
      const query = `
        SELECT id, name, ingredients, instructions, required_ingredients, image
        FROM recipes
        WHERE ${placeholders}
      `;

      const ingredientValues = ingredients.map((ingredient) => `%${ingredient}%`);
            
    db.all(query, ingredientValues, (err, rows) => {

      console.log('Generated query:', query);
      console.log('placeholder',placeholders, '\n ingredients',ingredientValues, 'row', rows)
      if (err) {
        console.error('Error querying recipes:', err);
        return res.status(500).send('Internal Server Error');;
      }
      console.log('database searching!')

      if (rows.length === 0) {
        console.log('no rows selected from ')
      }
     const results = []
  
      rows.forEach((row) => {
        const requiredIngredientsArray = JSON.parse(row.required_ingredients);
        if (!checkHalfArrayElementsExist(requiredIngredientsArray, ingredients)) {
          console.log(requiredIngredientsArray, ingredientValues)
          return;
        }
  
        results.push({
          id: row.id,
          name: row.name,
          required_ingredients: requiredIngredientsArray,
          image: row.image,
          instructions: row.instructions,
          ingredients: row.ingredients,
          required_ingredients:row.required_ingredients
        });
      });
      
      console.log("result",results)
      // return res.json(results);  
      res.json(results)
    });
  })

  function checkHalfArrayElementsExist(arr1, arr2) {
    let count = 0;
    arr2.forEach((element) => {
        if (arr1.includes(element)) {
            count++;
        }
    });
    return count >= arr2.length / 2;
}





  
app.listen(PORT, () => console.log(`Connected to port ${PORT}`));

