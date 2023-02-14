// *********************************************
// styling codes
// *********************************************

// hide/unhide submit button if input is empty
const submitSetup = document.querySelector("#info button"),
  inputName = document.querySelector("#info input"),
  inputFocus = document.querySelector("#focus-question > input"),
  submitFocus = document.querySelector("#focus-question > button"),
  setupPage = document.querySelector("#setup"),
  mainContent = document.querySelector("main"),
  mainFocus = document.querySelector("#focus"),
  focusQuestion = document.querySelector("#focus-question");

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
inputFocus.addEventListener("keyup", () => {
  // Check if input is empty or not
  if (inputFocus.value == "") {
    submitFocus.style.opacity = "0";
    submitFocus.style.visibility = "hidden";
  } else {
    submitFocus.style.opacity = "1";
    submitFocus.style.visibility = "visible";
  }
});

const expandingInput = document.querySelector("#focus-question input");

//expands on content width
expandingInput.addEventListener("keydown", () => {
  let expandingValue = expandingInput.value;
  let expandingValueLength = expandingValue.length;
  expandingInput.style.width = expandingValueLength + 4 + "ch";
});

// *********************************************
// function codes
// *********************************************

// prevents buttons to reload page on click
// ****NOTE: if in the future we need a working form, simply remove this lines of code and replace all button type with type="button" instead.
const allButtons = document.querySelectorAll("button");
for (let button of allButtons) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
}

// sets the page up for localStorage
let userInfo = {},
  storageItem = JSON.parse(localStorage.getItem("userInfo"));

// what do we store in localStorage?
// 1. time format preference
// 2. user name
// 3. focus
// 4. profile photo
// 5. todo list array
// 6. quotes array
// 7. background photos preference

// function to update localStorage with current userInfo values
function updateLocalStorage() {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

// show real time local clock
const timeDiv = document.querySelector("#time"),
  timeSwitcher = document.querySelector("#format-switch");
let timeInterval = 100, // unit in milliseconds
  timeDisplay = setInterval(() => {
    timeDiv.textContent = new Date().toLocaleTimeString();
  }, timeInterval);

// runs on checkbox clicks
timeSwitcher.addEventListener("change", () => {
  // check if input is toggled
  if (timeSwitcher.checked) {
    // clears setInterval to prevent simultaneous display of 2 different time format
    clearInterval(timeDisplay);
    // stores true value to userInfo
    userInfo["time-format"] = true;
    timeDisplay = setInterval(() => {
      timeDiv.textContent = new Date().toLocaleTimeString("PH", {
        hour12: false,
      });
    }, timeInterval);
    // uploads new userInfo value to localStorage
    updateLocalStorage();
  } else {
    clearInterval(timeDisplay);
    userInfo["time-format"] = false;
    timeDisplay = setInterval(() => {
      timeDiv.textContent = new Date().toLocaleTimeString();
    }, timeInterval);
    updateLocalStorage();
  }
});

// show today's date
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

// show greetings
const greetingDiv = document.querySelector("#greeting"),
  greetStatement = "Good ",
  generalTimeOfDay = ["Morning", "Afternoon", "Evening"],
  // assigns time of day starting time
  morningStart = 0, // 00:00
  afternoonStart = 12, // 12:00
  eveningStart = 16; // 16:00;

function greet() {
  // check if morning, afternoon, or evening
  if (currentDateTime.getHours() >= morningStart) {
    greetingDiv.textContent =
      greetStatement + generalTimeOfDay[0] + ", " + userInfo.name + ".";
  }
  if (currentDateTime.getHours() > afternoonStart) {
    greetingDiv.textContent =
      greetStatement + generalTimeOfDay[1] + ", " + userInfo.name + ".";
  }
  if (currentDateTime.getHours() > eveningStart) {
    greetingDiv.textContent =
      greetStatement + generalTimeOfDay[2] + ", " + userInfo.name + ".";
  }
}

// setup username
const setupNameButton = document.querySelector("#setup #info button"),
  setupNameInput = document.querySelector("#setup #info #name"),
  namePattern = /[a-zA-Z]{1,}/;

// runs on button click
setupNameButton.addEventListener("click", () => {
  // input validation
  // runs if input pattern valid
  if (namePattern.test(setupNameInput.value)) {
    // resets userInfo
    userInfo = {};
    // clear the localStorage for reset
    localStorage.clear();
    // reset time format
    clearInterval(timeDisplay);
    userInfo["time-format"] = false;
    timeDisplay = setInterval(() => {
      timeDiv.textContent = new Date().toLocaleTimeString();
    }, timeInterval);
    // initially sets userInfo.name value
    userInfo["name"] = setupNameInput.value;

    // added by kazel for local storage update in myQuotes
    localStorage.setItem("myQuotes", JSON.stringify(myQuotes));
    renderQuotes();
    formAddNew.style.display = "none";

    // show greeting
    greet();
    // update localStorage with new values
    updateLocalStorage();

    // styling code
    // hides setup page and shows main content only
    // (forward animation - no backwards animation)
    setupPage.style.visibility = "hidden";
    setupPage.style.opacity = "0";
    mainContent.style.visibility = "visible";
    mainContent.style.opacity = "1";
    setupNameButton.style.visibility = "hidden";
  } else {
    console.log("name not valid");
  }
  // runs when input pattern invalid
});

// show focus
const getFocusButton = document.querySelector("#focus-question > button"),
  getFocusInput = document.querySelector("#focus-question > input"),
  showFocusLabel = document.querySelector("#focus > label"),
  showFocusCheckbox = document.querySelector("#focus-checkbox"),
  focusPattern = /[A-Za-z0-9+-/*',.><{}()\[\]#@!$%^&]{1,32}/,
  focusSpan = document.querySelector("#focus-span"),
  focusToggler = document.querySelector("#focus-toggle");

function showFocus() {
  showFocusLabel.textContent = userInfo.focus;
  getFocusInput.value = userInfo.focus;
  focusSpan.style.visibility = "visible";
  focusSpan.style.opacity = "1";
}

// congratulates user if focus is checked out
showFocusCheckbox.addEventListener("click", () => {
  const congratulate = document.querySelector("#congratulate");
  let jobDonePat = [
      "Well done!",
      "Great job!",
      "Nicely done.",
      "Good job!",
      "A pat on the back for ya!",
      "Amazing!",
      "Keep up the good work!",
      "Let's keep it rolling!",
      "That's done!",
      "SKRRRRRT",
      "Gagi pare, galing!",
      "sheeeeEEEEEESHHH!",
      "#NeverForget",
    ],
    patPicker = Math.floor(Math.random() * jobDonePat.length);
  if (showFocusCheckbox.checked === true) {
    congratulate.style.opacity = "1";
    congratulate.textContent = jobDonePat[patPicker];
    setTimeout(() => {
      congratulate.style.opacity = "0";
    }, 2000);
  }
});

// get value of checkbox if checked or not and store it in localStorage
showFocusCheckbox.addEventListener("change", () => {
  if (showFocusCheckbox.checked) {
    userInfo["focusCheckbox"] = true;
    updateLocalStorage();
  } else {
    userInfo["focusCheckbox"] = false;
    updateLocalStorage();
  }
});

// gets today's focus value and update value of label for checkbox. updates value of localStorage if focus is changed
// added: now also disables input field and add a userInfo key for disabled input value in localStorage
getFocusButton.addEventListener("click", () => {
  if (focusPattern.test(getFocusInput.value)) {
    let hoursLeft = 24 - currentDateTime.getHours(),
      millisecondsLeft = hoursLeft * 3600000;
    userInfo["focus"] = getFocusInput.value;
    userInfo["focusExpiration"] = currentDateTime.getTime() + millisecondsLeft;
    userInfo["focusInputDisabled"] = true;
    getFocusInput.disabled = true;
    showFocus();
    updateLocalStorage();

    // styling codes
    // shows the main focus, hides focus question
    // (forward animation)
    focusQuestion.style.visibility = "hidden";
    focusQuestion.style.opacity = "0";
    mainFocus.style.visibility = "visible";
    mainFocus.style.opacity = "1";
    getFocusButton.style.visibility = "hidden";

    focusSpan.style.visibility = "visible";
    focusSpan.style.opacity = "1";
  } else {
    console.log("invalid focus");
  }
});

// edit focus (makes focus editable)
const editFocusButton = document.querySelector("#edit-focus button");

// function to make the input editable
function editFocus() {
  getFocusInput.disabled = false;
}

// calls the function to edit the focus
editFocusButton.addEventListener("click", () => {
  editFocus();

  // styling codes
  // hides the main focus, shows focus question
  // (backwards animation)
  focusQuestion.style.visibility = "visible";
  focusQuestion.style.opacity = "1";
  mainFocus.style.visibility = "hidden";
  mainFocus.style.opacity = "0";
  getFocusButton.style.visibility = "visible";
  getFocusButton.style.opacity = "1";

  focusSpan.style.visibility = "hidden";
  focusSpan.style.opacity = "0";
  focusToggler.checked = false;
});

// clear focus
const clearFocusButton = document.querySelector("#clear-focus button");

// a funnction that clears the focus
function clearFocus() {
  // resets every focus values
  userInfo.focusExpiration = "";
  userInfo.focus = "";
  userInfo.focusCheckbox = false;
  showFocusCheckbox.checked = false;
  userInfo.focusInputDisabled = false;
  getFocusInput.disabled = false;
  showFocus();
  updateLocalStorage();

  // styling codes
  // hides the main focus, shows focus question
  // (backwards animation)
  focusQuestion.style.visibility = "visible";
  focusQuestion.style.opacity = "1";
  mainFocus.style.visibility = "hidden";
  mainFocus.style.opacity = "0";
  getFocusButton.style.visibility = "hidden";
  getFocusButton.style.opacity = "0";

  focusSpan.style.visibility = "hidden";
  focusSpan.style.opacity = "0";
  focusToggler.checked = false;
}

// calls the function on click
clearFocusButton.addEventListener("click", () => {
  clearFocus();
});

//**************************************************************************//
//**************************************************************************//
// there should be three functions
// 1. function upon submission/button click will store the input value to object userInfo
// 2. function that will update document with userInfo
// 3. function that will update localStorage [checked]
//**************************************************************************//
//**************************************************************************//

// checks the localStorage, if null = first time visitor => will use default userInfo values
if (storageItem) {
  // gets localStorage values as userInfo values
  userInfo = storageItem;

  // styling codes
  // hides setup page and shows main content only
  // (forwards animation - no backwards animation)
  setupPage.style.visibility = "hidden";
  setupPage.style.opacity = "0";
  mainContent.style.visibility = "visible";
  mainContent.style.opacity = "1";

  if (userInfo.focus) {
    // styling codes
    // shows the main focus, hides focus question
    // (forward animation)
    focusQuestion.style.visibility = "hidden";
    focusQuestion.style.opacity = "0";
    mainFocus.style.visibility = "visible";
    mainFocus.style.opacity = "1";
  }
  if (userInfo.focus === "" || userInfo.focus === undefined) {
    // styling codes
    // hides the main focus, shows focus question
    // (backward animation)
    focusQuestion.style.visibility = "visible";
    focusQuestion.style.opacity = "1";
    mainFocus.style.visibility = "hidden";
    mainFocus.style.opacity = "0";
  }

  // gets time format preference from localStorage
  if (storageItem["time-format"] === true) {
    timeSwitcher.checked = true;
    clearInterval(timeDisplay);
    timeDisplay = setInterval(() => {
      timeDiv.textContent = new Date().toLocaleTimeString("PH", {
        hour12: false,
      });
    }, timeInterval);
  }

  // show greeting with localStorage name value
  // 36000000 = 1hr
  setInterval(greet(), 3600000);
  // show focus with localStorage focus value
  if (userInfo.focus) {
    showFocus();
  }
  // if focus has value, it disables the input
  if (userInfo.focusInputDisabled === true) {
    getFocusInput.disabled = true;
  }
  // check if focus is expired
  if (currentDateTime.getTime() < storageItem.focusExpiration) {
    // if not expired, checks if focusCheckbox is checked
    if (storageItem["focusCheckbox"] === true) {
      showFocusCheckbox.checked = true;
    }
  }
  if (currentDateTime.getTime() > storageItem.focusExpiration) {
    // if expired, resets every focus value if focus has expired
    clearFocus();
  }
}

let myQuotes = [
  '"The only way to learn to code is to write a lot of code". -Aristoteles',
  "“Experience is the name everyone gives to their mistakes.” – Oscar Wilde",
];
let storedQuotes = JSON.parse(localStorage.getItem("myQuotes"));
const inputQts = document.getElementById("input-qts");
const quotesEl = document.getElementById("quotes-el");
const viewBtn = document.getElementById("view-btn");
const saveBtn = document.getElementById("save-btn");
const addBtn = document.getElementById("add-btn");
const closeBtn = document.getElementById("close-btn");
const cancelBtn = document.getElementById("cancel-btn");
const formAddNew = document.getElementById("popup-window");
const addWindow = document.getElementById("addWindow");
const ulEl = document.getElementById("ul-el");

console.log(myQuotes);

if (storedQuotes) {
  myQuotes = storedQuotes;
  quotesEl.textContent = myQuotes[0];
  renderQuotes();
  formAddNew.style.display = "none";
}

function saveqts() {
  myQuotes.push(inputQts.value);
  inputQts.value = "";
  localStorage.setItem("myQuotes", JSON.stringify(myQuotes));
  addWindow.style.display = "none";
  ulEl.style.display = "block";
  renderQuotesAll();
}

function renderQuotesAll() {
  let listItems = "";
  for (let i = 0; i < myQuotes.length; i++) {
    listItems += `
          <li>
              <p>
                  ${myQuotes[i]}
              </p>
          </li>
      `;
  }
  ulEl.innerHTML = listItems;
}

closeBtn.addEventListener("click", () => {
  formAddNew.style.display = "none";
});

addBtn.addEventListener("click", () => {
  addWindow.style.display = "block";
  ulEl.style.display = "none";
});

viewBtn.addEventListener("click", () => {
  formAddNew.style.display = "block";
  addWindow.style.display = "none";
  renderQuotesAll();
});

cancelBtn.addEventListener("click", () => {
  addWindow.style.display = "none";
  inputQts.value = "";
  ulEl.style.display = "block";
});

function renderQuotes() {
  setInterval(() => {
    let randomQuotes = Math.floor(Math.random() * myQuotes.length);
    for (i = 0; i < myQuotes.length; i++) {
      quotesEl.textContent = myQuotes[randomQuotes];
    }
  }, 3000);
}

cancelBtn.addEventListener("click", () => {
  formAddNew.style.display = "none";
  inputQts.value = "";
});

// To do List functions
// test/
//modal
const modal = document.querySelector("#modal");

document.querySelector(".to-do-btn").addEventListener("click", () => {
  modal.style.display = "block";
});

document.querySelector(".close-modal").addEventListener("click", () => {
  modal.style.display = "none";
});

//form

const taskInput = document.querySelector(".task-input");
const addButton = document.querySelector(".add-task");
const todoList = document.querySelector(".todo-list");
const menuOption = document.querySelector(".menu-option");

//events
document.addEventListener("DOMContentLoaded", getTasks);
addButton.addEventListener("click", addTask);
todoList.addEventListener("click", deleteTask);
menuOption.addEventListener("click", filterMenu);

function addTask(event) {
  //stops submission
  event.preventDefault();
  //tasks div
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  //creation of list
  const newTask = document.createElement("li");
  newTask.innerText = taskInput.value;
  newTask.classList.add("task-items");
  taskDiv.appendChild(newTask);
  //Tasks to localstorage
  saveLocalTasks(taskInput.value);
  //check button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = "\u2714";
  completeButton.classList.add("complete-btn");
  taskDiv.appendChild(completeButton);
  //trash button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.classList.add("delete-btn");
  taskDiv.appendChild(deleteButton);
  //back to list
  todoList.appendChild(taskDiv);
  //clear input
  taskInput.value = "";
}

function deleteTask(e) {
  const item = e.target;

  // Delete from list
  if (item.classList[0] === "delete-btn") {
    const task = item.parentElement;
    //transition
    task.classList.add("yeet");
    removeLocalTasks(task);
    task.addEventListener("transitionend", function () {
      task.remove();
    });
  }

  // Done task
  if (item.classList[0] === "complete-btn") {
    const task = item.parentElement;
    task.classList.toggle("done");
  }
}

//menu filter
function filterMenu(e) {
  const tasks = todoList.childNodes;
  tasks.forEach(function (task) {
    switch (e.target.value) {
      case "all":
        task.style.display = "flex";
        break;
      case "complete":
        if (task.classList.contains("done")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
      case "pending":
        if (!task.classList.contains("done")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
    }
  });
}

//check the storage
function saveLocalTasks(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  //check the storage
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    //tasks div
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    //creation of list
    const newTask = document.createElement("li");
    newTask.innerText = task;
    newTask.classList.add("task-items");
    taskDiv.appendChild(newTask);
    //check button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = "\u2714";
    completeButton.classList.add("complete-btn");
    taskDiv.appendChild(completeButton);
    //trash button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.classList.add("delete-btn");
    taskDiv.appendChild(deleteButton);
    //back to list
    todoList.appendChild(taskDiv);
  });
}

function removeLocalTasks(task) {
  //check the storage
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  const taskIndex = task.children[0].innerText;
  tasks.splice(tasks.indexOf(taskIndex), 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
