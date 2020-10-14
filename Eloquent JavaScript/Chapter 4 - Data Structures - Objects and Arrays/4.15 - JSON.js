let string = JSON.stringify({
                              squirrel: false,
                              events: ["weekend"]});

console.log(string);
console.log(JSON.parse(string).events);
