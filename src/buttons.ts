import { disableDarkBackground, enableDarkBackground } from "./display";
import { deleteList } from "./index";
import { clickOnCocktail } from "./search";
import { boxResult, boxSelection, message, radioButtonCocktail, radioButtonIngredients, search } from "./variables";

export let isCocktailSelected: boolean

export function checkRadiobutton(): void {
    if (radioButtonCocktail.checked) {
        isCocktailSelected = true
    }
    else if (radioButtonIngredients.checked) {
        isCocktailSelected = false
    }
}

export function randomCocktail() {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            boxResult.style.display = "flex";
            enableDarkBackground();
            clickOnCocktail(data.drinks[0].strDrink)
        })
}

export function exitPage() {
    boxResult.style.display = "none";
    boxSelection.style.display = "none";
    search.value = "";
    deleteList();
    disableDarkBackground();
    message.style.display = "none";
}
