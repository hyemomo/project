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
const input = document.querySelector("input");
const todoButton = document.querySelector("button");
const todoList = document.querySelector("ul");

let currentDate = new Date();
localStorage.clear();
renderCalendar(currentDate);
showMain(currentDate);
initializeLocalStorage();
console.log(calendar);
todayCircle()
todoButton.addEventListener("click", addTodo);
calendar.addEventListener("click", dateClick);


function todayCircle() {
  console.log(calendar);
  console.log(currentDate.getDate());
  console.log(calendar.childNodes);
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
  //날짜 선택했을 때
  if (e.target.className === "date" && e.target.textContent.trim() !== "") {
    const selectedDate = parseInt(e.target.textContent); //15일을 선택 했으면

    if (selectedDate !== currentDate) {
      //현재 날짜랑 다른 날짜를 선택했으면

      currentDate.setDate(selectedDate); // 선택한 날짜로 바꿈
      showMain(currentDate); //Main 바꿈
      initializeLocalStorage();
    }

    showCircle(e); //캘린더에 동그라미
  }
}

function addTodoToMain(todoText) {
  //  Main에 투두리스트 적음

  console.dir(todoList);
  let li = document.createElement("li");
  li.textContent = todoText;
  li.classList.add("todo");
  todoList.append(li); //<li class="todo"> 우산 사기 </li>
}
function getFormattedDate(date) {
  //YYYY-MM-DD 되도록 만듬
  const year = date.getFullYear(); //2024
  const month = String(date.getMonth() + 1).padStart(2, "0"); //09 04 10 12 이렇게 됨
  const day = String(date.getDate()).padStart(2, "0"); //23 ,31...
  return `${year}-${month}-${day}`;
}

function addTodo() {
  const todoText = input.value.trim();

  if (todoText !== "") {
    const key = getFormattedDate(currentDate);
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || {}; //todos라는 key를 읽기
    if (!storedTodos[key]) {
      storedTodos[key] = [];
    }
    storedTodos[key].push(todoText);
    localStorage.setItem("todos", JSON.stringify(storedTodos));
    addTodoToMain(todoText);
  }
  input.value = "";
  //ㅌ투두 아이템을 화면에 추가하는 함수
  console.dir(localStorage.todos);
}
myStorage = window.localStorage;

localStorage.setItem("hyemin", "tom");
console.log(myStorage);

function renderCalendar(date) {
  // 달력 보여주기

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  document.querySelector(
    ".year-month"
  ).textContent = ` ${monthList[month]} ${year} `;
  //month는 0부터!!0이 1월부터!

  const prevLast = new Date(year, month, 0); //지난 달의 마지막 날 date객체
  const thisLast = new Date(year, month + 1, 0); //이번 달의 마지막 날 date객체

  const prevLast_Date = prevLast.getDate(); //지난 달의 마지막 날의 날짜   (31)
  const prevLast_Day = prevLast.getDay(); //지난 달의 마지막 날의 요일    (일요일 0번)
  const thisLast_Date = thisLast.getDate(); //이번 달의 마지막 날의 날짜    (31)
  const thisLast_Day = thisLast.getDay(); //이번 달의 마지막 요일     (수요일 3번)

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
  console.log(dates);
  dates.forEach((date, index) => {
    dates[index] = `<div class="date" id=date${index}>${date}</div>`;
  });
  calendar.setAttribute("id", `${year}${month}`);
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
