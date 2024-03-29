class Colour {
  constructor(hex, element) {
    this.hex = hex;
    this.element = element;
    this.locked = false
  }

  setHex(hex) {
    this.hex = hex;
    this.element
      .style.backgroundColor = hex;
    this.element
      .querySelector(".colour-input").value = hex;
  }

  setLocked(locked) {
    this.locked = locked;

    if (locked) {
      this.element
        .querySelector(".lock-toggle")
        .classList.add("is-locked");
      this.element
        .querySelector("img")
        .src = "icons/lock-closed.svg"
    } else {
      this.element
        .querySelector(".lock-toggle")
        .classList.remove("is-locked");
      this.element
        .querySelector("img")
        .src = "icons/lock-open.svg"
    }
  }

  toggleLocked() {
    this.setLocked(!this.locked);
  }

  generateHex() {
    if (this.locked) {
      return;
    }
    const chars = "0123456789ABCDEF";
    let hex = "#";
    for (let i = 0; i < 6; i++) {
      hex += chars[Math.floor(Math.random() * 16)];
    }
    this.setHex(hex);
  }

  copyToClipboard() {
    const input = this.element.querySelector(".colour-input");
    input.select();
    document.execCommand("copy");
    input.blur();

    this.element.classList.add("copied");
    setTimeout(() => {
      this.element.classList.remove("copied");
    }, 1000)
  }
}

const colourElements = document.querySelectorAll(".colours .colour");
const colours = [];
for (let i = 0; i < colourElements.length; i++) {
  const colourElement = colourElements[i];
  const input = colourElement.querySelector(".colour-input");
  const lockToggle = colourElement.querySelector(".lock-toggle");
  const copyHex = colourElement.querySelector(".copy-hex");

  const hex = input.value;

  const colour = new Colour(hex, colourElement);
  input.addEventListener("input", () => colour.setHex(e.target.value));
  lockToggle.addEventListener("click", () => colour.toggleLocked());
  copyHex.addEventListener("click", () => colour.copyToClipboard());

  colour.generateHex();
  colours.push(colour);
}

document
  .querySelector(".generator-button")
  .addEventListener("click", () => {
    for (let i = 0; i < colourElements.length; i++) {
      colours[i].generateHex();
    }
  })