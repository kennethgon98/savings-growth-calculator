document
  .getElementById("interestForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const startingBalance = parseFloat(
      document.getElementById("startingBalance").value
    );
    const interestRate =
      parseFloat(document.getElementById("interestRate").value) / 100;
    const years = parseInt(document.getElementById("years").value);
    const monthlyContribution = parseFloat(
      document.getElementById("monthlyContribution").value
    );

    if (
      !startingBalance ||
      !interestRate ||
      !years ||
      isNaN(monthlyContribution)
    ) {
      alert("Please fill in all fields with valid numbers.");
      return;
    }

    const breakdownTable = document
      .getElementById("breakdownTable")
      .getElementsByTagName("tbody")[0];
    breakdownTable.innerHTML = ""; // Clear previous results

    let balance = startingBalance;

    // Variable to hold the final balance after all years
    let finalBalance = balance;

    for (let i = 1; i <= years; i++) {
      // Add monthly contributions for the year
      for (let month = 1; month <= 12; month++) {
        finalBalance += monthlyContribution;
      }

      // Apply interest for this year
      finalBalance += finalBalance * interestRate;

      // Insert the breakdown for each year into the table
      const row = breakdownTable.insertRow();
      const cellYear = row.insertCell(0);
      const cellBalance = row.insertCell(1);

      cellYear.textContent = i;
      cellBalance.textContent = `$${finalBalance.toLocaleString()}`;
    }

    // Display the total balance at the end of the last year
    document.getElementById("finalYear").textContent = years;
    document.getElementById(
      "finalBalanceAmount"
    ).textContent = `$${finalBalance.toLocaleString()}`;

    // Show the total balance section and the breakdown table
    document.getElementById("totalBalance").style.display = "block";
    document.getElementById("result").style.display = "block";
  });
