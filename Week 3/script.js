'use strict'
const searchButton = document.querySelector(".search-btn");
const recipeSection = document.querySelector(".recipe-section");
const recipeNameInput = document.querySelector(".recipe-search");
const categoryFilter = document.querySelector(".category-dropdown");
const spinContainer = document.getElementById('spinnerContainer');
const userMessageUpdate = document.querySelector(".user-message-update");
const formValidation = document.querySelector("form-validation");

console.log(userMessageUpdate);
 const spinner = new Spinner({
   lines: 12,        // Number of lines
   length: 20,       // Length of each line
   width: 10,        // Line thickness
   radius: 30,       // Radius of the spinner
   color: ' rgb(255, 77, 0)',    // Color
   speed: 1,  
   trail: 60
});
console.log(typeof spinner);
console.log(categoryFilter.value);
console.log(searchButton);
searchButton.addEventListener('click', async function(){
    if(recipeNameInput){
    spinner.spin(spinContainer);
    recipeSection.innerHTML ="";
    userMessageUpdate.classList.add('hidden');
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
            console.log(Datas.meals);
            return Datas.meals;
        } catch (error) {
            console.log(error.message);
    
        }
        
    }
    await fetchRecipes();
    spinner.stop(spinContainer);
    async function getResults(){
        const results = await fetchRecipes();
        console.log(results);
    if(results){
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
        console.log('no recipes found in try adjusting your filters');
        userMessageUpdate.classList.remove('hidden') ;
        userMessageUpdate.textContent = 'No recipes found try adjusting your filters';
        recipeSection.innerHTML ="";
    }
    }else if(!results){
        userMessageUpdate.classList.remove('hidden') ;
        userMessageUpdate.textContent = 'No recipes found try adjusting your filters';
        recipeSection.innerHTML ="";
    }
}
    getResults();
}else if(!recipeNameInput){
      formValidation.textContent = `you haven't entered the recipe namae`;
    }
    
    
    
    
})
const listAllitems = async function(){
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
   
    try {
        const response = await fetch(url,
            {method: 'GET',
        }
            );
        if(!response.ok){
            throw new Error('request failed')
        }
        const DataSet = await response.json()
        console.log(DataSet.meals);
    } catch (error) {
        console.log(error.message)
    }
   
}
listAllitems()


