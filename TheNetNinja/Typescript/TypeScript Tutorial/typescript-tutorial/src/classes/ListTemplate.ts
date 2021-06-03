import {HasFormatter} from "../interfaces/HasFormatter.js";

export class ListTemplate {
  constructor(private container: HTMLUListElement) {}

  render(item: HasFormatter, heading: string, pos: "start" | "end") {
    const li = document.createElement("li");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");

    h4.innerText = heading;
    li.append(h4);
    p.innerText = item.format();
    li.append(p);

    if (pos === "start") {
      this.container.prepend(li);
    } else {
      this.container.append(li);
    }
  }
}

/*
1. Register a list container (ul) in the constructor
2. Create a render method to render a new "li" to the container
-- accepts arguments: invoice or payment, a heading, a position
-- create the html template (li, h4, p)
-- add the "li" template to the start/end of the list
 */