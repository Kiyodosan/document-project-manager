const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  const fileData = document.querySelector('#fileData');
  const file_url = fileData.value;

  if (title && content) {
    if (fileData) {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ title, content, file_url }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('An error has occured while creating the post');
      }
    } else {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('An error has occured while creating the post');
      }
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);