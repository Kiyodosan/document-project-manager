//signup.js
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    try {
      const response = await fetch('/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred during sign-up. Please try again.');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
});
