function balanceEnquiry() {
    const balanceElement = document.getElementById('balance');
    const currentUserData = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUserData) {
        balanceElement.textContent = currentUserData.balance + " Rs.";
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    balanceEnquiry();
});
