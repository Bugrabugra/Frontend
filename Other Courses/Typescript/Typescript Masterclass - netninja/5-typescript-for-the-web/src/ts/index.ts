import { Pizza, PizzaProps } from "./models/Pizza";

const rootElement = document.querySelector(".root")!;


function createPizzaTemplate(pizza: PizzaProps): string {
  return `
    <div class="pizza">
      <h2>${pizza.title}</h2>
      <p class="toppings">${pizza.toppings.join(", ")}</p>
      <p>${pizza.description}</p>
      <span>$${pizza.price}</span>
    </div>
  `
}

function renderTemplates(templates: string[], parent: Element): void {
  const templateElement = document.createElement("template")

  for (const template of templates) {
    templateElement.innerHTML += template
  }

  parent.append(templateElement.content)
}

document.addEventListener("DOMContentLoaded", async () => {
  // load pizza data
  const pizzas = await Pizza.loadAll()

  // create template string for each pizza
  const pizzaTemplates = pizzas.map(createPizzaTemplate)

  // render pizza templates to DOM
  renderTemplates(pizzaTemplates, rootElement)
})
