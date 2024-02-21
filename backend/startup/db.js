const sqlite3 = require('sqlite3').verbose();

// Open the SQLite database
const db = new sqlite3.Database(
  'database/recipes.db',
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
    console.log('Successfully connected to SQLite');
  }
);

// Create table
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY,
        name TEXT UNIQUE,
        ingredients TEXT,
        instructions TEXT,
        required_ingredients TEXT,
        image BLOB
    )
`;

db.run(createTableQuery, (err) => {
  if (err) {
    console.error('Error creating recipe table:', err);
  } else {
    console.log('Recipe table created successfully');

    // Insert static data into the 'recipes' table

    // When inserting a recipe
    const insertQuery = `
    INSERT INTO recipes(name, ingredients, instructions, required_ingredients, image)
    VALUES (?, ?, ?, ?, ?)
    `;

    // Recipe 1
    const recipe1 = {
    name: 'Shiro wot',
    ingredients: `INGREDIENTS
    ½ cup oil
    2 medium onions pureed
    1 tomato pureed (Optional)
    4 cloves of garlic chopped (Optional)
    2 tablespoons niter kibbeh Ethiopian spiced clarified butter (Optional)
    2 to 2 ½ cups of water
    3 tablespoons berbere spice (Optional)
    1 teaspoon garlic powder (Optional)
    Salt to taste
    1 jalepeno chopped (optional)`,
    instructions: `1. Bring a heavy bottom stockpot to medium heat. 
    2. Add pureed onions to the dry pan, and saute until they become dry and start to take on color- about 4-5 minutes. 
    3. Add the oil and berbere spice. Saute for 1-2 minutes until fragrant.
    4. Next add tomato and chopped garlic. Saute for 2-3 minutes more.
    5. Now start whisking in about half of the chickpea flour. Gradually start to add about 1 cup of water. Whisk in the remaining chickpea flour and an additional 1 cup of water. Whisk until mixture is very smooth. Add remaining ½ cup of water if you prefer your shiro a little thinner.
    6. Heat until the shiro begins to pop (simmer). Then add the niter kibbeh, garlic powder, and salt to taste, stirring until combined.
    7. Simmer for about 5-10 minutes over low heat until the flavors combine and the oil separates slightly from the shiro.
    8. Garnish with jalepeno, if desired.
    9. Serve with fresh injera.`,
    required_ingredients: JSON.stringify(['shiro',"oil","onion","salt"]),
    image: '/home/etsub/Desktop/Food recommender/backend/images/shiro.png'
    };

     

      const recipe3 = {
        name: 'Doro wot',
        ingredients: `INGREDIENTS
        2 lbs chicken (cut into pieces)
        4 large red onions (finely chopped)
        4 cloves garlic (minced)
        1-inch ginger (minced)
        1 cup berbere spice (Ethiopian spice blend)
        1/4 cup niter kibbeh (Ethiopian spiced clarified butter), or substitute regular butter
        1/4 cup vegetable oil
        1 cup chicken stock
        4 hard-boiled eggs (optional)
        Salt to taste
        Water`,
        instructions: `1. Marinate the chicken: Mix chicken pieces with salt and berbere spice, let it marinate for 30 minutes.
        2. Prepare the onions: Caramelize finely chopped onions in niter kibbeh and vegetable oil until golden brown.
        3. Add aromatics: Stir in minced garlic and ginger, cook until fragrant.
        4. Incorporate berbere spice: Add remaining berbere spice, cook until fragrant and well combined.
        5. Add chicken: Coat chicken with spice mixture, cook for 10 minutes.
        6. Pour in chicken stock: Add enough chicken stock to cover the chicken, bring to a simmer.
        7. Simmer: Cover and simmer for 45 minutes to 1 hour until chicken is tender.
        8. Add hard-boiled eggs (optional): Add to the stew during the last 15 minutes of cooking.
        9. Adjust seasoning: Taste and add salt if needed.`,
        required_ingredients: JSON.stringify(["chicken", "onion", "berbere", "oil", "salt"]),
        image: '/home/etsub/Desktop/Food recommender/backend/images/doro.jpeg'
        };

        const recipe4 = {
          name: 'Miser wot',
          ingredients: `INGREDIENTS
          2 cups red lentils
          1 large onion, finely chopped
          3 cloves garlic, minced
          1-inch piece of ginger, minced
          2 tablespoons berbere spice blend
          1 tablespoon tomato paste
          4 cups vegetable broth or water
          Salt to taste
          2 tablespoons oil (olive or vegetable oil)`,
          instructions: `1. Rinse the red lentils under cold water until the water runs clear. Drain and set aside.
          2.Heat the oil in a large pot over medium heat.
          3. Add the chopped onion to the pot and sauté until translucent, about 5 minutes.
          4. Stir in the minced garlic and ginger, and cook for another 2 minutes until fragrant.
          5. Add the berbere spice blend and tomato paste to the pot, stirring well to combine with the onion mixture. Cook for an additional 2 minutes to toast the spices.
          6. Pour in the vegetable broth or water and stir to combine. Bring the mixture to a simmer.
          7. Add the rinsed red lentils to the pot, stirring well to incorporate with the broth and spices.
          8. Reduce the heat to low, cover the pot, and let the lentils simmer for about 25-30 minutes, or until they are tender and the stew has thickened. Stir occasionally to prevent sticking.
          9. Taste the Misir Wot and adjust the seasoning with salt according to your preference.
          10. Once the lentils are cooked through and the stew has reached your desired consistency, remove the pot from the heat.
          11. Serve the Misir Wot hot with injera bread or rice.`,
          required_ingredients: JSON.stringify(["lentils", "onion", "berbere", "oil", "salt"]),
          image: '/home/etsub/Desktop/Food recommender/backend/images/misir.jpeg'
          };

          const recipe5 = {
            name: 'Tibs',
            ingredients: `INGREDIENTS
            1 lb beef, lamb, or goat meat, thinly sliced
            2 onions, finely chopped
            3-4 cloves garlic, minced
            2 tomatoes, diced
            2 green chili peppers, chopped (adjust to taste)
            2 tablespoons clarified butter (niter kibbeh) or vegetable oil
            1 tablespoon berbere spice blend (adjust to taste)
            1 teaspoon ground cumin
            1 teaspoon ground coriander
            Salt to taste
            Freshly ground black pepper to taste
            Fresh cilantro or parsley for garnish (optional)`,
            instructions: `1. Thinly slice 1 lb of beef, lamb, or goat meat against the grain.
            2. Season the meat with salt and pepper to taste.
            3. Finely chop 2 onions and mince 3-4 cloves of garlic.
            4. Dice 2 tomatoes and chop 2 green chili peppers.
            5. Heat 2 tablespoons of clarified butter or vegetable oil in a large skillet over medium heat.
            6. Add the chopped onions and minced garlic to the skillet, sauté until softened, about 5-7 minutes.
            7. Stir in 1 tablespoon of berbere spice blend, 1 teaspoon of ground cumin, and 1 teaspoon of ground coriander. Cook for an additional 2-3 minutes.
            8. Add the seasoned meat to the skillet and cook until browned and cooked to desired doneness.
            9. Incorporate the diced tomatoes and chopped green chili peppers into the skillet, cook for 5-7 minutes until tomatoes soften.`,
            required_ingredients: JSON.stringify(["meat", "onion", "berbere", "oil", "salt"]),
            image: '/home/etsub/Desktop/Food recommender/backend/images/tibs.jpeg'
            };

            

          const recipe6 = {
            name: 'Enkulal Firfir ',
            ingredients: `INGREDIENTS
            2 eggs
            3 tbsp tomato, finely chopped
            3 tbsp onions, finely chopped
            3 tbsp jalapeño pepper, finely chopped
            ¼ tbsp cardamom
            1 tbsp niter kibbeh (Ethiopian clarified butter)`,
            instructions: `1. Start by melting the niter kibbeh in a skillet. Then add the finely onions, and jalapeño peppers into the skillet and cook them for a few minutes, until they start getting soft.
            2. In the end, add the 2 eggs into the skillet. You do not need to scramble the eggs. Just add them to the mix and stir up the mixture some more.
            3. When it is done, serve the Enkulal Firfir with injera and enjoy!`,
            required_ingredients: JSON.stringify(["egg", "onion", "oil", "salt"]),
            image: '/home/etsub/Desktop/Food recommender/backend/images/enkulalfirfir.jpeg'
            };


            // Recipe 1
     const recipe2 = {
      name: 'Firfir(ፍርፍር)',
      ingredients: `INGREDIENTS
      4-5 pieces of injera (day-old preferred)
      1 large onion, finely chopped
      2 tomatoes, chopped
      2-3 cloves of garlic, minced
      1-2 green chili peppers, finely chopped (optional, for heat)
      2 tablespoons of niter kibbeh (spiced clarified butter) or regular butter
      1 teaspoon berbere spice (adjust to taste)
      Salt to taste
      Chopped fresh cilantro or parsley for garnish`,
      instructions: `1. Tear the injera into small pieces or shreds. If the injera is fresh, leave it out for a few hours to dry slightly, or use day-old injera for the best texture.
      2. Heat the niter kibbeh or butter in a large skillet over medium heat.
      3. Add the chopped onions and sauté until soft and translucent, about 5-7 minutes.
      4. Stir in the minced garlic and green chili peppers (if using) and cook for another 1-2 minutes until fragrant.
      5. Add the chopped tomatoes to the skillet and cook until they begin to soften, about 3-4 minutes.
      6. Sprinkle the berbere spice over the mixture and stir well to combine. Adjust the amount of berbere spice according to your preferred level of spiciness.
      7. Add the shredded injera to the skillet, tossing gently to combine with the onion, tomato, and spice mixture.
      8. Allow the injera to soak up the flavors and soften slightly, stirring occasionally, for about 5-7 minutes.
      9. Taste the firfir and adjust the seasoning with salt if needed. Add more berbere spice for extra heat if desired.
      10. Garnish the Ethiopian firfir with chopped fresh cilantro or parsley before serving.
      11. Ethiopian firfir is traditionally served warm as a breakfast dish but can also be enjoyed as a hearty snack or side dish.
      12. Customize your Ethiopian firfir by adding cooked vegetables like carrots, potatoes, or greens, or protein such as cooked chicken or beef.
      13. Store any leftovers in an airtight container in the refrigerator for up to 2 days. Reheat gently before serving.`,
      required_ingredients: JSON.stringify(['injera', 'onion', 'salt', 'oil']),
      image: '/home/etsub/Desktop/Food recommender/backend/images/firfir.jpeg'
      };

            const recipe7 = {
              name: 'Gomen',
              ingredients: `INGREDIENTS
              1 bunch of collard greens
              1 large onion, finely chopped
              3 cloves of garlic, minced
              2 tomatoes, diced
              2 tablespoons of olive oil
              1 teaspoon of turmeric
              1 teaspoon of cumin
              1 teaspoon of paprika
              Salt and pepper to taste
              1 cup of vegetable broth or water`,
              instructions: `1. Wash the collard greens thoroughly under cold water. Remove tough stems, slice leaves thinly.
              2. Heat olive oil in a large skillet over medium heat. Saute chopped onion and minced garlic until translucent and fragrant.
              3. Stir in turmeric, cumin, paprika, salt, and pepper. Cook for 1-2 minutes.
              4. Add sliced collard greens to the skillet, coating them in the spices. Pour in vegetable broth or water. Cover and cook until tender, stirring occasionally (10-15 minutes).
              5. Add diced tomatoes to the skillet. Cook for 2-3 minutes until softened.
              6. Taste and adjust seasoning if needed. Remove from heat and transfer to a serving dish.`,
              required_ingredients: JSON.stringify(["blackCabbage", "onion", "oil", "salt"]),
              image: '/home/etsub/Desktop/Food recommender/backend/images/gomen.jpeg'
              };

            const recipe8 = {
              name: 'Kinche ',
              ingredients: `INGREDIENTS
              2 cups bulgurWheat
              1/4 teaspoon salt
              1 1/2 cups water
              2 tablespoons olive oil or melted butter`,
              instructions: `1. add water and bulgerWheat and wait for it to cooked
              2. Add butter and wait put it out
              3, wait 10-20 minutes to rest`,
              required_ingredients: JSON.stringify(["bulgurWheat", "butter", "oil", "salt", "water"]),
              image: '/home/etsub/Desktop/Food recommender/backend/images/bulgurWheat.png'
              };

              const recipe9 = {
                name: 'Key Sir Alicha',
                ingredients: `INGREDIENTS
                ¼ cup canola oil
                1 medium yellow onion, diced
                1 pinch salt
                1 ½ teaspoons minced fresh garlic
                1 ½ teaspoons minced fresh ginger (Optional)
                2 large beets, diced
                1 cup water
                ½ teaspoon salt
                4 large potatoes, diced`,
                instructions: `1. Start by melting the niter kibbeh in a skillet. Then add the finely chopped tomatoes, onions, and jalapeño peppers into the skillet and cook them for a few minutes, until they start getting soft.
                2. Add berbere to the mix and stir. Let the mixture heat up for 1 or 2 min.
                3. In the end, add the 2 eggs into the skillet. You do not need to scramble the eggs. Just add them to the mix and stir up the mixture some more.
                4. When it is done, serve the Enkulal Firfir with injera and enjoy!`,
                required_ingredients: JSON.stringify(["redRoot", "onion", "oil", "salt"]),
                image: '/home/etsub/Desktop/Food recommender/backend/images/keysir.png'
                };
                
  // Rest of the code remains unchanged
// 
  // db.run(
  //   insertQuery,
  //   [
  //     recipe1.name,
  //     recipe1.ingredients,
  //     recipe1.instructions,
  //     JSON.stringify(recipe1.required_ingredients),
  //     recipe1.image
  //   ],
  //   (err) => {
  //     if (err) {
  //       console.error('Error inserting recipe:', err);
  //     } else {
  //       console.log('Recipe inserted successfully');
  //     }

  //   }
  // );

  // db.run(
  //   insertQuery,
  //   [
  //     recipe2.name,
  //     recipe2.ingredients,
  //     recipe2.instructions,
  //     JSON.stringify(recipe2.required_ingredients),
  //     recipe2.image
  //   ],
  //   (err) => {
  //     if (err) {
  //       console.error('Error inserting recipe:', err);
  //     } else {
  //       console.log('Recipe inserted successfully');
  //     }

  //   }
  // );

  // db.run(
  //   insertQuery,
  //   [
  //     recipe3.name,
  //     recipe3.ingredients,
  //     recipe3.instructions,
  //     JSON.stringify(recipe3.required_ingredients),
  //     recipe3.image
  //   ],
  //   (err) => {
  //     if (err) {
  //       console.error('Error inserting recipe:', err);
  //     } else {
  //       console.log('Recipe inserted successfully');
  //     }

  //   }
  // );

  // db.run(
  //   insertQuery,
  //   [
  //     recipe4.name,
  //     recipe4.ingredients,
  //     recipe4.instructions,
  //     JSON.stringify(recipe4.required_ingredients),
  //     recipe4.image
  //   ],
  //   (err) => {
  //     if (err) {
  //       console.error('Error inserting recipe:', err);
  //     } else {
  //       console.log('Recipe inserted successfully');
  //     }

  //   }
  // );

  // db.run(
  //   insertQuery,
  //   [
  //     recipe5.name,
  //     recipe5.ingredients,
  //     recipe5.instructions,
  //     JSON.stringify(recipe5.required_ingredients),
  //     recipe5.image
  //   ],
  //   (err) => {
  //     if (err) {
  //       console.error('Error inserting recipe:', err);
  //     } else {
  //       console.log('Recipe inserted successfully');
  //     }

  //   }
  // );

  // db.run(
  //   insertQuery,
  //   [
  //     recipe6.name,
  //     recipe6.ingredients,
  //     recipe6.instructions,
  //     JSON.stringify(recipe6.required_ingredients),
  //     recipe6.image
  //   ],
  //   (err) => {
  //     if (err) {
  //       console.error('Error inserting recipe:', err);
  //     } else {
  //       console.log('Recipe inserted successfully');
  //     }

  //   }
  // );

  // db.run(
  //   insertQuery,
  //   [
  //     recipe7.name,
  //     recipe7.ingredients,
  //     recipe7.instructions,
  //     JSON.stringify(recipe7.required_ingredients),
  //     recipe7.image
  //   ],
  //   (err) => {
  //     if (err) {
  //       console.error('Error inserting recipe:', err);
  //     } else {
  //       console.log('Recipe inserted successfully');
  //     }

  //   }
  // );

  // db.run(
  //   insertQuery,
  //   [
  //     recipe8.name,
  //     recipe8.ingredients,
  //     recipe8.instructions,
  //     JSON.stringify(recipe8.required_ingredients),
  //     recipe8.image
  //   ],
  //   (err) => {
  //     if (err) {
  //       console.error('Error inserting recipe:', err);
  //     } else {
  //       console.log('Recipe inserted successfully');
  //     }

  //   }
  // );

  // db.run(
  //   insertQuery,
  //   [
  //     recipe9.name,
  //     recipe9.ingredients,
  //     recipe9.instructions,
  //     JSON.stringify(recipe9.required_ingredients),
  //     recipe9.image
  //   ],
  //   (err) => {
  //     if (err) {
  //       console.error('Error inserting recipe:', err);
  //     } else {
  //       console.log('Recipe inserted successfully');
  //     }

  //   }
  // );
}
});

module.exports = db;