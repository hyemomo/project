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
const input = document.querySelector("input")
const todoButton = document.querySelector("button")
const todoList = document.querySelector("ul")


let currentDate = new Date();
renderCalendar(currentDate);
showMain(currentDate);
initializeLocalStorage();


todoButton.addEventListener("click", addTodo)
calendar.addEventListener("click", dateClick)


function initializeLocalStorage() {
  const storedTodos = JSON.parse(localStorage.getItem('todos')) || {};
  const key = getFormattedDate(currentDate);
  if (storedTodos[key]) {
    storedTodos[key].forEach(todo => {
      addTodoToDOM(todo);
    });
  }
}
function dateClick(e) { 
  if (e.target.className === 'date' && e.target.textContent.trim() !== "") {

    const selectedDate = parseInt(e.target.textContent);
    currentDate.setDate(selectedDate);
    showMain(currentDate)
    initializeLocalStorage()
    // ////////////////////////////////addTodoToDOM(localStorage.todos[currentDate])
    showCircle(e);
  }
}

function addTodoToDOM(todoText) {
  let li = document.createElement('li')
  li.textContent=input.value
  li.classList.add('todo')
    todoList.append(li)
 }
function getFormattedDate(date) { //YYYY-MM-DD 되도록 만듬
  const year = date.getFullYear(); //2024
  const month = String(date.getMonth() + 1).padStart(2, '0'); //09 04 10 12 이렇게 됨
  const day = String(date.getDate()).padStart(2, '0'); //23 ,31...
   return `${year}-${month}-${day}`;
  
}


function addTodo() { 
  const todoText = input.value.trim();


  if (todoText !== '') { 
    const key = getFormattedDate(currentDate);
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || {}; //todos라는 key를 읽기
    if (!storedTodos[key]) { 
      storedTodos[key]=[]
    }
    storedTodos[key].push(todoText);
    localStorage.setItem('todos', JSON.stringify(storedTodos))
    addTodoToDOM(todoText)

  }
  input.value = ''
  //ㅌ투두 아이템을 화면에 추가하는 함수
  console.dir(localStorage.todos)
}
myStorage = window.localStorage;

localStorage.setItem("hyemin", "tom")
console.log(myStorage)



function renderCalendar (date) {
  // 달력 보여주기

  const year = date.getFullYear();
  const month = date.getMonth();

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
    //다음달 1 2 3
    dates.push(" ");
  }
  console.log(dates)
  dates.forEach((date, index) => {
    dates[index] = `<div class="date" id=${index}>${date}</div>`;
  });
  calendar.setAttribute("id", `${year}${month}`);
  calendar.innerHTML = dates.join("");
};
function showMain(date)  {
  const todayDay = date.getDay();
  const todayDate = date.getDate();

  document.querySelector(".main-day").textContent = dayList[todayDay];
  document.querySelector(".main-date").textContent = todayDate;
};
function showCircle(e){
  if (e.target.className === "date") {
    let dates = document.querySelectorAll(".date");

    dates.forEach((i) => {
      i.classList.remove("active");
    });
    e.target.classList.add("active");
  }
  const selectedDate = parseInt(e.target.textContent); // 선택된 날짜
  currentDate.setDate(selectedDate);
  showMain(currentDate);initializeLocalStorage()
};

function prevMonth  () {
  date.setDate(1);
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
};
function nextMonth  () {
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
};

