document.addEventListener('DOMContentLoaded', () => {
    console.log('logout.js loaded');
    const logout = async () => {
        try {
            const response = await fetch('/api/users/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                const errorMessage = await response.text();
                alert(`Logout failed: ${errorMessage}`);
            }
        } catch (error) {
            console.error('An error occurred during logout:', error);
            alert('An error occurred during logout. Please try again.');
        }
    };

    const logoutButton = document.querySelector('#logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
        console.log('Event listener attached to logout button');
    } else {
        console.log('#logout button not found');
    }
});
