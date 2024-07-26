let calendar = document.querySelector(".calendar");
const inputTime = document.querySelector(".input-time");
const inputText = document.querySelector(".input-text");
const todoButton = document.querySelector("button");
const todoList = document.querySelector("ul");
const todayButton= document.querySelector(".go-today")
let currentDate = moment();
renderCalendar(currentDate);
showMain(currentDate);
initializeLocalStorage();
todayCircle();

todoButton.addEventListener("click", addTodo);
calendar.addEventListener("click", dateClick);
todoList.addEventListener("click", deleteBtnClick);
todayButton.addEventListener("click", goToday)
/* 삭제 버튼 클릭 시 todo 삭제하는 함수 */
function deleteBtnClick(e) {
  if (e.target.matches(".todo-delete-btn")) {
    const todo = e.target.parentNode;
    const todoTime = todo.querySelector(".todo-time").textContent;
    const todoText = todo.querySelector(".todo-text").textContent;
    const key = moment(currentDate).format("YYYY-MM-DD");
    let storedTodos = JSON.parse(localStorage.getItem("todos")) || {};
    if (storedTodos[key]) {
      storedTodos[key] = storedTodos[key].filter(
        (todo) => todo.todoText !== todoText || todo.todoTime !== todoTime
      ); //이름이 같고 시간이 같으면 삭제됨
    }
    localStorage.setItem("todos", JSON.stringify(storedTodos)); //로컬스토리지에 저장
    initializeLocalStorage();
  }
}
/*오늘 날짜를 원으로 표시하는 함수*/
function todayCircle() {
  let todayElement = document.querySelector("#date" + currentDate.date());
  if (todayElement) {
    todayElement.classList.add("active");
  }
}
/*로컬스토리지 초기화 함수*/
function initializeLocalStorage() {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || {};
  const key = moment(currentDate).format("YYYY-MM-DD");
  todoList.innerHTML = "";
  if (storedTodos[key]) {
    storedTodos[key].forEach((todo) => {
      addTodoToMain(todo);
    });
  }
}
/*날짜 클릭 시 동작하는 함수 */
function dateClick(e) {
  if (e.target.className === "date" && e.target.textContent.trim() !== "") {
    const selectedDate = parseInt(e.target.textContent);
    if (selectedDate !== currentDate) {
      //새로운 날짜를 클릭했을 때 현재 날짜를 선택한 날짜로 바꿔준다.
      currentDate.date(selectedDate);
      showMain(currentDate);
      initializeLocalStorage();
    }
    showCircle(e);
  }
}
/*메인에 할 일을 추가하는 함수 */
function addTodoToMain(todo) {
  let li = document.createElement("li");
  let xmarkIcon = document.createElement("i");
  let timeSpan = document.createElement("span");
  let textSpan = document.createElement("span");

  timeSpan.textContent = todo.todoTime;
  textSpan.textContent = todo.todoText;

  li.classList.add("todo");
  timeSpan.classList.add("todo-time");
  textSpan.classList.add("todo-text");
  xmarkIcon.classList.add("todo-delete-btn", "fa-solid", "fa-xmark");

  li.append(timeSpan);
  li.append(textSpan);
  li.append(xmarkIcon);
  todoList.append(li);
}
/*할 일을 추가하는 함수 */
function addTodo() {
  const todoText = inputText.value.trim();
  const todoTime = inputTime.value;
  //할 일이 비어있거나 시간이 선택되지 않으면 경고창을 띄움
  if (todoText === "" || todoTime === "") {
    if (todoText === "") {
      alert("Please write down the task.");
      return;
    }
    if (todoTime === "") alert("Please select a time!");
  } else {
    //로컬스토리지에 "todos"가 없으면 빈 객체로 초기화
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || {};
    const key = moment(currentDate).format("YYYY-MM-DD");
    //해당 날짜의 할 일 목록이 없으면 빈 배열로 초기화
    if (!storedTodos[key]) {
      storedTodos[key] = [];
    }
    //해당 날짜에 할 일 목록을 추가 {시간: 할일}
    storedTodos[key].push({ todoTime: todoTime, todoText: todoText });
    localStorage.setItem("todos", JSON.stringify(storedTodos)); //로컬스토리지에 저장
    initializeLocalStorage();
  }
  inputText.value = "";
  inputTime.value = "";
}
/* 캘린더를 렌더링하는 함수 */
function renderCalendar() {
  const year = moment(currentDate).format("YYYY");
  const month = moment(currentDate).format("MM");
  document.querySelector(".year-month").textContent =
    moment(currentDate).format("MMM.") + " " + year;
  const prevLast_Day = moment(currentDate)
    .subtract(1, "M")
    .endOf("month")
    .format("e");
  const thisLast_Date = moment(currentDate).endOf("month").format("D");
  const thisLast_Day = moment(currentDate).endOf("month").format("e");
  let dates = [];
  if (prevLast_Day !== 6) {
    //이전 달의 마지막 요일이 토요일이 아니면 빈 날짜를 dates에 추가한다.
    for (let i = 0; i < parseInt(prevLast_Day) + 1; i++) {
      dates.push(" ");
    }
  }
  for (let i = 1; i < parseInt(thisLast_Date) + 1; i++) {
    //현재 달의 날짜를 dates에 추가
    dates.push(i);
  }
  for (let i = 1; i < 7 - parseInt(thisLast_Day); i++) {
    //현재 달의 마지막 요일이 토요일이 아니면 빈 날짜를 dates에 추가한다.
    dates.push(" ");
  }
  dates.forEach((date, index) => {
    dates[index] = "<div class='date' id=date" + index + ">" + date + "</div>";
  });
  calendar.setAttribute("id", year + "" + month);
  calendar.innerHTML = dates.join("");
}
/*메인 화면을 표시하는 함수 */
function showMain(date) {
  document.querySelector(".main-date").style.color = "black";
  document.querySelector(".main-day").textContent = date.format("dddd");
  document.querySelector(".main-date").textContent = date.format("D");
}
/*선택된 날짜를 원으로 표시하는 함수*/
function showCircle(e) {
  if (e.target.className === "date") {
    let dates = document.querySelectorAll(".date");
    dates.forEach((i) => {
      i.classList.remove("active");
    });
    e.target.classList.add("active");
  }
}
/*이전 달로 이동하는 함수 */
function prevMonth() {
  currentDate.date(1).subtract(1, "months");
  renderCalendar();
}
/*다음 달로 이동하는 함수 */
function nextMonth() {
  currentDate.date(1).add(1, "months");
  renderCalendar();
}
/*오늘로 이동하는 함수 */
function goToday() {

currentDate=moment()
  renderCalendar()
  showMain(currentDate)
  todayCircle()

}