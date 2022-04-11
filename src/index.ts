const search = document.querySelector("#myInput") as HTMLInputElement;
const searchButton = document.querySelector("#searchButton") as HTMLButtonElement;
const cocktailName = search.value;

searchButton.addEventListener("click", searchForCocktail)

function searchForCocktail () {
  const cocktailName = search.value; 
  fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
  .then(res => res.json())
  .then(data => (){
    
  })
}





