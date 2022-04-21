// import { search } from "./variables";

// export function createPopUp() {

//     const body = document.querySelector("body") as HTMLBodyElement;

//     const background = document.createElement("div") as HTMLDivElement;
//     body.appendChild(background)
//     background.classList.add("background")

//     const boxInside = document.createElement("div") as HTMLDivElement;
//     background.appendChild(boxInside)
//     boxInside.classList.add("boxInside")

//     const exitButton = document.createElement("button") as HTMLButtonElement;
//     boxInside.appendChild(exitButton)
//     exitButton.setAttribute("id", "exitButton")
//     exitButton.textContent = "x"

//     const headingCocktailName = document.createElement("h3") as HTMLHeadingElement;
//     boxInside.appendChild(headingCocktailName)
//     headingCocktailName.classList.add("headingCocktailName")
//     headingCocktailName.textContent = "COCKTAILNAME:"

//     const outputName = document.createElement("p") as HTMLParagraphElement;
//     boxInside.appendChild(outputName)
//     outputName.classList.add("outputName")

//     const headingIngredients = document.createElement("h3") as HTMLHeadingElement;
//     boxInside.appendChild(headingIngredients)
//     headingIngredients.classList.add("headingIngredients")
//     headingIngredients.textContent = "INGREDIENTS:"

//     const headingCocktailList = document.createElement("h3") as HTMLHeadingElement;
//     boxInside.appendChild(headingCocktailList)
//     headingCocktailList.classList.add("headingCocktailList")
//     headingCocktailList.textContent = "COCKTAIL SELECTION:"


//     const ingredients = document.createElement("ul") as HTMLUListElement;
//     boxInside.appendChild(ingredients)
//     ingredients.classList.add("ingredients")

//     const headingInstructions = document.createElement("h3") as HTMLHeadingElement;
//     boxInside.appendChild(headingInstructions)
//     headingInstructions.classList.add("headingInstructions")
//     headingInstructions.textContent = "INSTRUCTIONS:"

//     const outputInstructions = document.createElement("p") as HTMLParagraphElement;
//     boxInside.appendChild(outputInstructions)
//     outputInstructions.classList.add("outputInstructions")

//     searchForCocktail()
// }

// function searchForCocktail() {
//     const cocktailName = search.value;
  
//     fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
//       .then(res => res.json())
//       .then(data => {
//         output.innerText = data.drinks[0].strDrink;
//         for (let i = 1; i < 15; i++) {
//           if (data.drinks[0]["strIngredient" + i] != null && data.drinks[0]["strIngredient" + i] != "" ) {
//             const listItem = outputIngredients.appendChild(document.createElement("li")) as HTMLLIElement;
//             listItem.classList.add("ingredient");
//             listItem.textContent = data.drinks[0]["strIngredient" + i] + ": " + data.drinks[0]["strMeasure" + i];
//             if (data.drinks[0]["strMeasure" + i] == null) {
//               listItem.textContent = data.drinks[0]["strIngredient" + i];
//             }
//           }
//           outputInstructions.innerText = data.drinks[0].strInstructions;
//         }
//       })
//       .catch(() => {
//         background.style.display = "none";
//         message.style.display = "block";
//         message.textContent = "SORRY! CANNOT FIND COCKTAIL";
//         search.value = "";
//       })
//   }