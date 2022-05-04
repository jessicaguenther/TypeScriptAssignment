import { checkRadiobutton, exitPage, isCocktailSelected, randomCocktail } from "./buttons";
import { disableDarkBackground, displayContent, displayResult, enableDarkBackground, errorStyle } from "./display";
import { clickOnCocktail, searchForCocktail, searchForIngredient } from "./search";
import { searchButton, randomButton, radioButtonCocktail, radioButtonIngredients, search, headingCocktailName, headingCocktailList, output, outputIngredients, outputInstructions, message, headingIngredients, headingInstructions, boxSelection, boxResult, exitButtonResult, exitButtonSelection, outputCocktailList } from "./variables";

searchButton.addEventListener("click", searchLogic);
randomButton.addEventListener("click", randomCocktail)
exitButtonSelection.addEventListener("click", exitPage);
exitButtonResult.addEventListener("click", exitPage);

//Löschen der Ergebnisse der vorigen Suche
export function deleteList() {
  document.querySelectorAll(".ingredient").forEach(e => e.remove());
  document.querySelectorAll(".cocktail").forEach(e => e.remove());
}

//Prüfen ob Radiobutton "Cocktail" oder "Ingredient" ausgewählt ist
//Wenn Radiobutton "Cocktail" ausgewählt Funktion searchForCocktail() wird ausgeführt
//Wenn Radiobutton "Ingredient" ausgewählt Funktion searchForIngredient() wird ausgeführt
function searchLogic() {
  checkRadiobutton();
  if (isCocktailSelected) {
    searchForCocktail();
  }
  else if (!isCocktailSelected) {
    searchForIngredient();
  }
}

//Erstellung der Cocktail Selection als Liste aus Buttons
export function createOutputList(data: any) {
  for (const drink of data.drinks) {
    output.innerText = drink.strDrink;

    const listItem = outputCocktailList.appendChild(document.createElement("li")) as HTMLLIElement;
    const linkItem = listItem.appendChild(document.createElement("button")) as HTMLButtonElement;
    listItem.classList.add("cocktail");
    outputInstructions.style.display = "flex";

    linkItem.textContent = drink.strDrink
    linkItem.addEventListener("click", function () {
      deleteList()
      clickOnCocktail(drink.strDrink)
    })
  }
}







