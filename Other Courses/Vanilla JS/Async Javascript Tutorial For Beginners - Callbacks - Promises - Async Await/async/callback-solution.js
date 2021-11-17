console.log("start");

const loginUser = (email, password, callback) => {
  setTimeout(() => {
    console.log("now we have the data");
    callback({userEmail: email});
  }, 3000);
};

const getUserVideos = (email, callback) => {
  setTimeout(() => {
    callback(["video1", "video2", "video3"]);
  }, 2000)
};

const videoDetails = (video, callback) => {
  setTimeout(() => {
    callback("title of the video");
  }, 2000)
}

const user = loginUser("b@g.com", 123456, user => {
  console.log(user);
  getUserVideos(user.userEmail, videos => {
    console.log(videos);
    videoDetails(videos[0], title => {
      console.log(title);
    })
  });
});

console.log("finish");