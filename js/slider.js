const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider')
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');

let currentSlide = 1;
const slidesToShow = 1; // Количество видимых слайдов

function showSlides() {
  slides.forEach((slide, index) => {
    slide.classList.remove('active', 'prev', 'next');
    if (index >= currentSlide && index < currentSlide + slidesToShow) {
      slide.classList.add('active');
    } else if (index < currentSlide) {
      slide.classList.add('prev');
    } else {
      slide.classList.add('next');
    }
  });

  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === Math.floor(currentSlide / slidesToShow)) {
      dot.classList.add('active');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % (slides.length - slidesToShow + 1);
  showSlides();
  slider.style.transform = `translateX(-${currentSlide * 100 / (slides.length - slidesToShow + 1)}%)`;
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + (slides.length - slidesToShow + 1)) % (slides.length - slidesToShow + 1);
  showSlides();
  slider.style.transform = `translateX(-${currentSlide * 100 / (slides.length - slidesToShow + 1)}%)`;
  
}

function dotClick(n) {
  currentSlide = n * slidesToShow;
  showSlides();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => dotClick(index));
});

// setInterval(nextSlide, 5000); // Auto-advance slides every 5 seconds

showSlides(); // Отобразить начальные слайды