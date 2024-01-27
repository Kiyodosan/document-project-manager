const commentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment').value.trim();
  const post_id = document.querySelector('#postId').textContent;
  const sendCommentButton = document.getElementById('send-comment');
  if (content) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ content, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/post/id');
    } else {
      alert('An error has occured while creating the comment');
    }
  }
};

document.querySelector('#send-comment').addEventListener('click', commentFormHandler);
