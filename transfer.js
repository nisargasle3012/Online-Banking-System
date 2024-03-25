function searchUser(username, treeNode) {
    if (!treeNode) {
        return null;
    }

    if (username === treeNode.user.username) {
        return treeNode.user;
    }

    return username > treeNode.user.username ?
        searchUser(username, treeNode.right) :
        searchUser(username, treeNode.left);
}

function transferToUser(username, amount) {
    const storedTree = localStorage.getItem('userTree');
    const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    if (!storedTree || !currentUserData) {
        alert('No users found or not logged in!');
        return false;
    }

    const userTree = JSON.parse(storedTree);
    const receiver = searchUser(username, userTree);

    if (!receiver || isNaN(amount) || amount <= 0 || currentUserData.balance < amount ) {
        alert("Invalid transaction details");
        return false;
    }
    else if(receiver.username===currentUserData.username)
    {
        alert("Self transfer is not possible");
        return false;

    }

    currentUserData.balance -= amount;
    receiver.balance += amount;

    currentUserData.transactionHistory.push({ type: 'transfer', amount: amount, sender:'you', recipient:receiver.username, balance: currentUserData.balance });
    receiver.transactionHistory.push({ type: 'transfer', amount: amount,  sender: currentUserData.username , recipient:'you', balance: receiver.balance });

    updateTreeWithNewUserData(userTree, currentUserData);
    updateTreeWithNewUserData(userTree, receiver);

    localStorage.setItem('currentUser', JSON.stringify(currentUserData));
    localStorage.setItem('userTree', JSON.stringify(userTree));

    alert("Funds successfully transferred");
    return true;
}

document.getElementById('transferForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('transfer').value;
    const amount = parseFloat(document.getElementById('transferAmount').value); // Parse as float

    if (transferToUser(username, amount)) {
        window.location.href = 'dashboard.html';
    } else {
        // The alert is already handled in the transferToUser function
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
