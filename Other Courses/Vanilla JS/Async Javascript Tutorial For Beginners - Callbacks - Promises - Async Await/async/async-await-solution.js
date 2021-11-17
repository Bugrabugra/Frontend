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
};

const displayUser = async () => {
  const user = await loginUser("ed", 12345);
  const videos = await getUserVideos(user.userEmail);
  const details = await videoDetails(videos);
  console.log(details);
};

displayUser();


console.log("finish");