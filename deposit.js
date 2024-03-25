document.getElementById('depositForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let amount = parseInt(document.getElementById('depositAmount').value, 10);
    let userTree = JSON.parse(localStorage.getItem('userTree'));
    let currentUserData = JSON.parse(localStorage.getItem('currentUser'));

    if (!isNaN(amount) && amount > 0) {
        currentUserData.balance += amount;
        currentUserData.transactionHistory.push({ type: 'deposit', amount: amount, sender:'N/A', recipient:'you', balance: currentUserData.balance});

        updateTreeWithNewUserData(userTree, currentUserData);

        localStorage.setItem('currentUser', JSON.stringify(currentUserData));
        localStorage.setItem('userTree', JSON.stringify(userTree));

        alert("Your fund is successfully deposited");
        window.location.href = 'dashboard.html';
    } else {
        alert("Please enter a valid amount");
    }
});

function updateTreeWithNewUserData(treeNode, userData) {
    if (treeNode === null) return;
    if (treeNode.user.username === userData.username) {
        treeNode.user = userData; // Update the user data
        return;
    }

    if (userData.username > treeNode.user.username) {
        updateTreeWithNewUserData(treeNode.right, userData);
    } else {
        updateTreeWithNewUserData(treeNode.left, userData);
    }
}

