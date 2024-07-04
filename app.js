const date = new Date();


const year = date.getFullYear();
const month = date.getMonth()
console.log(date.getDay())

document.querySelector('.date').textContent= `${year}년 ${month+1}월 `
//month는 0부터!!0이 1월부터!
const prevLast = new Date(year, month, 0) //지난 달의 마지막 날!
//console.log(prevLast)
//Sun Jun 30 2024 00:00:00 GMT+0900 (한국 표준시)
const thisLast = new Date(year, month+1, 0); //이번 달의 마지막 날

const prevLast_Date = prevLast.getDate();
const prevLast_Day= prevLast.getDay()+1;

const thisLast_Date= thisLast.getDate();
//console.log(thisLast_Date) //31 ,이번 달의 마지막 날
const thisLast_Day= thisLast.getDay()+1;



const prevDates = [];
const thisDates=[];
const nextDate=[];