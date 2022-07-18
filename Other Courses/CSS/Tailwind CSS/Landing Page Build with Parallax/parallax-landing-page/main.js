import "./style.css";

// image slider
const slideButtons = document.querySelectorAll("[data-slideBtn]");
const slideContainer = document.querySelector("[data-sliderContainer]");
const slides = [...document.querySelectorAll("[data-slide]")];
let currentIndex = 0;
let isMoving = false;

// button handle function
function handleSlideBtnClick(e) {
  if (isMoving) {
    return;
  }
  isMoving = true;
  // TODO: see if slider is already moving
  e.currentTarget.id === "prev"
    ? currentIndex--
    : currentIndex++;

  slideContainer.dispatchEvent(new Event("sliderMove")); // !!!
}

// remove/add attribute function
const removeDisabledAttribute = (els) => els.forEach(el => el.removeAttribute("disabled"));
const addDisabledAttribute = (els) => els.forEach(el => el.setAttribute("disabled", true));

// event listeners
slideButtons.forEach(btn => btn.addEventListener("click", handleSlideBtnClick));
slideContainer.addEventListener("sliderMove", () => {
  // 1. translate the container to the right/left
  slideContainer.style.transform = `translateX(-${currentIndex * slides[0].clientWidth}px)`
  // 2. remove disabled attributes
  removeDisabledAttribute(slideButtons);
  // 3. re-enable disabled attribute if needed
  currentIndex === 0 && addDisabledAttribute([slideButtons[0]]);
});

// transition end event
slideContainer.addEventListener("transitionend", () => isMoving = false);

// disable image drag events
document.querySelectorAll("[data-slide] img").forEach(img => img.ondragstart = () => false);

// intersection observer for slider
const slideObserver = new IntersectionObserver((slide) => { // !!!
  if (slide[0].isIntersecting) {
    addDisabledAttribute([slideButtons[1]]);
  }
}, { threshold: 0.75 });
slideObserver.observe(slides[slides.length - 1]);

// form handle
const contactForm = document.querySelector("#contact-form");
const contactBtn = document.querySelector("#contact-btn");
const contactInput = document.querySelector("#email");

function postEmailToDatabase(email) {
  console.info(`Your email is ${email}`);
  return new Promise(resolve => setTimeout(resolve, 2000));
}

// options for submit button
const contactBtnOptions = {
  pending: `
    <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="128" y1="32" x2="128" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="224" y1="128" x2="192" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="195.9" y1="195.9" x2="173.3" y2="173.3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="128" y1="224" x2="128" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="60.1" y1="195.9" x2="82.7" y2="173.3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="32" y1="128" x2="64" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="60.1" y1="60.1" x2="82.7" y2="82.7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg>
    <span class="uppercase tracking-wide animate-pulse">
      Sending ...
    </span>
  `,
  success: `
    <span class="uppercase tracking-wide">
      Thank you
    </span>
  `
};

async function handleFormSubmit(e) {
  e.preventDefault();

  addDisabledAttribute([contactForm, contactBtn]);
  contactBtn.innerHTML = contactBtnOptions.pending;
  const userEmail = contactInput.value;
  contactInput.style.display = "none";
  await postEmailToDatabase(userEmail);
  contactBtn.innerHTML = contactBtnOptions.success;
}

// event listener form submit
contactForm.addEventListener("submit", handleFormSubmit);

// fade up observer
function fadeUpObserverFunction(elsToWatch) {
  elsToWatch.forEach((el) => {
    if (el.isIntersecting) {
      el.target.classList.add("faded");
      fadeUpObserver.unobserve(el.target);
      el.target.addEventListener("transitionend", () => {
        el.target.classList.remove("fade-up", "faded");
      }, { once: true })
    }

  });
}

const fadeUpObserverOptions = {
  threshold: 0.6
};

const fadeUpObserver = new IntersectionObserver(fadeUpObserverFunction, fadeUpObserverOptions);

document.querySelectorAll(".fade-up").forEach((item) => {
  fadeUpObserver.observe(item)
})
