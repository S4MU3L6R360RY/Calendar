const currentDate = document.querySelector(".current-date"),
      daysTag = document.querySelector(".days"),
      prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
    currentYear = date.getFullYear(),
    currentMonth = date.getMonth();

console.log(date, currentMonth, currentYear);

const monthNames = [
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
  "December"
];

function renderCalendar()   {

    let firstDayofMonth = new Date(currentYear, currentMonth, 1).getDay(),
        lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate(),
        lastDateofPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
        lastDayofMonth = new Date(currentYear, currentMonth, lastDateofMonth).getDay();

    console.log("first day of month", firstDayofMonth);
    console.log("last date of month", lastDateofMonth);
    console.log("last date of previous month", lastDateofPrevMonth)
    console.log("last day of month ", lastDayofMonth);

    let liTag = "";

    for(let i = firstDayofMonth; i > 0; i--)   {
        liTag += `<li class="inactive">${lastDateofPrevMonth - i + 1}</li>`;
    }

    for(let i = 1; i <= lastDateofMonth; i++)   {
        //console.log(i)

        let isToday = 1 === date.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date.getFullYear() ? "active" : "";

        console.log("today: ", isToday);

        liTag += `<li class=${isToday}>${i}</li>`;

    }

    for(let i = lastDayofMonth; i < 6; i++)   {
        liTag += `<li class="inactive">${i - lastDateofPrevMonth + 1}</li>`;
    }

    currentDate.innerText = `${monthNames[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTag;

}

renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        //console.log(icon);
        currentMonth = icon.id === "prev" ? currentMonth - 1 : currentMonth + 1;

        if(currentMonth < 0 || currentMonth > 11)   {
            date = new Date(currentYear, currentMonth);
            currentYear = date.getFullYear();
            currentMonth = date.getMonth();
        }   else    {
            date = new Date();
        }

        renderCalendar();
    });
});
