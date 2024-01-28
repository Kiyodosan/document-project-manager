const commentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment').value.trim();
  const post_id = document.querySelector('#postId').textContent;

  if (content) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ content, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/post/' + post_id);
    } else {
      alert('An error has occured while creating the comment');
    }
  }
};

const deleteFormHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comment/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/post/' + post_id);
    } else {
      alert('An error has occured while deleting the comment');
    }
  }
};

document.querySelector('#send-comment').addEventListener('click', commentFormHandler);
document.querySelector('#delete-comment').addEventListener('click', deleteFormHandler);
