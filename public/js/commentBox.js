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
  if (event.target.matches('.delete-comment')) {
    const commentId = event.target.getAttribute('data-id');

    try {
      const response = await fetch(`/api/comment/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.reload();
      } else {
        console.error('Error deleting comment:', response.statusText);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }
};

document.body.addEventListener('click', async function (event) {
  console.log('Body clicked!');
  if (event.target.hasAttribute('data-id')) {
    await deleteFormHandler(event);
  }
});

document.querySelector('#send-comment').addEventListener('click', commentFormHandler);
document.body.addEventListener('click', async function (event) {
  if (event.target.hasAttribute('data-id')) {
    await deleteFormHandler(event);
  }
});