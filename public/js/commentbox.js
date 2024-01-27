const commentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment').textContent.trim();
  const post_id = document.querySelector('#postId').textContent;

  if (content) {
    const response = await fetch('/api/content', {
      method: 'POST',
      body: JSON.stringify({ content, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('An error has occured while creating the comment');
    }
  }
};

document.querySelector('#send-comment').addEventListener ('click', commentFormHandler);