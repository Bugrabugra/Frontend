// Template strings
const title = "Best reads of 2019";
const author = "Mario";
const likes = 30;

// Concatenation way
let result = "The blog called " + title + " by " + author + " has " + likes + " likes";
console.log(result);

// Template string way
let result2 = `The blog called ${title} by ${author } has ${likes} likes`;
console.log(result2);

// Creating html templates
let html = `
  <h2>${title}</h2>
  <p>${author}</p>
  <span>This blog has ${likes} likes</span>
`;
console.log(html);