import { checkRadiobutton, exitPage, isCocktailSelected, randomCocktail} from "./buttons";
import { displayResult, enableDarkBackground } from "./display";
import { searchForCocktail, searchForIngredient } from "./search";
import { searchButton, randomButton, search, output, outputIngredients, outputInstructions, message, exitButtonResult, exitButtonSelection, outputCocktailList} from "./variables";

searchButton.addEventListener("click", searchLogic);
randomButton.addEventListener("click", randomCocktail)
exitButtonSelection.addEventListener("click", exitPage);
exitButtonResult.addEventListener("click", exitPage);

//Searchbutton durch "Enter" drücken ausführen
document.addEventListener("keydown", (event) => {
  if(event.key === "Enter") {
    searchLogic()
  }
})

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

export function clickOnCocktail(cocktailName: string) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
      .then(res => res.json())
      .then(data => {
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






