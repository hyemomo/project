const date = new Date();




const renderCalendar=()=>{ // 달력 보여주기




const year = date.getFullYear();
const month = date.getMonth();
console.log(date.getDay());

document.querySelector(".year-month").textContent = `${year}년 ${month + 1}월 `;
//month는 0부터!!0이 1월부터!

const prevLast = new Date(year, month, 0); //지난 달의 마지막 날!
//console.log(prevLast)
//Sun Jun 30 2024 00:00:00 GMT+0900 (한국 표준시)
const thisLast = new Date(year, month + 1, 0); //이번 달의 마지막 날

const prevLast_Date = prevLast.getDate(); //지난 달의 마지막 날(31)
const prevLast_Day = prevLast.getDay(); //지난 달의 마지막 요일(일요일 0번)
console.log(prevLast_Day);

const thisLast_Date = thisLast.getDate();
//console.log(thisLast_Date) //31 ,이번 달의 마지막 날
const thisLast_Day = thisLast.getDay(); //이번 달의 마지막 요일 (수요일 3번)

const prevDates = [];
const thisDates = [...Array(thisLast_Date + 1).keys()].slice(1);
// console.log(...Array(thisLast_Date + 1).keys());
//0부터 31까지 배열에 담김
const nextDates = [];
//달력 합치기

if (prevLast_Day !== 6) {
  for (let i = 0; i < prevLast_Day + 1; i++) {
    prevDates.unshift(prevLast_Date - i); //31,30,29..
  }
}
for (let i = 1; i < 7 - thisLast_Day; i++) {
  //다음달 1 2 3
  nextDates.push(i);
}

const dates = prevDates.concat(thisDates, nextDates);
//지난 달 이번 달 다음 달 합쳐주기
console.log(dates)
dates.forEach((date, i) => {
  console.log(date);
  dates[i] = `<div class="date">${date}</div>`;
});
document.querySelector(".dates").innerHTML = dates.join("");




}


renderCalendar();

const go_prev = document.querySelector(".go-prev");
const go_next = document.querySelector(".go-next");


