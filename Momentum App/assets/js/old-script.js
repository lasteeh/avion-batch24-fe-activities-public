// hide/unhide submit button on setup
const submitSetup = document.querySelector("#info button"),
  inputName = document.querySelector("#info input");

inputName.addEventListener("keyup", () => {
  // Check if input is empty or not
  if (inputName.value == "") {
    submitSetup.style.opacity = "0";
    submitSetup.style.visibility = "hidden";
  } else {
    submitSetup.style.opacity = "1";
    submitSetup.style.visibility = "visible";
  }
});

// store the setup name input value
let userInfo = {
  name: "",
  focus: "",
  testkey: "testvalue",
};
const setupInfoForm = document.querySelector("#setup #info"),
  setupNameInput = document.querySelector("#setup #info #name");

setupInfoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // clear the localStorage for reset
  localStorage.clear();
  // store setup name info on submit
  userInfo.name = setupNameInput.value;
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  greet();
});

// show real time local clock
const timeDiv = document.querySelector("#time"),
  timeSwitcher = document.querySelector("#format-switch");
let timeOut = 100,
  timeDisplay = setInterval(() => {
    timeDiv.textContent = new Date().toLocaleTimeString();
  }, timeOut);

timeSwitcher.addEventListener("change", () => {
  // check if input is toggled
  if (timeSwitcher.checked) {
    clearInterval(timeDisplay);
    timeDisplay = setInterval(() => {
      timeDiv.textContent = new Date().toLocaleTimeString("PH", {
        hour12: false,
      });
    }, timeOut);
  } else {
    clearInterval(timeDisplay);
    timeDisplay = setInterval(() => {
      timeDiv.textContent = new Date().toLocaleTimeString();
    }, timeOut);
  }
});

//  show today's date
const dateDiv = document.querySelector("#date"),
  currentDateTime = new Date(),
  // array of months to be assigned for date format
  month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  // array of days to be assigned for date format
  day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
dateDiv.textContent =
  day[currentDateTime.getDay()] +
  " - " +
  month[currentDateTime.getMonth()] +
  " " +
  currentDateTime.getDate() +
  ", " +
  currentDateTime.getFullYear();

// dynamic greeting based on time
const greetingDiv = document.querySelector("#greeting"),
  greetStatement = "Good ",
  generalTimeOfDay = ["Morning", "Afternoon", "Evening"];
let storageItem = JSON.parse(localStorage.getItem("userInfo"));

function greet(name = userInfo.name) {
  // assigns time of day starting time
  const morningStart = 0, // 00:00
    afternoonStart = 12, // 12:00
    eveningStart = 16; // 16:00
  // check if morning, afternoon, or evening
  if (currentDateTime.getHours() >= morningStart) {
    greetingDiv.textContent =
      greetStatement + generalTimeOfDay[0] + ", " + name;
  }
  if (currentDateTime.getHours() > afternoonStart) {
    greetingDiv.textContent =
      greetStatement + generalTimeOfDay[1] + ", " + name;
  }
  if (currentDateTime.getHours() > eveningStart) {
    greetingDiv.textContent =
      greetStatement + generalTimeOfDay[2] + ", " + name;
  }
}

// store the focus value
const focusQuestionForm = document.querySelector("#focus-question"),
  focusQuestionInput = document.querySelector("#focus-question input");

focusQuestionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!focusQuestionInput.value) {
    alert("stop");
  }

  storageItem.focus = focusQuestionInput.value;
  localStorage.setItem("storageItem", JSON.stringify(storageItem));
  setFocus();
});

// set focus value
const focusLabel = document.querySelector("#focus > label");

function setFocus() {
  focusLabel.textContent = storageItem.focus;
}

// check localStorage ( if localStorage = null,  first time visit)
if (storageItem) {
  // puts name of previous user
  greet(storageItem.name);
}
