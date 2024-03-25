function searchUser(username, password, signUpPage) {
    if (!signUpPage) {
        return null;
    }

    if (username === signUpPage.user.username && password === signUpPage.user.password) {
        return signUpPage.user;
    }

    return username > signUpPage.user.username ? 
        searchUser(username, password, signUpPage.right) :
        searchUser(username, password, signUpPage.left);
}

function authenticateUser(username, password) {
    const storedTree = localStorage.getItem('userTree');
    if (!storedTree) {
        alert('No users found. Please sign up.');
        return false;
    }
    
    const userTreeRoot = JSON.parse(storedTree);
    const user = searchUser(username, password, userTreeRoot);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    } else {
        return false;
    }
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (authenticateUser(username, password)) {
        window.location.href = 'dashboard.html';
    } else {
        alert('Authentication failed. Please try again.');
    }
});
