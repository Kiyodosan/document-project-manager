const delPostHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('An error has occured while deleting the post');
    }
  }
};

document
  .querySelector('.post-list')
  .addEventListener('click', delPostHandler);