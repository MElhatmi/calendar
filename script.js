document.addEventListener("DOMContentLoaded", function () {
  const calendarDays = document.getElementById("calendarDays");
  const monthYear = document.getElementById("monthYear");
  const prevMonth = document.getElementById("prevMonth");
  const nextMonth = document.getElementById("nextMonth");

  let currentDate = new Date();

  // Array of dates to be highlighted (assuming they are in YYYY-MM-DD format)
  const highlightedDates = ["2024-07-09", "2024-07-15", "2024-07-25"];

  function renderCalendar(date) {
    // Remove all child nodes from calendarDays
    while (calendarDays.firstChild) {
      calendarDays.removeChild(calendarDays.firstChild);
    }

    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDateOfMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();

    const lastDateOfPrevMonth = new Date(
      currentYear,
      currentMonth,
      0
    ).getDate();

    monthYear.textContent = date.toLocaleString("default", {
      month: "long",
    });

    // Adjust first day to start from Saturday (shift to Saturday-based week)
    const adjustedFirstDay = (firstDayOfMonth + 1) % 7;

    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      const prevDayDiv = document.createElement("div");
      prevDayDiv.textContent = lastDateOfPrevMonth - i;
      prevDayDiv.classList.add("calendar-day", "prev-month-day");
      calendarDays.appendChild(prevDayDiv);
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = i;
      dayDiv.classList.add("calendar-day", "current-month-day");

      // Check if the date should be highlighted
      const dateString = `${currentYear}-${(currentMonth + 1)
        .toString()
        .padStart(2, "0")}-${i.toString().padStart(2, "0")}`;
      if (highlightedDates.includes(dateString)) {
        dayDiv.classList.add("highlighted-date");
      }

      calendarDays.appendChild(dayDiv);
    }

    const totalDays = adjustedFirstDay + lastDateOfMonth;
    const nextMonthDays = 42 - totalDays; // Ensure 6 rows are always rendered

    for (let i = 1; i <= nextMonthDays; i++) {
      const emptyDiv = document.createElement("div");
      emptyDiv.classList.add("calendar-day", "next-month-day");
      calendarDays.appendChild(emptyDiv);
    }
  }

  prevMonth.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextMonth.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  renderCalendar(currentDate);
});
