document.addEventListener("DOMContentLoaded", () => {
    const monthYear = document.getElementById("month-year");
    const daysContainer = document.querySelector(".days");
    const backBtn = document.getElementById("back-btn");
    const dayView = document.querySelector(".day-view");
    const monthView = document.querySelector(".month-view");
    const selectedDateText = document.getElementById("selected-date");
    const addEventBtn = document.getElementById("add-event");
    const eventList = document.getElementById("event-list");
    const eventWidget = document.getElementById("event-count");
    const eventForm = document.getElementById("event-form");
    const eventTitleInput = document.getElementById("event-title");
    const startTimeInput = document.getElementById("start-time");
    const endTimeInput = document.getElementById("end-time");
    const saveEventBtn = document.getElementById("save-event");

    let currentDate = new Date();
    let today = new Date();
    let events = {};

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        monthYear.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;
        daysContainer.innerHTML = "";

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            daysContainer.innerHTML += '<div></div>';
        }

        for (let day = 1; day <= lastDate; day++) {
            let dayDiv = document.createElement("div");
            dayDiv.textContent = day;

            if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                dayDiv.classList.add("current-day");
            }

            dayDiv.addEventListener("click", () => openDayView(day, month, year));
            daysContainer.appendChild(dayDiv);
        }
    }

    function openDayView(day, month, year) {
        selectedDateText.textContent = `${new Date(year, month, day).toDateString()}`;
        monthView.style.display = "none";
        dayView.classList.add("visible");
        eventForm.classList.add("hidden");
        renderEvents(day, month, year);
    }

    function renderEvents(day, month, year) {
        eventList.innerHTML = "";
        let dateKey = `${year}-${month}-${day}`;
        if (events[dateKey]) {
            events[dateKey].forEach(event => {
                let li = document.createElement("li");
                li.textContent = `${event.title} (${event.startTime} - ${event.endTime})`;
                eventList.appendChild(li);
            });
        }
    }

    function updateWidgets() {
        let totalEvents = Object.values(events).reduce((sum, arr) => sum + arr.length, 0);
        eventWidget.textContent = totalEvents;
    }

    addEventBtn.addEventListener("click", () => {
        eventForm.classList.toggle("hidden");
    });

    saveEventBtn.addEventListener("click", () => {
        let title = eventTitleInput.value.trim();
        let startTime = startTimeInput.value;
        let endTime = endTimeInput.value;

        if (title && startTime && endTime) {
            let dateKey = selectedDateText.textContent;
            if (!events[dateKey]) events[dateKey] = [];
            events[dateKey].push({ title, startTime, endTime });
            renderEvents(...dateKey.split('-'));
            updateWidgets();
            eventForm.classList.add("hidden");
            eventTitleInput.value = "";
            startTimeInput.value = "";
            endTimeInput.value = "";
        }
    });

    backBtn.addEventListener("click", () => {
        monthView.style.display = "block";
        dayView.classList.remove("visible");
    });

    document.getElementById("prev-month").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById("next-month").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
    updateWidgets();
});
