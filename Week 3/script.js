console.log('this is the')
const searchButton = document.querySelector(".search-btn");
const recipeSection = document.querySelector(".recipe-section");
console.log(searchButton);
async function fetchRecipes() {
    const url = 'https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2&apiKey=c35db270fff04266a1040cc9c23a1eb8';

    try {
        const response = await fetch(url,{
        method: 'GET',
        headers : {
        'X-API-Key': 'c35db270fff04266a1040cc9c23a1eb8',
        'Accept': 'application/json'
        }
        });
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const Datas = await response.json();
        console.log(Datas.results);
        return Datas.results;
    } catch (error) {
        console.log(error.message);

    }
}
fetchRecipes();
async function getResults(){
    const results = fetchRecipes();
    console.log(results);

  const recipes = results.map(result => {
    `<p class="title">${result.title}</p>`
    }).join('');
    recipeSection.innerHTML = recipes;
}
getResults()

