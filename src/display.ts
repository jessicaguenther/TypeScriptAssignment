import { background, output, headingCocktailName, headingIngredients, headingInstructions, outputInstructions } from "./variables";

export function displayContent(){
    background.style.display = "flex";
    output.style.display = "none";
    headingCocktailName.style.display = "none";
    headingIngredients.style.display = "none";
    headingInstructions.style.display = "none";
    outputInstructions.style.display = "none";
  }