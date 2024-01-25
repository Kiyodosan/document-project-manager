// profile.js

document.addEventListener('DOMContentLoaded', function () {
  // Function to handle form submission when creating a new post
  const newFormHandler = async (event) => {
    event.preventDefault();
  
    const titleInput = document.querySelector('#post-title');
    const contentInput = document.querySelector('#post-content');
  
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
  
    console.log('Title:', title);
    console.log('Content:', content);
  
    if (title && content) {
      try {
        const response = await fetch(`/api/posts`, {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          throw new Error('An error occurred while creating the post');
        }
      } catch (error) {
        console.error('Error:', error.message);
        alert('An error occurred while creating the post');
      }
    }
  };
  const delPostHandler = async (event) => {
    if (event.target.matches('button[data-id]')) {
      const postId = event.target.getAttribute('data-id');
  
      try {
        // Send a DELETE request to the server to delete the post
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          // If deletion is successful, reload the page to reflect the changes
          document.location.replace('/profile');
        } else {
          // If deletion fails, show an error message
          throw new Error('An error occurred while deleting the post');
        }
      } catch (error) {
        // Log the error and display an alert
        console.error('Error:', error.message);
        alert('An error occurred while deleting the post');
      }
    }
  };
  // Event listener for form submission
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

  // Event listener for post deletion
  document.querySelector('.post-list').addEventListener('click', delPostHandler);
});
