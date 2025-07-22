
function addRow() {
  const container = document.getElementById('principal-entries');
  const div = document.createElement('div');
  div.className = 'principal-row';
  div.innerHTML = '<input type="number" placeholder="Principal Amount (₹)" class="principal" /> <input type="date" class="due-date" />';
  container.appendChild(div);
}

function calculateInterest(principal, rate, months, compounding) {
  let interest = 0;
  if (compounding === "monthly") {
    let monthlyRate = rate / 12 / 100;
    interest = principal * Math.pow(1 + monthlyRate, months) - principal;
  } else {
    let yearlyRate = rate / 100;
    let years = months / 12;
    interest = principal * Math.pow(1 + yearlyRate, years) - principal;
  }
  return interest;
}

document.getElementById('calculate').addEventListener('click', () => {
  const rate = parseFloat(document.getElementById('interestRate').value);
  const compounding = document.getElementById('compounding').value;
  const endDate = new Date(document.getElementById('endDate').value);
  let totalInterest = 0;
  let tableRows = [];
  let slNo = 1;

  document.querySelectorAll('.principal-row').forEach(row => {
    const principal = parseFloat(row.querySelector('.principal').value);
    const startDate = new Date(row.querySelector('.due-date').value);
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    const interest = calculateInterest(principal, rate, months, compounding);
    totalInterest += interest;
    const interestUpto = endDate.toISOString().split("T")[0];
    tableRows.push(`<tr><td>${slNo++}</td><td>₹${principal.toFixed(2)}</td><td>${startDate.toISOString().split("T")[0]}</td><td>${interestUpto}</td><td>₹${interest.toFixed(2)}</td></tr>`);
  });
const totalPrincipal = Array.from(document.querySelectorAll('.principal'))
  .reduce((sum, input) => sum + (parseFloat(input.value) || 0), 0);
const totalClaim = totalPrincipal + totalInterest;

const tableHTML = `<table border="1" cellspacing="0" cellpadding="5">
  <tr><th>Sl No.</th><th>Amount</th><th>Due Date</th><th>Interest Upto</th><th>Interest</th></tr>
  ${tableRows.join("")}
  <tr><td colspan="4"><strong>Total Interest</strong></td><td><strong>₹${totalInterest.toFixed(2)}</strong></td></tr>
  <tr><td colspan="4"><strong>Total Claim Amount</strong></td><td><strong>₹${totalClaim.toFixed(2)}</strong></td></tr>
</table>`;


  document.getElementById("results").innerHTML = tableHTML;
});


document.getElementById('bankRate').addEventListener('input', () => {
  const bankRate = parseFloat(document.getElementById('bankRate').value);
  if (!isNaN(bankRate)) {
    document.getElementById('interestRate').value = (bankRate * 3).toFixed(2);
  } else {
    document.getElementById('interestRate').value = '';
  }
});

document.getElementById('endDate').valueAsDate = new Date();

function openPopup() {
  document.getElementById('popup').style.display = 'block';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

function printPage() {
  const nameField = document.getElementById("userName");
  const emailField = document.getElementById("userEmail");
  const phoneField = document.getElementById("userPhone");

  if (!nameField || !emailField || !phoneField) {
    console.error("One or more input fields not found in the DOM.");
    return;
  }

  const name = nameField.value;
  const email = emailField.value;
  const phone = phoneField.value;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);

  fetch("https://script.google.com/macros/s/AKfycbw4E85h-7YO6_GMr7BnfICvmZJPYespQT1g0fQuOYmyESJBFTEIb6ujNTLJi4TZSiZ1/exec", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        console.log("Form submitted successfully");
        window.print(); // or any custom print logic
      } else {
        console.error("Submission failed:", data);
      }
    })
    .catch(error => {
      console.error("Error! Failed to fetch", error);
    });
}





