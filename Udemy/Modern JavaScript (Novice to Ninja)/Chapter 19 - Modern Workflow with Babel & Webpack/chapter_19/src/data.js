const users = [
  {name: "mario", premium: true},
  {name: "luigi", premium: false},
  {name: "yoshi", premium: true},
  {name: "toad", premium: true},
  {name: "peach", premium: false}
];

const getPremiumUsers = (users) => {
  return users.filter((user) => user.premium);
};

export {getPremiumUsers, users as default};