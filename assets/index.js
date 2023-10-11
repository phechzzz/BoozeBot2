let atHomeButton = document.getElementById('AT-HOME')
let atBarButton = document.getElementById('AT-BAR')

atHomeButton.addEventListener('click', function(){
    window.location.href = 'atHome.html'
})

atBarButton.addEventListener('click', function(){
    window.location.href = 'atBar.html'
})

var name = 'bloody mary';
var apiKeyNinja = 'sadkvCxD+O9QsMM0qn+klw==UuKcm3V674QaCQWo'; 
const apiKeyDb = "1"
const baseURL = `https://www.thecocktaildb.com/api/json/v2/${apiKeyDb}`;

var APINinjaurl = 'https://api.api-ninjas.com/v1/cocktail?name=' + encodeURIComponent(name);

fetch(APINinjaurl, {
    method: 'GET',
    headers: {
        'X-Api-Key': apiKeyNinja,
        'Content-Type': 'application/json'
    }
})
.then(function(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(function(result) {
    console.log(result);
})
.catch(function(error) {
    console.error('Error: ', error);
});


//CocktailDB test code
fetch(baseURL + "/random.php")
.then((response) => {
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }
    return response.json();
})
.then((data) => {
    // Extract a random drink from the response
    const randomDrink = data.drinks[0];
    if (randomDrink) {
      // Log the random drink details
    console.log('Random Drink:');
    console.log('Name:', randomDrink.strDrink);
    console.log('Category:', randomDrink.strCategory);
    console.log('Ingredients:');
    for (let i = 1; i <= 15; i++) {
        const ingredient = randomDrink['strIngredient' + i];
        const measure = randomDrink['strMeasure' + i];
        if (ingredient) {
        console.log(`${measure} ${ingredient}`);
        }
    }
    console.log('Instructions:', randomDrink.strInstructions);
    } else {
    console.log('No random drink found.');
    }
})
.catch((error) => {
    console.error('Error:', error);
});