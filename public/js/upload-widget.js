const uploadForm = document.querySelector('#uploadForm');
const fileData = document.querySelector('#fileData');

uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  console.log(fileData.value);
});