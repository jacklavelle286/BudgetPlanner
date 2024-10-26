const h1Element = document.querySelector('.savely-h1');
const modal = document.querySelector('.savely-p');

// Show modal on hover over h1
h1Element.addEventListener('click', () => {
  modal.classList.add('modal-active');
});

// Hide modal on click outside of it
document.addEventListener('click', (e) => {
  if (!modal.contains(e.target) && e.target !== h1Element) {
    modal.classList.remove('modal-active');
  }
});
