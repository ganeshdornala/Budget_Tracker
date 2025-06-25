const form = document.getElementById("expenseForm");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");

let expenseData = {};

const ctx = document.getElementById("expenseChart").getContext("2d");
let chart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: [],
    datasets: [{
      label: "Expenses",
      data: [],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  }
});

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const category = categoryInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!category || isNaN(amount) || amount <= 0) return;

  if (expenseData[category]) {
    expenseData[category] += amount;
  } else {
    expenseData[category] = amount;
  }

  updateChart();
  form.reset();
});

function updateChart() {
  chart.data.labels = Object.keys(expenseData);
  chart.data.datasets[0].data = Object.values(expenseData);
  chart.update();
}
