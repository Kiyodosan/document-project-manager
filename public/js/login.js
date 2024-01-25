document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('.login-form');

  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const emailInput = document.querySelector('#email-login');
    const passwordInput = document.querySelector('#password-login');

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    console.log('Email:', email);
    console.log('Password:', password);

    if (email && password) {
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/profile');
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Login failed');
        }
      } catch (error) {
        console.error('Error during login request:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  });

  const signupBtn = document.querySelector('#signup-btn');
  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      console.log('Sign Up button clicked');
      window.location.href = '/signup';
    });
  } else {
    console.error('Sign Up button not found in the DOM');
  }
});