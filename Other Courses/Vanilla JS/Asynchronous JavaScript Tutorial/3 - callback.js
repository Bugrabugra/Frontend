window.onload = () => {

  // const callback = (val) => {
  //   console.log(val);
  // };
  //
  // const fruits = ["banana", "apple", "pear"];
  // fruits.forEach(callback);
  // console.log("done");

  // ************************************
  // const cb = (data) => {
  //   console.log(data);
  // };
  //
  // $.get("data/tweets.json", cb);
  // console.log("test");

  const handleError = (jqXHR, textStatus, error) => {
    console.log(error);
  };

  $.ajax({
    type: "GET",
    url: "data/tweets.json",
    success: cbTweets,
    error: handleError
  });

  function cbTweets(data) {
    console.log(data);

    $.ajax({
      type: "GET",
      url: "data/friends.json",
      success: cbFriends,
      error: handleError
    })
  };

  function cbFriends(data) {
    console.log(data);
    $.ajax({
      type: "GET",
      url: "data/videos.json",
      success: (data) => {
        console.log(data);
      },
      error: handleError
    })
  }

};

