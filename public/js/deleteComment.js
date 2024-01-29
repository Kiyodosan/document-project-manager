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

document.querySelector('#delete-comment').addEventListener('click', deleteFormHandler);