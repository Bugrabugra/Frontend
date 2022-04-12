import "./style.css";

const input = document.querySelector("input");
const defaultText = document.getElementById("default");
const debouncedText = document.getElementById("debounce");
const throttledText = document.getElementById("throttle");

const debounce = (cb, delay = 1000) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args)
    }, delay);
  }
};

const throttle = (cb, delay = 1000) => {
  let shouldWait = false;
  let waitingArgs;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  }

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }
    cb(...args);
    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  }
};

const updateDebouncedText = debounce((text) => {
  debouncedText.textContent = text;
});

const updateThrottledText = debounce((text) => {
  throttledText.textContent = text;
});

input.addEventListener("input", (e) => {
  defaultText.textContent = e.target.value;
  updateDebouncedText(e.target.value);
  updateThrottledText(e.target.value);
});


