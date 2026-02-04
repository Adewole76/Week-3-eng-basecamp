const searchButton = document.querySelector(".search-btn");
const recipeSection = document.querySelector(".recipe-section");
const recipeNameInput = document.querySelector(".recipe-search");
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
      const recipes = results.map(result => 
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


