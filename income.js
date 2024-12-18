  // Get the modal
  var modal = document.getElementById("income-modal");
  // Get the button that opens the modal
  var btn = document.getElementById("modal-button")
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  // When the user clicks on the button, open the modal
  btn.onclick = function() {
   modal.style.display = "flex";
  }
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
   modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
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
 
 
 