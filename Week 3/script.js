const searchButton = document.querySelector(".search-btn");
const recipeSection = document.querySelector(".recipe-section");
const recipeNameInput = document.querySelector(".recipe-search");
console.log(searchButton);
async function fetchRecipes() {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeNameInput.value}`;

    try {
        const response = await fetch(url,{
        method: 'GET',
        headers : {
        'Accept': 'application/json'
        }
        });
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const Datas = await response.json();
        //console.log(Datas.meals);
        return Datas.meals;
    } catch (error) {
        console.log(error.message);

    }
}
searchButton.addEventListener('click', fetchRecipes)
//fetchRecipes();
async function getResults(){
    const results = await fetchRecipes();
    //console.log(results);

  const recipes = results.map(result => 
    `<p class="title">${result.strMeal}</p>`
    ).join('');
    recipeSection.innerHTML = recipes;
}
getResults();

