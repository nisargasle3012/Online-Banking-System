document.getElementById('withdrawForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let amount = parseInt(document.getElementById('withdrawAmount').value, 10);
    let userTree = JSON.parse(localStorage.getItem('userTree'));
    let currentUserData = JSON.parse(localStorage.getItem('currentUser'));

    if (!isNaN(amount) && amount > 0 && currentUserData.balance-amount>=0) {
        currentUserData.balance -= amount;
        currentUserData.transactionHistory.push({ type: 'withdraw', amount: amount, sender:'you', recipient:'N/A', balance: currentUserData.balance });

        updateTreeWithNewUserData(userTree, currentUserData);

        localStorage.setItem('currentUser', JSON.stringify(currentUserData));
        localStorage.setItem('userTree', JSON.stringify(userTree));

        alert("Your fund is successfully withdrawn");
        window.location.href = 'dashboard.html';
    }
    else if(currentUserData.balance-amount<0)
    {
        alert("You don't have enough Funds!");
    } 
    else {
        alert("Please enter a valid amount");
    }
});

function updateTreeWithNewUserData(treeNode, userData) {
    if (treeNode === null) return;
    if (treeNode.user.username === userData.username) {
        treeNode.user = userData;
        return;
    }

    if (userData.username > treeNode.user.username) {
        updateTreeWithNewUserData(treeNode.right, userData);
    } else {
        updateTreeWithNewUserData(treeNode.left, userData);
    }
}

