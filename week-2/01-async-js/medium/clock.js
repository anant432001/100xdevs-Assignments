function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Format to HH:MM:SS
  let hhmmss = [hours, minutes, seconds]
    .map(function (unit) {
      if (unit < 10) unit = "0" + unit;
      return unit;
    })
    .join(":");

  // Format to HH:MM:SS AM/PM
  let ampmHours = hours % 12 || 12; // Convert 0 hours to 12 for AM/PM format
  let ampm = hours < 12 ? "AM" : "PM";
  let hhmmssAmpm =
    [ampmHours, minutes, seconds]
      .map((unit) => String(unit).padStart(2, "0"))
      .join(":") +
    " " +
    ampm;

  return { hhmmss, hhmmssAmpm };
}

function updateClock() {
  const now = new Date();
  console.log("now : " + now);
  const timeFormats = formatTime(now);

  console.log("24-hour format: " + timeFormats.hhmmss);
  console.log("12-hour format: " + timeFormats.hhmmssAmpm);
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial call to display the clock immediately
updateClock();
