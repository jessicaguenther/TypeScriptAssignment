const search = document.querySelector("#myInput") as HTMLInputElement;
const searchButton = document.querySelector("#searchButton") as HTMLButtonElement;
const cocktailName = search.value;
const output = document.querySelector(".outputName") as HTMLParagraphElement;
const outputIngredients = document.querySelector(".ingredients") as HTMLUListElement;
const background = document.querySelector(".background") as HTMLDivElement;

searchButton.addEventListener("click", searchForCocktail)

function searchForCocktail() {
  const cocktailName = search.value;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
    .then(res => res.json())
    .then(data => {
      background.style.display = "flex"
      console.log(data)
      output.innerText = data.drinks[0].strDrink
      for (let i = 1; i < 15; i++) {
        if (data.drinks[0]["strIngredient" + i] != null) {
          const listItem = outputIngredients.appendChild(document.createElement("li")) as HTMLLIElement;
          listItem.textContent = data.drinks[0]["strIngredient" + i]
        }
      }
    })
}
