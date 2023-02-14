let mountVideos = document.querySelectorAll(".mount-feature_bg video");
let mountSliders = document.querySelectorAll("#mount-slider input");

for (let i = 0; i < mountSliders.length; i++) {
  mountSliders[i].addEventListener("click", () => {
    if ((mountSliders[i].checked = true)) {
      mountVideos.forEach((video) => video.pause());
      mountVideos[i].play();
    }
  });
}

/* let allVideos = document.querySelectorAll(".mount-feature_bg video");
if (window.innerWidth < 900) {
  for (let i = 0; i < allVideos.length; i++) {
    allVideos[i].autoplay = false;
  }
} else {
  allVideos[i].autoplay = true;
  allVideos[i].load();
}

if (window.innerWidth > 900) {
  for (let i = 0; i < allVideos.length; i++) {
    allVideos[i].autoplay = true;
    allVideos[i].load();
  }
} else {
  allVideos[i].autoplay = false;
}

console.log(allVideos); */

/* change logo size on scroll */
const logo = document.getElementById("header-img");

window.onscroll = function () {
  if (window.pageYOffset > 1) {
    logo.classList.add("minimize");
  } else {
    logo.classList.remove("minimize");
  }
};

/* modals */
const videoModal = document.getElementById("video-modal");
const openVideo = document.getElementById("video-open");
const closeVideo = document.getElementById("video-close");
const video = document.getElementById("video");

openVideo.addEventListener("click", () => {
  videoModal.showModal();
  video.play();
});

closeVideo.addEventListener("click", () => {
  videoModal.close();
  video.load();
});

const formModal = document.getElementById("cta-form");
const openForm = document.getElementById("open-form");
const closeForm = document.getElementById("close-form");

openForm.addEventListener("click", () => {
  formModal.showModal();
});
closeForm.addEventListener("click", () => {
  formModal.close();
});

/* get index */
/* let selection = Array.from(document.querySelectorAll("#cta-selection img"));

for (let i = 0; i < selection.length; i++) {
  selection[i].tabIndex = i;
}

function selectClick() {
  console.log(event.target.tabIndex);

  let jarvan = selection.filter((image) => (image.className = ""));

  console.log(jarvan);
}
for (let i = 0; i < selection.length; i++) {
  selection[i].addEventListener("click", () => {
    console.log(selection[i]);
    selection[i].classList.toggle("active");
  });
} */

let costElement = document.getElementById("cost");
let cost = costElement.innerText;
/* change cost value */

let radioSelection = Array.from(
  document.querySelectorAll("#form input[type=radio]")
);
/* cart thing */
/* collect images*/
let selection = Array.from(document.querySelectorAll("#cta-selection img"));

for (let i = 0; i < selection.length; i++) {
  selection[i].addEventListener("click", () => {
    let previousCheck = document.querySelector(
      "#form input[type=radio]:checked"
    );

    selection.filter((image) => (image.className = ""));
    selection[i].classList.toggle("active");

    let clickedRadio = radioSelection[i];
    previousCheck.checked = false;
    clickedRadio.checked = true;

    let checkedElement = document.querySelector(
      "#form input[type=radio]:checked"
    );

    cost = checkedElement.getAttribute("value");

    let costGold = cost.toString().slice(0, 3);
    let costSilver = cost.toString().slice(3, 5);
    let costCopper = cost.toString().slice(5, 7);

    let coinGold = document.createElement("span");
    coinGold.setAttribute("id", "gold");
    let coinSilver = document.createElement("span");
    coinSilver.setAttribute("id", "silver");
    let coinCopper = document.createElement("span");
    coinCopper.setAttribute("id", "copper");

    /* costElement.innerText = costGold.concat(coinGold); */
    costElement.innerHTML =
      costGold +
      coinGold.outerHTML +
      costSilver +
      coinSilver.outerHTML +
      costCopper +
      coinCopper.outerHTML;

    /* change heading */
    let labelSelection = Array.from(document.querySelectorAll("#form label"));
    let headingMount = document.getElementById("selection-title");

    let clickedTitle = labelSelection[i];
    headingMount.innerText = clickedTitle.textContent;

    /* pass data to next */
    const passForm = document.getElementById("form");
    const passMount = document.querySelector("#form input[type=radio]:checked");

    passForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const title = passMount.title;
      const cost = passMount.value;

      sessionStorage.setItem(
        "purchasedItem",
        JSON.stringify({ tt: title, cs: cost })
      );

      window.location.href = "thankyou.html";
    });
  });

  /* cost format */

  let costGold = cost.toString().slice(0, 3);
  let costSilver = cost.toString().slice(3, 5);
  let costCopper = cost.toString().slice(5, 7);

  let coinGold = document.createElement("span");
  coinGold.setAttribute("id", "gold");
  let coinSilver = document.createElement("span");
  coinSilver.setAttribute("id", "silver");
  let coinCopper = document.createElement("span");
  coinCopper.setAttribute("id", "copper");

  /* costElement.innerText = costGold.concat(coinGold); */
  costElement.innerHTML =
    costGold +
    coinGold.outerHTML +
    costSilver +
    coinSilver.outerHTML +
    costCopper +
    coinCopper.outerHTML;

  const passForm = document.getElementById("form");
  const passMount = document.querySelector("#form input[type=radio]:checked");

  passForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = passMount.title;
    const cost = passMount.value;

    sessionStorage.setItem(
      "purchasedItem",
      JSON.stringify({ tt: title, cs: cost })
    );

    window.location.href = "thankyou.html";
  });
}
