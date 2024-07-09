const dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthList = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May.",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];

let calendar = document.querySelector(".calendar");
const inputTime = document.querySelector(".input-time");

const inputText = document.querySelector(".input-text");
const todoButton = document.querySelector("button");
const todoList = document.querySelector("ul");

let currentDate = new Date();
localStorage.clear();
renderCalendar(currentDate);
showMain(currentDate);
initializeLocalStorage();
todayCircle();

todoButton.addEventListener("click", addTodo);
calendar.addEventListener("click", dateClick);
todoList.addEventListener("click", xmarkClick);

/*x 클릭 시 로컬스토리지에서 지우는 함수 만들어야함 */
//근데 로컬스토리지에서만 지운 다음에 다시 initialLocalStorage()하면 되는 거 아닐까
function xmarkClick(e) {
  if (e.target.matches("i.fa-solid.fa-xmark")) {
    const li = e.target.parentNode;
  
    const todo = li.querySelector("span.todo").textContent.trim();
    let [todoTime, todoText] = todo.split(" ")
    console.log(todoText)
    //해야할 것! 로컬스토리지에서 지우기

    const key = getFormattedDate(currentDate);
    let storedTodos = JSON.parse(localStorage.getItem("todos")) || {};
    if (storedTodos[key]) { 
console.dir(storedTodos[key])
      storedTodos[key]= storedTodos[key].filter(todo=>todo.todoText !==todoText)
console.dir(storedTodos[key])
   
      localStorage.setItem("todos", JSON.stringify(storedTodos))
initializeLocalStorage()  } }


    
}

//
function todayCircle() {
  let id = currentDate.getDate();
  let todayElement = document.querySelector(`#date${id}`);
  if (todayElement) {
    todayElement.classList.add("active");
  }
}
function initializeLocalStorage() {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || {};
  const key = getFormattedDate(currentDate);
  todoList.innerHTML = "";

  console.log(storedTodos[key]);
  if (storedTodos[key]) {
    storedTodos[key].forEach((todo) => {
      addTodoToMain(todo);
    });
  }
}
function dateClick(e) {
  if (e.target.className === "date" && e.target.textContent.trim() !== "") {
    const selectedDate = parseInt(e.target.textContent);
    if (selectedDate !== currentDate) {
      currentDate.setDate(selectedDate);
      showMain(currentDate);
      initializeLocalStorage();
    }
    showCircle(e);
  }
}
function addTodoToMain(todo) {
  let li = document.createElement("li");
  let xmarkIcon = document.createElement("i");
  let span = document.createElement("span");
  span.textContent = todo.todoTime + " " + todo.todoText;
  span.classList.add("todo");
  xmarkIcon.classList.add("fa-solid", "fa-xmark");
  li.append(span);
  li.append(xmarkIcon);
  todoList.append(li);
}
function getFormattedDate(date) {
  //YYYY-MM-DD 되도록 만듬
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function addTodo() {
  const todoText = inputText.value.trim();
  const todoTime = inputTime.value;
  if (todoText == "") {
    alert("할일을 적어주세요");
  } else {
    //시간을 어떤 식으로 넣어야하는 지 모르겠다.
    const key = getFormattedDate(currentDate);
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || {}; //todos라는 key를 읽기
    if (!storedTodos[key]) {
      storedTodos[key] = [];
    }
    console.log(todoTime);
    console.log(storedTodos);
    storedTodos[key].push({ todoTime: todoTime, todoText: todoText });
    localStorage.setItem("todos", JSON.stringify(storedTodos));
    initializeLocalStorage();
  }
  inputText.value = "";
}
function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  document.querySelector(".year-month").textContent =
    monthList[month] + " " + year;

  const prevLast = new Date(year, month, 0);
  const thisLast = new Date(year, month + 1, 0);
  const prevLast_Date = prevLast.getDate();
  const prevLast_Day = prevLast.getDay();
  const thisLast_Date = thisLast.getDate();
  const thisLast_Day = thisLast.getDay();

  let dates = [];
  if (prevLast_Day !== 6) {
    for (let i = 0; i < prevLast_Day + 1; i++) {
      dates.push(" ");
    }
  }
  for (let i = 1; i < thisLast_Date + 1; i++) {
    dates.push(i);
  }
  for (let i = 1; i < 7 - thisLast_Day; i++) {
    dates.push(" ");
  }
  dates.forEach((date, index) => {
    dates[index] = "<div class='date' id=date" + index + ">" + date + "</div>";
  });
  calendar.setAttribute("id", year + "" + month);
  calendar.innerHTML = dates.join("");
}
function showMain(date) {
  const todayDay = date.getDay();
  const todayDate = date.getDate();

  document.querySelector(".main-day").textContent = dayList[todayDay];
  document.querySelector(".main-date").textContent = todayDate;
}
function showCircle(e) {
  if (e.target.className === "date") {
    let dates = document.querySelectorAll(".date");

    dates.forEach((i) => {
      i.classList.remove("active");
    });
    e.target.classList.add("active");
  }
  const selectedDate = parseInt(e.target.textContent); // 선택된 날짜
  currentDate.setDate(selectedDate);
  showMain(currentDate);
  initializeLocalStorage();
}
function prevMonth() {
  currentDate.setDate(1);
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}
function nextMonth() {
  currentDate.setDate(1);
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}
