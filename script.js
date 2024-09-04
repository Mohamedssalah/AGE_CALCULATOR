document.addEventListener("DOMContentLoaded", function () {
  const yearInput = document.getElementById("year");
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const currentYear = new Date().getFullYear();

  // Dynamically set the maximum year when a page loads

  yearInput.setAttribute("max", currentYear);

  document
    .querySelector(".card__button")
    .addEventListener("click", calculateAge);
  document
    .getElementById("age-form")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // To prevent page reloading when you press Enter
        calculateAge();
      }
    });

  function calculateAge() {
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    let isValid = true;

    // Check the validity of the day
    if (isNaN(day) || day < 1 || day > 31) {
      dayInput.value = day > 31 ? 31 : day; //إUsually set the value if it exceeds 31
      dayInput.nextElementSibling.textContent =
        "يجب أن يكون يوماً صالحاً بين 1 و 31";
      isValid = false;
    } else {
      dayInput.nextElementSibling.textContent = "";
    }
    // Check the validity of the month
    if (isNaN(month) || month < 1 || month > 12) {
      monthInput.value = month > 12 ? 12 : month; // Usually set the value if it exceeds 12
      monthInput.nextElementSibling.textContent =
        "يجب أن يكون شهراً صالحاً بين 1 و 12";
      isValid = false;
    } else {
      monthInput.nextElementSibling.textContent = "";
    }

    // Check the validity of the Year
    if (isNaN(year) || year > currentYear) {
      yearInput.value = currentYear; //Reset the value to the current year
      yearInput.nextElementSibling.textContent = `يجب أن تكون سنة صالحة بين 0 و ${currentYear}`;
      isValid = false;
    } else {
      yearInput.nextElementSibling.textContent = "";
    }

    if (!isValid) {
      return;
    }

    //Age calculation
    let age = currentYear - year;
    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
      age--;
    }

    document.querySelector(".card__resultValue").textContent = age;
  }

  document.querySelectorAll(".card__input").forEach((input) => {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "");
    });

    if (input.id === "day") {
      input.addEventListener("input", function () {
        if (parseInt(this.value) > 31) {
          this.value = 31;
        }
      });
    }

    if (input.id === "month") {
      input.addEventListener("input", function () {
        if (parseInt(this.value) > 12) {
          this.value = 12;
        }
      });
    }

    if (input.id === "year") {
      input.addEventListener("input", function () {
        if (parseInt(this.value) > currentYear) {
          this.value = currentYear;
        }
      });
    }
  });
});
