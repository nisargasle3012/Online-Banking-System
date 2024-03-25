class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.balance = 0;
        this.transactionHistory = [];
    }
}

class SignUpPage {
    constructor(user) {
        this.user = user;
        this.left = null;
        this.right = null;
    }
}

class CreatingTree {
    constructor() {
        this.root = null;
    }

    insert(user) {
        const newUser = new SignUpPage(user);

        if (!this.root) {
            this.root = newUser;
        } else {
            let current = this.root;
            while (true) {
                if (newUser.user.username === current.user.username) {
                    alert('Account already exists!');
                    return;
                }

                if (newUser.user.username > current.user.username) {
                    if (!current.right) {
                        current.right = newUser;
                        break;
                    }
                    current = current.right;
                } else {
                    if (!current.left) {
                        current.left = newUser;
                        break;
                    }
                    current = current.left;
                }
            }
        }

        alert('Account successfully created!');
        localStorage.setItem('userTree', JSON.stringify(this.root)); // Saving to localStorage
        window.location.href = 'login.html';
    }
}

let userTree = new CreatingTree();

// Load userTree from localStorage if available
const storedTree = localStorage.getItem('userTree');
if (storedTree) {
    userTree.root = JSON.parse(storedTree);
    // Note: The tree will not have its methods, it's just the data
}

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    const user = new User(username, password);
    userTree.insert(user);
});
