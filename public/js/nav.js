// nav.js
console.log('nav.js loaded!');

document.addEventListener('DOMContentLoaded', function () {
  console.log('Script executed!');

  const toggleButton = document.querySelector('.mobile-nav-toggle');
  const primaryNav = document.getElementById('primary-nav');

  // Check if the event listener is already attached
  if (!toggleButton.hasAttribute('data-listener-attached')) {
    // Attach the event listener
    toggleButton.addEventListener('click', function () {
      const isVisible = primaryNav.dataset.visible === 'true';
      primaryNav.dataset.visible = isVisible ? 'false' : 'true';
    });

    // Mark the event listener as attached
    toggleButton.setAttribute('data-listener-attached', 'true');
  }

  // Set initial state
  primaryNav.dataset.visible = 'false';
});
