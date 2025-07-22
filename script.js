
function addEntry() {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');
    entryDiv.innerHTML = `
        <label>Principal Amount (₹):</label>
        <input type="number" class="principal" required>
        <label>From Date:</label>
        <input type="date" class="startDate" required>
    `;
    document.getElementById('principalEntries').appendChild(entryDiv);
}

function calculateInterest() {
    const principalInputs = document.querySelectorAll('.principal');
    const startDateInputs = document.querySelectorAll('.startDate');
    const endDate = new Date(document.getElementById('endDate').value);
    const interestType = document.getElementById('interestType').value;
    const bankRate = parseFloat(document.getElementById('bankRate').value);

    let totalInterest = 0;
    let output = '<h3>Calculation Result:</h3><ul>';

    for (let i = 0; i < principalInputs.length; i++) {
        const principal = parseFloat(principalInputs[i].value);
        const startDate = new Date(startDateInputs[i].value);
        const time = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365); // years
        const rate = bankRate * 3;

        let interest = 0;
        if (interestType === 'monthly') {
            interest = principal * Math.pow((1 + (rate / 12 / 100)), time * 12) - principal;
        } else {
            interest = principal * Math.pow((1 + (rate / 100)), time) - principal;
        }

        totalInterest += interest;
        output += `<li>₹${principal.toFixed(2)} from ${startDate.toDateString()} → ₹${interest.toFixed(2)} interest</li>`;
    }

    output += `</ul><h4>Total Interest: ₹${totalInterest.toFixed(2)}</h4>`;
    document.getElementById('results').innerHTML = output;
}
