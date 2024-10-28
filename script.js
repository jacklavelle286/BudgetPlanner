function toggleMenu() {
 const navLinks = document.getElementById("nav-links");
 navLinks.classList.toggle("show");
 
}

document.addEventListener('scroll', function() {
 const elements = document.querySelectorAll('.slide-in');
 const windowHeight = window.innerHeight;

 elements.forEach(element => {
   const elementTop = element.getBoundingClientRect().top;
   const elementBottom = element.getBoundingClientRect().bottom;

   // Check if the element is in the viewport to slide in
   if (elementTop < windowHeight - 100) {
     element.classList.add('active'); // Slide in when scrolling down
   }

   // Check if the element is out of view to slide out
   if (elementBottom < 0 || elementTop > windowHeight) {
     element.classList.remove('active'); // Slide out when scrolling up
   }
 });
});


