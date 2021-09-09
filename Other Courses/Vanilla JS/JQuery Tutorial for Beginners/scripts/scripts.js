/*
 Selectors
 */

// $("h3").css({border: "3px solid blue"});
// $(".wrapper").css({border: "3px solid red"});
// $("#clients").css({border: "3px solid yellow"});


/*
 Filters
 */

// Filters
// $("header nav li:first").css({border: "2px solid red"});
// $("header nav li:last").css({border: "2px solid red"});
// $("#contact ul:first-child").css({border: "2px solid red"});
// $("header nav li:even").css({border: "2px solid red"});
// $("section:not('#contact')").css({border: "2px solid green"});
// $("#social-nav li:lt(3)").css({border: "2px solid green"});
// $("#social-nav li:gt(2)").css({border: "2px solid green"});

// Attribute selectors
// $("div[class]").css({border: "2px solid pink"});
// $("img[alt=quote]").css({border: "2px solid pink"});


/*
 Traversing the DOM with jQuery
 */

// Next and prev
// $("#contact-methods").next().css({border: "2px solid pink"});
// $("#social-nav").prev().css({border: "2px solid blue"});

// Parents and children
// $(".banner-title").parent().css({border: "2px solid blue"});
// $(".banner-title").parents().css({border: "2px solid blue"});
// $("#social-nav").children().css({border: "2px solid red"});

// Find
// $("#contact").find(".facebook").css({border: "2px solid red"});

// Closest
// $("#social-nav").closest(".wrapper").css({border: "2px solid red"});


/*
 Chaining
 */

// $("#contact-methods").css({border: "2px solid red"})
//   .next().css({border: "2px solid green"})
//   .closest("section").css({border: "2px solid blue"});


/*
 Adding content
 */

// const tweet = "<div style='margin: 20px 0; padding: 10px; background: #eee;'>The big fight live: Ham vs Cheese!</div>"
// const tweetText = "The big fight live: Ham vs Cheese!";

// $("#tweets div").append(tweet);
// $("#tweets div").prepend(tweet);
// $("#tweets div p").before(tweet);
// $("#tweets div p").after(tweet);
// $("#tweets div").html(tweet);
// $("#tweets div p").text(tweetText);


/*
 Wrap and Unwrap Elements
 */

// $("section").wrap("<div>");
// $("section").unwrap();
// $("section").wrapAll("<div>");

// const wrapper = "<div class='wrapper'>";
// const button = $(".button");
// let wrapped = true;
//
// button[0].onclick = () => {
//   if (wrapped) {
//     $("section").unwrap();
//     wrapped = false;
//     button.text("Wrap");
//   } else {
//     $("section").wrapAll(wrapper);
//     wrapped = true;
//     button.text("Unwrap");
//   }
// };


/*
 Removing content
 */

// $(".button").empty(); // Empties the inner html
// $("#points-of-sale").empty(); // Deletes the element completely
// $(".button").remove();


/*
 Changing attributes
 */

// $("#contact img").removeAttr("alt");
// $("#contact img").attr("alt", "location");
// console.log($("#contact img").attr("alt"));


/*
 CSS with JQuery
 */

// console.log($("#social-nav").css("top"));
// $("#social-nav")
//   .css("top", "-200px")
//   .css("left", "100px");
//
// const myObject = {
//   "top": "-400px",
//   "left": "150px",
//   "opacity": "0.5",
//   "border-top": "4px solid red"
// };
//
// $("#social-nav").css(myObject);


/*
 Adding & Removing Classes
 */

// $("header .wrapper").removeClass("wrapper");
// $("header > div").addClass("wrapper");

// const button = $("#lead-banner a");
//
// button[0].onclick = () => {
//   $("#points-of-sale").toggleClass("open");
//   return false;
// };


/*
 Binding & Unbinding Events
 */

// const myLis = $("#points-of-sale li");
// myLis.on("click", function() {
//   $(this).css({background: "pink"});
//   myLis.off("click");
// });


/*
 Event Helpers
 */

// $("#lead-banner").on("dblclick", function() {
//   alert("you double clicked me");
//   $("#lead-banner").off("dblclick");
// });


/*
 Document Ready vs Window Load
 */


/*
 The Event Object in jQuery
 */

// $(document).ready(function() {
//   $("*").on("click", function(e) {
//     console.log(e.target);
//     console.log(e.pageX);
//     console.log("The event type is: ", e.type);
//     e.stopPropagation();
//   })
// });


/*
 Animations in jQuery
 */

// $(document).ready(function() {
//   function complete(){
//     alert("Animation complete");
//   }
//
//   $("section > h2").on("click", function() {
//     $(this).animate(
//       {width: "500px", height: "100px"},
//       1000,
//       "linear",
//       complete);
//   })
// });


/*
 Fading Elements In & Out
 */

// $(document).ready(function() {
//   $("section > h2").on("click", function() {
//     $(this)
//       .fadeTo(200, 0.2)
//       .fadeTo(200, 0.8)
//       .fadeTo(200, 0.2)
//       .fadeTo(200, 0.8)
//       .fadeTo(200, 0.2)
//       .fadeTo(200, 0.8);
//   })
// });


/*
 Hide and Show Elements
 */

// $(document).ready(function() {
// //   $("img[alt=map]").on("click", function() {
// //     // $(this)
// //     //   .hide(1000)
// //     //   .show(1000);
// //     $("section > h2").toggle(1000);
// //   })
// // });


/*
 Sliding Elements
 */

// $(document).ready(function() {
  // $(".slide-button-up").on("click", function() {
  //   $("#lead-banner").slideUp(100);
  // })
  //
  // $(".slide-button-down").on("click", function() {
  //   $("#lead-banner").slideDown(100);
  // })

  // $(".slide-button-down").on("click", function() {
  //   $("#lead-banner").slideToggle(100);
  // })
// });


/*
 Fading Animation Example
 */

// $(document).ready(function() {
//   const allQuotes = $("blockquote");
//   let currentQuote = 0;
//
//   const changeQuote = () => {
//     $(allQuotes[currentQuote]).fadeOut(200, function() {
//       if (currentQuote === allQuotes.length - 1) {
//         currentQuote = 0;
//       } else {
//         currentQuote++;
//       }
//
//       $(allQuotes[currentQuote]).fadeIn(200);
//     });
//   };
//
//   const quoteTimer = setInterval(changeQuote, 1000);
// });


/*
 Sliding Animation Example
 */

// $(document).ready(function() {
//   const items = $("#points-of-sale li");
//   items.on("click", function() {
//     $(this).find("p").slideToggle(500);
//   })
// });


/*
 Using Plugins
 */

// $(document).ready(function() {
//   $(".rslides").responsiveSlides({timeout: 1000});
// });