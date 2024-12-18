import {peeps, comments} from './data.js'

// EASIER CHALLENGES (using the peeps array) //

// 1. Count the number of people in the people array.
console.log(peeps.length);
// 2. List full names of people in a new array.
const newArray = peeps.map((peep) => `${peep.name.first} ${peep.name.last}`);
console.log(newArray);
// 3. Return “true” if everyone is older than 24.
console.log(peeps.every(p => p.age > 24));
// 4. Return “true” if at least one person is younger than 26.
console.log(peeps.some(p => p.age < 26));
// 5. Return a new array called “young peeps” of all peeps less than 30.
const youngPeeps = peeps.filter(p => p.age < 30);
console.log(youngPeeps)
// 6. Sort the peeps by age from oldest to youngest in an array called “sortedPeeps”.
const sortedPeeps = peeps.sort((a, b) => b.age - a.age);
console.log(sortedPeeps);
// 7. Create a new array called “firstNamePeeps” with only the first names of the peeps.
const firstNamePeeps = peeps.map(p => p.name.first);
console.log(firstNamePeeps);
// HARDER CHALLENGES (using the comments object and peeps array) //

// 1. List all the comments in an array of strings called “commentsArray”
const commentsArray = Object.values(comments).map(c => c.text);
console.log(commentsArray);
// 2. Return all comments with the word “love” in the comment in a new array called “loveComments”
const loveComments = Object.values(comments).filter(c => c.text.toLowerCase().includes("love"));
console.log(loveComments);
// 3. List all the comments in an array of strings called "sortedCommentsArray" from lowest rating to highest rating. Ignore comments without a rating.
const sortedCommentsArray = Object.values(comments).filter(c => c.rating).sort((a, b) => a.rating - b.rating);
console.log(sortedCommentsArray);
// 4. Return a new object called “commentObj” with the comment id as a key and the comment text as the value.
const commentObj = Object.entries(comments).reduce((acc, comment) => {
  acc[comment[0]] = comment[1].text;
  return acc;
}, {})
console.log(commentObj);
// 5. Return a new object called “groupedRatings” with the rating as a key and an array of comments with that rating as the value. Ignore comments without a rating.
const groupedRatings = Object.values(comments).reduce((acc, comment) => {
  acc[comment.rating] = [...Object.values(comments).filter(c => c.rating === comment.rating).map(c => c.text)];
  return acc;
}, {})
console.log(groupedRatings);
// 6. Return the average rating of all comments.
console.log(Object.values(comments).reduce((acc, comment) => ((acc += comment?.rating || 0)), 0) / Object.values(comments).filter(c => c.rating).length);

// 7. Group all comments by the user who made the comment.
// Return a new object called “groupedPeepComments” with the
// user’s first and last name as a string key.
// The value of each object should be an array of comment
// objects by the person.
const groupedPeepComments = Object.values(peeps).reduce((acc, peep) => {
  acc[`${peep.name.first} ${peep.name.last}`] = [...Object.values(comments).filter(c => c.userId === peep.id).map(c => c.text)];
  return acc;
}, {});
console.log(groupedPeepComments);
