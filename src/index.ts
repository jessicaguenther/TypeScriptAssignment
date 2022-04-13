import { getOutputFileNames } from "../node_modules/typescript/lib/typescript";

const search = document.querySelector("#myInput") as HTMLInputElement;
const searchButton = document.querySelector("#searchButton") as HTMLButtonElement;
const exitButton = document.querySelector("#exitButton") as HTMLButtonElement;
const cocktailName = search.value;
const output = document.querySelector(".outputName") as HTMLParagraphElement;
const outputInstructions = document.querySelector(".outputInstructions") as HTMLParagraphElement;
const outputIngredients = document.querySelector(".ingredients") as HTMLUListElement;
const background = document.querySelector(".background") as HTMLDivElement;
const message = document.querySelector(".errorMessage") as HTMLParagraphElement;
const headingCocktailName = document.querySelector(".headingCocktailName") as HTMLHeadingElement;
const headingCocktailList = document.querySelector(".headingCocktailList") as HTMLHeadingElement;
const headingIngredients = document.querySelector(".headingIngredients") as HTMLHeadingElement;
const headingInstructions = document.querySelector(".headingInstructions") as HTMLHeadingElement;
const radioButtonCocktail = document.querySelector("#radioButtonCocktail") as HTMLInputElement;
const radioButtonIngredients = document.querySelector("#radioButtonIngredients") as HTMLInputElement;

let isCocktailSelected : boolean

searchButton.addEventListener("click", searchLogic);
exitButton.addEventListener("click", exitPage);

function checkRadiobutton(){
  if (radioButtonCocktail.checked){
    isCocktailSelected = true
    
  }
  else if (radioButtonIngredients.checked){
    isCocktailSelected = false
  }
}

function exitPage() {
  background.style.display = "none";
  search.value = "";
  deleteList();
  headingCocktailName.style.display = "none";
}

function deleteList() {
  document.querySelectorAll(".ingredient").forEach(e => e.remove());
  document.querySelectorAll(".cocktail").forEach(e => e.remove());
}


function searchLogic() {
  checkRadiobutton();
  if (isCocktailSelected) {
    searchForCocktail();
  }
  else if (!isCocktailSelected) {
    searchForIngredient();
  }
}

function searchForCocktail() {
  const cocktailName = search.value;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
    .then(res => res.json())
    .then(data => {
      background.style.display = "flex";
      headingCocktailList.style.display = "none";
      console.log(data);
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
      background.style.display = "none";
      message.style.display = "block";
      message.textContent = "SORRY! CANNOT FIND COCKTAIL";
      search.value = "";

    })

}

function clickOnCocktail(cocktailName:string) {
  console.log(cocktailName)
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
    .then(res => res.json())
    .then(data => {
      background.style.display = "flex";
      headingCocktailName.style.display = "flex";
      headingIngredients.style.display = "flex";
      headingInstructions.style.display = "flex";
      output.style.display = "flex";
      headingCocktailList.style.display = "none";
      console.log(data);
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
      background.style.display = "none";
      message.style.display = "block";
      message.textContent = "SORRY! CANNOT FIND COCKTAIL";
      search.value = "";

    })

}

function searchForIngredient() {
  const cocktailName = search.value;
  
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${cocktailName}`)
    .then(res => res.json())
    .then(data => {
      background.style.display = "flex";
      output.style.display= "none";
      headingCocktailName.style.display = "none";
      headingIngredients.style.display = "none";
      headingInstructions.style.display = "none";
    
      for (let i = 0; i < data.drinks.length; i++) {
        output.innerText = data.drinks[i].strDrink;
        // console.log(data.drinks[i].strDrink)
        const listItem = outputIngredients.appendChild(document.createElement("li")) as HTMLLIElement;
        const linkItem = listItem.appendChild(document.createElement("button")) as HTMLButtonElement;
        listItem.classList.add("cocktail");
        // listItem.textContent = data.drinks[i].strDrink;
  
        linkItem.textContent = data.drinks[i].strDrink
        linkItem.addEventListener("click", function(){
          deleteList()
          clickOnCocktail(data.drinks[i].strDrink)
          console.log("Hallo")
        })
      }
    })
}
