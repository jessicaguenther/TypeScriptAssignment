
import { disableDarkBackground, displayContent, enableDarkBackground } from "./display";
import { searchButton, randomButton, radioButtonCocktail, radioButtonIngredients, search, headingCocktailName, headingCocktailList, output, outputIngredients, outputInstructions, message, headingIngredients, headingInstructions, boxSelection, boxResult, exitButtonResult, exitButtonSelection, outputCocktailList } from "./variables";


let isCocktailSelected : boolean

searchButton.addEventListener("click", searchLogic);
randomButton.addEventListener("click", randomCocktail)
exitButtonSelection.addEventListener("click", exitPage);
exitButtonResult.addEventListener("click", exitPage);

function checkRadiobutton() : void {
  if (radioButtonCocktail.checked) {
    isCocktailSelected = true
  }
  else if (radioButtonIngredients.checked) {
    isCocktailSelected = false
  }
}

function exitPage() {
  boxResult.style.display = "none";
  boxSelection.style.display = "none";
  search.value = "";
  deleteList();
  disableDarkBackground();
  //headingCocktailName.style.display = "none";
  //document.location.reload()
}

function deleteList() {
  document.querySelectorAll(".ingredient").forEach(e => e.remove());
  document.querySelectorAll(".cocktail").forEach(e => e.remove());
}

function searchLogic() {
  checkRadiobutton();
  if (isCocktailSelected) {
    searchForCocktail();
  }
  else if (!isCocktailSelected) {
    searchForIngredient();
  }
}

function createOutputList(data:any) {
  for (let i = 0; i < data.drinks.length; i++) {
    output.innerText = data.drinks[i].strDrink;
   
    const listItem = outputCocktailList.appendChild(document.createElement("li")) as HTMLLIElement;
    const linkItem = listItem.appendChild(document.createElement("button")) as HTMLButtonElement;
    listItem.classList.add("cocktail");
    outputInstructions.style.display = "flex";

    linkItem.textContent = data.drinks[i].strDrink
    linkItem.addEventListener("click", function () {
      deleteList()
      clickOnCocktail(data.drinks[i].strDrink)
      
    })
  }
}

function searchForCocktail() {
    const cocktailName = search.value;
    
  
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
      .then(res => res.json())
      .then(data => {
        displayContent();
        createOutputList(data);
        enableDarkBackground();
      })
      .catch(() => {
        message.style.display = "block";
        message.textContent = "SORRY! CANNOT FIND COCKTAIL";
        search.value = "";
      })
  }

function clickOnCocktail(cocktailName: string) {
  console.log(cocktailName)
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
    .then(res => res.json())
    .then(data => {
      boxResult.style.display = "flex";
      boxSelection.style.display = "none";
      enableDarkBackground();
      console.log(data);
      output.innerText = data.drinks[0].strDrink;
      for (let i = 1; i < 15; i++) {
        if (data.drinks[0]["strIngredient" + i] != null) {
          const listItem = outputIngredients.appendChild(document.createElement("li")) as HTMLLIElement;
          listItem.classList.add("ingredient");
          listItem.textContent = data.drinks[0]["strIngredient" + i] + ": " + data.drinks[0]["strMeasure" + i];
          if (data.drinks[0]["strMeasure" + i] == null) {
            listItem.textContent = data.drinks[0]["strIngredient" + i];
          }
        }
        outputInstructions.innerText = data.drinks[0].strInstructions;
      }
    })
    .catch(() => {
      message.style.display = "block";
      message.textContent = "SORRY! CANNOT FIND COCKTAIL";
      search.value = "";
    })
}

function searchForIngredient() {
  const cocktailName = search.value;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${cocktailName}`)
    .then(res => res.json())
    .then(data => {
      displayContent();
      createOutputList(data);
      enableDarkBackground();
    })
    .catch(() => {
      message.style.display = "block";
      message.textContent = "SORRY! CANNOT FIND INGREDIENT";
      search.value = "";
    })
}

function randomCocktail() {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      boxResult.style.display = "flex";
      enableDarkBackground();
      clickOnCocktail(data.drinks[0].strDrink)
    })
}
