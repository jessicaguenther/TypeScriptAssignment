import { background, output, headingCocktailName, headingIngredients, headingInstructions, outputInstructions, boxResult, boxSelection, blackBackground } from "./variables";

export function displayContent() {
    boxSelection.style.display = "flex";
    boxResult.style.display = "none";
}
export function disableDarkBackground() {
    blackBackground.style.display = "none";
}
export function enableDarkBackground() {
    blackBackground.style.display = "block"
}