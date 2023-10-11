const apiKeyDb = "1"
const modal = document.getElementById('myModal');
const favoriteDrinksButton = document.getElementById('favorite-drinks');
const favoritesList = document.getElementById('favorites-list');
const closeModalBtn = document.getElementById('closeModalBtn');
let favoriteDrinkObjects = []

    // Save a drink as a favorite
    function saveDrinkAsFavorite(nameContent, ingredientsList) {
      // Get the existing favorite drinks from local storage or initialize an empty array
      let favoriteDrinks = JSON.parse(localStorage.getItem('favoriteDrinks')) || [];
    
      // Create a new favorite drink object
      const drinkObject = {
        name: nameContent,
        ingredients: ingredientsList,
      };
    
      // Add the new favorite drink to the array
      favoriteDrinks.push(drinkObject);
    
      // Save the updated array of favorite drinks back to local storage
      localStorage.setItem('favoriteDrinks', JSON.stringify(favoriteDrinks));
    }
    
    // Function to render results
    function renderResults(cocktails) {
      const displayedDrinkContainer = document.getElementById('display-drink');
      displayedDrinkContainer.innerHTML = '';
    
      cocktails.forEach(function (cocktail) {
        const nameContent = cocktail.name;
        const ingredients = cocktail.ingredients; 
    
        const cocktailContainer = document.createElement('div');
        cocktailContainer.classList.add('cocktail');
    
        const nameEl = document.createElement('h2');
        nameEl.textContent = nameContent;
    
        cocktailContainer.appendChild(nameEl);
    
        // Create an unordered list for ingredients
        const ingredientsList = document.createElement('ul');
    
        // Loop through ingredients array and add them to the list
        ingredients.forEach(function (ingredientObj) {
          const ingredientItem = document.createElement('li');
          ingredientItem.textContent = `${ingredientObj.measure} ${ingredientObj.ingredient}`;
          ingredientsList.appendChild(ingredientItem);
        });
    
        cocktailContainer.appendChild(ingredientsList);
    
        const favoriteButton = document.createElement('button');
        favoriteButton.classList.add('favorite-button');
        favoriteButton.textContent = 'Add to Favorites';
    
        favoriteButton.addEventListener('click', function () {
          saveDrinkAsFavorite(nameContent, ingredients);
        });
    
        cocktailContainer.appendChild(favoriteButton);
        displayedDrinkContainer.appendChild(cocktailContainer);
      });
    }

    // Function to fetch random cocktails by alcohol choice
    function fetchRandomCocktailByAlcohol(alcoholChoice) {
      const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${alcoholChoice}`;
    
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const cocktails = data.drinks;
    
          if (cocktails && cocktails.length > 0) {
            const randomIndex = Math.floor(Math.random() * cocktails.length);
            const randomCocktailID = cocktails[randomIndex].idDrink;
            const cocktailDetailsUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomCocktailID}`;
    
            return fetch(cocktailDetailsUrl);
          } else {
            console.log(`No cocktails found containing ${alcoholChoice}`);
            throw new Error('No cocktails found');
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(cocktailData => {
          const cocktail = cocktailData.drinks[0];
          console.log('Random Cocktail:', cocktail);
    
          const ingredients = [];
          for (let i = 1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}`];
            const measure = cocktail[`strMeasure${i}`];
            if (ingredient && measure) {
              ingredients.push({ ingredient, measure });
            }
          }
    
          const drink = {
            name: cocktail.strDrink,
            instructions: cocktail.strInstructions,
            ingredients,
          };
    
          renderResults([drink]);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    //Click event listeners for all the alcohol choice buttons
    const vodkaButton = document.getElementById('button1');
    const whiskeyButton = document.getElementById('button2');
    const ginButton = document.getElementById('button3');
    const tequilaButton = document.getElementById('button4');
    const rumButton = document.getElementById('button5');
    const brandyButton = document.getElementById('button6');
    const vermouthButton = document.getElementById('button7');
    const cognacButton = document.getElementById('button8');

    vodkaButton.addEventListener('click', function () {
      fetchRandomCocktailByAlcohol('vodka');
    });
    
    whiskeyButton.addEventListener('click', function () {
      fetchRandomCocktailByAlcohol('whiskey');
    });
    
    ginButton.addEventListener('click', function () {
      fetchRandomCocktailByAlcohol('gin');
    });
    
    tequilaButton.addEventListener('click', function () {
      fetchRandomCocktailByAlcohol('tequila');
    });
    
    rumButton.addEventListener('click', function () {
      fetchRandomCocktailByAlcohol('rum');
    });
    
    brandyButton.addEventListener('click', function () {
      fetchRandomCocktailByAlcohol('brandy');
    });
    
    vermouthButton.addEventListener('click', function () {
      fetchRandomCocktailByAlcohol('vermouth');
    });
    
    cognacButton.addEventListener('click', function () {
      fetchRandomCocktailByAlcohol('cognac');
    });

    function renderFavoriteDrinks() {
      let favoriteDrinkObjects = JSON.parse(localStorage.getItem('favoriteDrinks')) || [];
      favoritesList.innerHTML = ''; 
    
      favoriteDrinkObjects.forEach(function (drinkObject) {
        const listItem = document.createElement('h2');
        listItem.textContent = drinkObject.name;
        listItem.style.color = 'black';
        favoritesList.appendChild(listItem);
      });
    
      modal.style.display = 'block';
    }
    
    closeModalBtn.addEventListener('click', function () {
      modal.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
      if (e.target == modal) {
        modal.style.display = 'none';
      }
    });
    
    // Event listener for the "Favorite Drinks" button
    favoriteDrinksButton.addEventListener('click', renderFavoriteDrinks);
  
    
  