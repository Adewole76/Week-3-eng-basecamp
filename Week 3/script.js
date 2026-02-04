const searchButton = document.querySelector(".search-btn");
const recipeSection = document.querySelector(".recipe-section");
const recipeNameInput = document.querySelector(".recipe-search");
const categoryFilter = document.querySelector(".category-dropdown");
console.log(categoryFilter.value);
console.log(searchButton);
let loadingState = false;
searchButton.addEventListener('click', function(){
    async function fetchRecipes() {
        loadingState = true;
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
            console.log(Datas.meals);
            return Datas.meals;
        } catch (error) {
            console.log(error.message);
    
        }
    }
    fetchRecipes();

    loadingState = false;
    async function getResults(){
        const results = await fetchRecipes();
        console.log(results);
    if(results && !loadingState){
      const filteredRecipeResults =results.filter((result) =>result.strCategory === categoryFilter.value )
      console.log(filteredRecipeResults);
     if(filteredRecipeResults.length > 0){
      const recipes = filteredRecipeResults.map(result => 
        `<div
        style ="
        background-image: url('${result.strMealThumb}');
        width: 100;
        background-position: center;
        background-size: cover;
        object-fit: contain;
        min-height: 100vh;
        "
        class="recipe-card">
        <h3 class="title">${result.strMeal}</h3>
        <p>Category:${result.strCategory}</p>
        </div>`
        
        ).join('');
        recipeSection.innerHTML = recipes;
    }else if(filteredRecipeResults.length === 0){
        console.log('no recipes found in try adjusting your filters')
    }
    }else if(!results && !loadingState){
        const nullMessage = 'No results for your search';
        recipeSection.innerHTML = nullMessage;
    }else if(loadingState){
        const loadingMessage = 'loading...';
        recipeSection.innerHTML = loadingMessage;
    }
}
    getResults();
    loadingState = false;
    console.log(loadingState);
    
})
const listAllitems = async function(){
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php'
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('request failed')
        }
        const DataSet = await response.json()
        console.log(DataSet.categories);
    } catch (error) {
        console.log(error.message)
    }
   
}
listAllitems()


