const background = document.querySelector("#background");
const sets = background.querySelectorAll(".set");
const showBackground = (currentSet) => {
  const allImage = background.querySelectorAll("img");
  allImage.forEach((bgImage) => (bgImage.style.opacity = "0"));
  let randomSetChild = Math.floor(
    Math.random() * sets[currentSet].children.length
  );
  sets[currentSet].children[randomSetChild].style.opacity = "0.8";
};

const bgTimeOut = 10000; // in milliseconds how fast bg switches

// check if morning, afternoon, or evening
if (currentDateTime.getHours() >= morningStart) {
  currentSet = 0;
  showBackground(currentSet);
  setInterval(() => {
    showBackground(currentSet);
  }, bgTimeOut);
}
if (currentDateTime.getHours() > afternoonStart) {
  currentSet = 1;
  showBackground(currentSet);
  setInterval(() => {
    showBackground(currentSet);
  }, bgTimeOut);
}
if (currentDateTime.getHours() > eveningStart) {
  currentSet = 2;

  showBackground(currentSet);
  setInterval(() => {
    showBackground(currentSet);
  }, bgTimeOut);
}

setTimeout(() => {
  const transitionTimeOut = 2000; // transition speed in milliseconds
  background
    .querySelectorAll("img")
    .forEach(
      (image) =>
        (image.style.transition =
          "opacity " + transitionTimeOut + "ms" + " ease-in-out")
    );
}, bgTimeOut);
