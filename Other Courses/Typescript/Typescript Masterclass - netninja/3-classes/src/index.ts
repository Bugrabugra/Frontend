type Base = "classic" | "thick" | "thin" | "garlic"

interface HasFormatter {
  format(): string
}

abstract class MenuItem implements HasFormatter {
  constructor(private title: string, private price: number) {}

  get details(): string {
    return `${this.title} - $${this.price}`
  }

  abstract format(): string
}

class Pizza extends MenuItem {
  private base: Base = "classic"
  private toppings: string[] = []

  addTopping(topping: string): void {
    this.toppings.push(topping)
  }

  removeTopping(topping: string): void {
    this.toppings = this.toppings.filter((t) => t !== topping)
  }

  selectBase(b: Base): void {
    this.base = b
  }

  format(): string {
    let formatted = this.details + "\n"

    // base
    formatted += `Pizza on a ${this.base} base`

    // toppings
    if (this.toppings.length === 0) {
      formatted += "with no toppings"
    } else {
      formatted += ` with ${this.toppings.join(", ")}`
    }

    return formatted
  }

}

// const pizza = new Pizza("mario special", 15)
// pizza.selectBase("thick")
// pizza.addTopping("mushrooms")
// pizza.addTopping("olives")


// console.log(pizza)

const pizzaOne = new Pizza("mario special", 15)
const pizzaTwo = new Pizza("luigi special", 10)

// function addMushroomsToPizzas(pizzas: Pizza[]): void {
//   for (const pizza of pizzas) {
//     pizza.addTopping("mushrooms")
//   }
// }
//
// addMushroomsToPizzas([pizzaOne, pizzaTwo])

console.log({ pizzaOne, pizzaTwo })

function printMenuItem(item: MenuItem): void {
  console.log(item.details)
}

printMenuItem(pizzaTwo)

function printFormatted(val: HasFormatter): void {
  console.log(val.format())
}

pizzaOne.addTopping("mushrooms")
pizzaOne.addTopping("peppers")
printFormatted(pizzaOne)
