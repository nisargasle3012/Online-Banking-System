document.addEventListener('DOMContentLoaded', function() {
    populateTransactionHistory();
});

function populateTransactionHistory() {
    let currentUserData = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUserData || !currentUserData.transactionHistory) {
        alert("No transaction history available.");
        return;
    }

    const tableBody = document.querySelector('#transactionHistory tbody');
    tableBody.innerHTML = '';

    currentUserData.transactionHistory.forEach((transaction, index) => {
        const row = document.createElement('tr');

        const typeCell = document.createElement('td');
        typeCell.textContent = transaction.type;
        row.appendChild(typeCell);

        const amountCell = document.createElement('td');
        amountCell.textContent = transaction.amount;
        row.appendChild(amountCell);

        const senderCell = document.createElement('td');
        senderCell.textContent = transaction.sender;
        row.appendChild(senderCell);

        const recepientCell = document.createElement('td');
        recepientCell.textContent = transaction.recipient;
        row.appendChild(recepientCell);

        const balanceCell = document.createElement('td');
        balanceCell.textContent = transaction.balance;
        row.appendChild(balanceCell);

        tableBody.appendChild(row);
    });
}
