import { displayContent, enableDarkBackground, errorStyle } from "./display";
import { createOutputList } from "./index";
import { boxSelection, message, search } from "./variables";

//Funktion Suche nach Cocktailnamen
export function searchForIngredient() {
    const ingredientName = search.value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`)
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

//Funktion Suche nach Ingredients
export function searchForCocktail() {
    const cocktailName = search.value;
    if (cocktailName === "") {
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

