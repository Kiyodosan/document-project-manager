const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#comment').value.trim();
    //implement post id queryselector
  //   const viewComment = document.querySelector('#post-method');
  // console.log(viewComment.textContent);
    if (comment) {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ content:comment }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // document.location.replace('/profile');
      } else {
        alert('An error has occured while creating the comment');
      }
    }
  };
  
document.querySelector('#comment-reply').addEventListener ('click', commentFormHandler);