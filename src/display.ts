import { background, output, headingCocktailName, headingIngredients, headingInstructions, outputInstructions, boxResult, boxSelection, blackBackground, search, message } from "./variables";

export function displayContent() {
    boxSelection.style.display = "flex";
    boxResult.style.display = "none";
}

export function displayResult(){
    boxResult.style.display = "flex";
    boxSelection.style.display = "none";
}

export function disableDarkBackground() {
    blackBackground.style.display = "none";
}
export function enableDarkBackground() {
    blackBackground.style.display = "block"
}
export function errorStyle(){
    message.style.display = "block";
    search.value = "";
}