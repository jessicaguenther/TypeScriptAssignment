import { output, outputInstructions, boxResult, boxSelection, blackBackground, search, message } from "./variables";

//Einblenden der Auswahlseite (Cocktail Selection)
//Ausblenden der Ergebnisseite (Cocktailname, Ingredients, Instructions)
export function displayContent() {
    boxSelection.style.display = "flex";
    boxResult.style.display = "none";
}
//Einblenden der Ergebnisseite (Cocktailname, Ingredients, Instructions)
//Ausblenden der Auswahlseite (Cocktail Selection)
export function displayResult() {
    boxResult.style.display = "flex";
    boxSelection.style.display = "none";
}
//Ausblenden des schwarzen transparenten Hintergrunds
export function disableDarkBackground() {
    blackBackground.style.display = "none";
}
//Einblenden des schwarzen transparenten Hintergrunds
export function enableDarkBackground() {
    blackBackground.style.display = "block"
}
//Einblenden der Errormessage (wenn Ergebnis nicht gefunden oder nichts eingegeben wurde)
export function errorStyle() {
    message.style.display = "block";
    search.value = "";
}