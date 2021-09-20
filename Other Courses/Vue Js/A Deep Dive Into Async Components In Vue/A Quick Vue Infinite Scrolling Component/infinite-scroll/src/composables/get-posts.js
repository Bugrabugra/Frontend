const names = [
  "Abraham Lincoln",
  "Lebron James",
  "Bill Gates",
  "Brad Pitt"
];

const getPosts = (number) => {
  // generate a number of posts in a real setting, this would be a database call or algorithm
  let ret = [];

  for (let i = 0; i < number; i++) {
    ret.push({
      author: names[i % names.length],
      content: "Test"
    });
  }
  return ret;
};

export default getPosts;