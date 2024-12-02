// Hamburger

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}))
   
  // JavaScript for toggling FAQs
  document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
          const faqItem = question.parentElement;
          faqItem.classList.toggle('open');
      });
  });

        // JavaScript for Carousel
const slides = document.querySelector('.carousel-slides');
const dots = document.querySelectorAll('.carousel-dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

// Function to update the carousel position
function updateCarousel() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Event listener for next button
nextBtn.addEventListener('click', () => {
    moveToNextSlide();
});

// Event listener for prev button
prevBtn.addEventListener('click', () => {
    moveToPrevSlide();
});

// Event listener for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

// Move to the next slide
function moveToNextSlide() {
    currentIndex = (currentIndex + 1) % dots.length;
    updateCarousel();
}

// Move to the previous slide
function moveToPrevSlide() {
    currentIndex = (currentIndex - 1 + dots.length) % dots.length;
    updateCarousel();
}

// Auto-slide functionality
setInterval(() => {
    moveToNextSlide();
}, 5000); // 5000ms = 5 seconds

// Initialize carousel
updateCarousel();
