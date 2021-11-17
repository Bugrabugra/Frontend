console.log("start");

const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("now we have the data");
      resolve({userEmail: email});
    }, 3000);
  })

};

const getUserVideos = (email) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["video1", "video2", "video3"]);
    }, 2000);
  })
};

const videoDetails = (videos) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(videos[0]);
    }, 2000);
  })
}

// loginUser("ed", "bumba")
//   .then(user => getUserVideos(user.email))
//   .then(videos => videoDetails(videos))
//   .then(detail => console.log(detail));

const yt = new Promise(resolve => {
  setTimeout(() => {
    console.log("getting stuff from youtube");
    resolve({videos: [1, 2, 3, 4, 5]});
  }, 2000)
});

const fb = new Promise(resolve => {
  setTimeout(() => {
    console.log("getting stuff from facebook");
    resolve({user: "Name"});
  }, 1000)
});

Promise.all([yt, fb])
  .then(result => console.log(result));

console.log("finish");