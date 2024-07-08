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

todoButton.addEventListener("click", () => { 
  console.log(input.value)
  if (input.value !== '') { 
    let li = document.createElement('li')
  li.textContent=input.value
  li.classList.add('todo')
  todoList.append(li)
  }
  input.value=''
})



const renderCalendar = () => {
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
const showMain = () => {
  const todayDay = date.getDay();
  const todayDate = date.getDate();

  document.querySelector(".main-day").textContent = dayList[todayDay];
  document.querySelector(".main-date").textContent = todayDate;
};
const showCircle = (e) => {
  if (e.target.className === "date") {
    let dates = document.querySelectorAll(".date");

    dates.forEach((i) => {
      i.classList.remove("active");
    });
    e.target.classList.add("active");
  }
  const selectedDate = parseInt(e.target.textContent); // 선택된 날짜
  date.setDate(selectedDate);
  showMain();
};

const prevMonth = () => {
  date.setDate(1);
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
};
const nextMonth = () => {
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
};

let date = new Date();
renderCalendar();
showMain();

calendar.addEventListener("click", (e) => {
  if (e.target.className === 'date' && e.target.textContent !== " ") showCircle(e);
});
