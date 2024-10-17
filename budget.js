// Modal 1
var budgetModal1 = document.getElementById("modal-1");
var budgetBtn1 = document.getElementById("create-modal-button-1");
var budgetSpan1 = document.getElementById("close-cross-1");

budgetBtn1.onclick = function() {
  budgetModal1.style.display = "flex"; 
}

budgetSpan1.onclick = function() {
  budgetModal1.style.display = "none";
}

// Modal 2
var budgetModal2 = document.getElementById("modal-2");
var budgetBtn2 = document.getElementById("create-modal-button-2");
var budgetSpan2 = document.getElementById("close-cross-2");

budgetBtn2.onclick = function() {
  budgetModal2.style.display = "flex"; 
}

budgetSpan2.onclick = function() {
  budgetModal2.style.display = "none";
}

// Modal 3
var budgetModal3 = document.getElementById("modal-3");
var budgetBtn3 = document.getElementById("create-modal-button-3");
var budgetSpan3 = document.getElementById("close-cross-3");

budgetBtn3.onclick = function() {
  budgetModal3.style.display = "flex"; 
}

budgetSpan3.onclick = function() {
  budgetModal3.style.display = "none";
}

// Modal 4
var budgetModal4 = document.getElementById("modal-4");
var budgetBtn4 = document.getElementById("create-modal-button-4");
var budgetSpan4 = document.getElementById("close-cross-4");

budgetBtn4.onclick = function() {
  budgetModal4.style.display = "flex"; 
}

budgetSpan4.onclick = function() {
  budgetModal4.style.display = "none";
}

// Close modal when clicking outside the content
window.onclick = function(event) {
  if (event.target === budgetModal1) {
    budgetModal1.style.display = "none";
  }
  if (event.target === budgetModal2) {
    budgetModal2.style.display = "none";
  }
  if (event.target === budgetModal3) {
    budgetModal3.style.display = "none";
  }
  if (event.target === budgetModal4) {
    budgetModal4.style.display = "none";
  }
}
