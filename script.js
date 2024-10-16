function toggleMenu() {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("show");
  
 }
// Get the modal
var modal = document.getElementById("income-modal");

// Get the button that opens the modal
var btn = document.getElementById("modal-button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Function to open the modal
btn.onclick = function() {
  modal.style.display = "flex";
}

// Function to close the modal when the close button (x) is clicked
span.onclick = function() {
  modal.style.display = "none";
}

// Function to close the modal if the user clicks anywhere outside the modal content
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

 
 document.addEventListener('input', function (event) {
   if (event.target.tagName.toLowerCase() === 'textarea') {
     autoGrow(event.target);
   }
 });
 
 function autoGrow(textarea) {
   textarea.style.height = 'auto';  // Reset height
   textarea.style.height = textarea.scrollHeight + 'px';  // Set new height based on content
 }