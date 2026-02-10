'use strict'
const searchButton = document.querySelector(".search-btn");
const recipeSection = document.querySelector(".recipe-section");
const recipeNameInput = document.querySelector(".recipe-search");
const categoryFilter = document.querySelector(".category-dropdown");
const spinContainer = document.getElementById('spinnerContainer');
const userMessageUpdate = document.querySelector(".user-message-update");
const formValidation = document.querySelector("form-validation");
const bodyOverlay = document.querySelector(".overlay");
spinContainer.classList.add('hidden');
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
let favouriteRecipes;
const formerSavedRecipes = localStorage.getItem('favourite');
const parsedformerSavedRecipes = JSON.parse(formerSavedRecipes);
favouriteRecipes = parsedformerSavedRecipes;
console.log('page has been fully loaded');
searchButton.addEventListener('click', async function(){
    if(recipeNameInput){
    spinContainer.classList.remove('hidden')
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
    spinContainer.classList.add('hidden');
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
        <button class="recipe-details">view details</button>
        <button class="save-recipe">save</button>
        </div>`
        ).join('');
        recipeSection.insertAdjacentHTML('beforeend', recipes);
        const viewDetailsButton = document.querySelectorAll(".recipe-details");
        const saveRecipe = document.querySelectorAll(".save-recipe");
console.log(viewDetailsButton);
console.log(saveRecipe);
  // recipe modal 
     for(let i = 0; i <= viewDetailsButton.length; i++){
        viewDetailsButton[i].addEventListener('click',function(){
            viewDetailsButton[i].disabled = true;
            const modalDiv = document.createElement('div');
            const modalCloseButton = document.createElement('button');
            modalCloseButton.textContent = 'Close';
            modalDiv.style.zIndex = 106;
            modalDiv.innerHTML = `
             <p>${filteredRecipeResults[i].strMeal}</p>
             <ul>
            ${filteredRecipeResults[i].strIngredient1?`<li>${filteredRecipeResults[i].strIngredient1}</li>`:`<p style="display: none">no recipe</p>`}
            ${filteredRecipeResults[i].strIngredient2?`<li>${filteredRecipeResults[i].strIngredient2}</li>`:`<p style="display: none">no recipe</p>`}
            ${filteredRecipeResults[i].strIngredient3?`<li>${filteredRecipeResults[i].strIngredient3}</li>`:`<p style="display: none">no recipe</p>`}
            ${filteredRecipeResults[i].strIngredient4?`<li>${filteredRecipeResults[i].strIngredient4}</li>`:`<p style="display: none">no recipe</p>`}
            ${filteredRecipeResults[i].strIngredient5?`<li>${filteredRecipeResults[i].strIngredient5}</li>`:`<p style="display: none">no recipe</p>`}
            ${filteredRecipeResults[i].strIngredient6?`<li>${filteredRecipeResults[i].strIngredient6}</li>`:`<p style="display: none">no recipe</p>`}
            ${filteredRecipeResults[i].strIngredient7?`<li>${filteredRecipeResults[i].strIngredient7}</li>`:`<p style="display: none">no recipe</p>`}
            ${filteredRecipeResults[i].strIngredient8?`<li>${filteredRecipeResults[i].strIngredient8}</li>`:`<p style="display: none">no recipe</p>`}
            ${filteredRecipeResults[i].strIngredient9?`<li>${filteredRecipeResults[i].strIngredient9}</li>`:`<p style="display: none">no recipe</p>`}
            ${filteredRecipeResults[i].strIngredient10?`<li>${filteredRecipeResults[i].strIngredient10}</li>`:`<p style="display: none">no recipe</p>`}
            ${filteredRecipeResults[i].strIngredient11?`<li>${filteredRecipeResults[i].strIngredient11}</li>`:`<p style="display: none">no recipe</p>`}
            ${filteredRecipeResults[i].strIngredient12?`<li>${filteredRecipeResults[i].strIngredient12}</li>`:`<p style="display: none">no recipe</p>`}
            ${filteredRecipeResults[i].strIngredient13?`<li>${filteredRecipeResults[i].strIngredient13}</li>`:`<p style="display: none">no recipe</p>`}
            ${filteredRecipeResults[i].strIngredient14?`<li>${filteredRecipeResults[i].strIngredient14}</li>`:`<p style="display: none">no recipe</p>`}
            ${filteredRecipeResults[i].strIngredient15?`<li>${filteredRecipeResults[i].strIngredient15}</li>`:`<p style="display: none">no recipe</p>`}
            ${filteredRecipeResults[i].strIngredient16?`<li>${filteredRecipeResults[i].strIngredient16}</li>`:`<p style="display: none">no recipe</p>`}
            ${filteredRecipeResults[i].strIngredient17?`<li>${filteredRecipeResults[i].strIngredient17}</li>`:`<p style="display: none">no recipe</p>`}
            ${filteredRecipeResults[i].strIngredient18?`<li>${filteredRecipeResults[i].strIngredient18}</li>`:`<p style="display: none">no recipe</p>`}
            ${filteredRecipeResults[i].strIngredient19?`<li>${filteredRecipeResults[i].strIngredient19}</li>`:`<p style="display: none">no recipe</p>`}
            ${filteredRecipeResults[i].strIngredient20?`<li>${filteredRecipeResults[i].strIngredient20}</li>`:`<p style="display: none">no recipe</p>`}
             </ul>
             <p>${filteredRecipeResults[i].strInstructions}</p>
            `
            modalDiv.style.backgroundColor = 'white';
            modalDiv.style.position = 'fixed';
            modalDiv.style.top = '0'
            modalDiv.style.bottom = '0';
            modalDiv.style.left = '10%'
            modalDiv.style.right = '10%';
            // modalDiv.style.right = '0';
            // modalDiv.style.bottom = '0';
            modalDiv.appendChild(modalCloseButton);
            document.body.appendChild(modalDiv);
            bodyOverlay.classList.remove('hidden');
            modalCloseButton.addEventListener('click', function(){
                modalDiv.style.display = 'none';
                viewDetailsButton[i].disabled = false;
                bodyOverlay.classList.add('hidden');
                modalDiv.remove();
            })
        })
     }
     for(let i = 0;i<saveRecipe.length; i++){
        saveRecipe[i].addEventListener('click', function(){
          favouriteRecipes.push(filteredRecipeResults[i]);
            localStorage.setItem('favourite', JSON.stringify(favouriteRecipes));
        })     
     }
    
       

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

// list all recipe 
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

