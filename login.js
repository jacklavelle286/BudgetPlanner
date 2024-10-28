const h1Element = document.querySelector('.savely-h1');
const modal = document.querySelector('.savely-p');

// Show modal on click and hide the h1 element
h1Element.addEventListener('click', () => {
  modal.classList.add('modal-active');
  h1Element.style.display = 'none'; // Hide the h1 element
});

// Hide modal and show the h1 element when clicking outside of it
document.addEventListener('click', (e) => {
  if (!modal.contains(e.target) && e.target !== h1Element) {
    modal.classList.remove('modal-active');
    h1Element.style.display = 'block'; // Show the h1 element again
  }
});
