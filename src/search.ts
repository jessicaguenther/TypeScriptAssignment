import { displayContent, displayResult, enableDarkBackground, errorStyle } from "./display";
import { createOutputList } from "./index";
import { boxSelection, message, output, outputIngredients, outputInstructions, search } from "./variables";


export function searchForIngredient() {
    const cocktailName = search.value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${cocktailName}`)
      .then(res => res.json())
      .then(data => {
        displayContent();
        createOutputList(data);
        enableDarkBackground();
      })
      .catch(() => {
        errorStyle();
        message.textContent = "SORRY! CANNOT FIND INGREDIENT";
      })
  }

  export function searchForCocktail() {
    const cocktailName = search.value;
    console.log(cocktailName)
    if (cocktailName === ""){
        errorStyle();
        message.textContent = "PLEASE ENTER COCKTAIL NAME";
        return;
    }
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
      .then(res => res.json())
      .then(data => {
        displayContent();
        createOutputList(data);
        enableDarkBackground();
      })
      .catch(() => {
        boxSelection.style.display = "none";
        errorStyle();
        message.textContent = "SORRY! CANNOT FIND COCKTAIL";
      })
  }

  export function clickOnCocktail(cocktailName: string) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
      .then(res => res.json())
      .then(data => {
        console.log()
        displayResult();
        enableDarkBackground();
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