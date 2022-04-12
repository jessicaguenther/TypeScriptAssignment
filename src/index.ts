const search = document.querySelector("#myInput") as HTMLInputElement;
const searchButton = document.querySelector("#searchButton") as HTMLButtonElement;
const exitButton = document.querySelector("#exitButton") as HTMLButtonElement;
const cocktailName = search.value;
const output = document.querySelector(".outputName") as HTMLParagraphElement;
const outputInstructions = document.querySelector(".outputInstructions") as HTMLParagraphElement;
const outputIngredients = document.querySelector(".ingredients") as HTMLUListElement;
const background = document.querySelector(".background") as HTMLDivElement;
const message = document.querySelector(".errorMessage") as HTMLParagraphElement;

searchButton.addEventListener("click", searchForCocktail)
exitButton.addEventListener("click", exitPage)

function exitPage() {
  background.style.display = "none"
  search.value = ""
  deleteList()
}

function deleteList(){
  document.querySelectorAll(".ingredient").forEach(e => e.remove())
}

function searchForCocktail() {
  const cocktailName = search.value;


  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
    .then(res => res.json())
    .then(data => {
      background.style.display = "flex"
      console.log(data)
      output.innerText = data.drinks[0].strDrink
      for (let i = 1; i < 15; i++) {
        if (data.drinks[0]["strIngredient" + i] != null) {
          const listItem = outputIngredients.appendChild(document.createElement("li")) as HTMLLIElement;
          listItem.classList.add("ingredient")
          listItem.textContent = data.drinks[0]["strIngredient" + i] + ": " + data.drinks[0]["strMeasure" + i]
        if (data.drinks[0]["strMeasure" + i] == null) {
          listItem.textContent = data.drinks[0]["strIngredient" + i]
        }
        }
      
      outputInstructions.innerText = data.drinks[0].strInstructions  
      }
      
    })
    .catch(() =>{
      background.style.display = "none"
      message.style.display = "block"
      message.textContent = "SORRY! CANNOT FIND COCKTAIL"
      search.value = ""
      
    })
    
}
