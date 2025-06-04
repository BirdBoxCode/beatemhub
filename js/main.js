document.addEventListener("DOMContentLoaded", function () {
  // SERVICES CAROUSEL
  const sliderLinks = document.querySelectorAll(".services-link");
  const slides = document.querySelectorAll(".slider-img .beh-slide");

  // Give all slides a data-slide index
  slides.forEach((slide, index) => {
    slide.setAttribute("data-slide", index);
  });

  function showSlide(index) {
    slides.forEach(slide => {
      slide.style.display = (slide.getAttribute("data-slide") === index) ? "block" : "none";
    });
  }

  showSlide("0"); // Default to first

  sliderLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const slideIndex = this.getAttribute("data-slide");
      showSlide(slideIndex);
    });
  });

  // VIDEO CAROUSEL
  const thumbnails = document.querySelectorAll('.carousel-img');
  const videoIframe = document.getElementById('video-iframe');
  const leftButton = document.querySelector('.carousel-left');
  const rightButton = document.querySelector('.carousel-right');
  const carouselContainer = document.querySelector('.thumbnails-list');
  let currentIndex = 0;
  let isAnimating = false;

  function updateCarousel(index) {
    thumbnails.forEach((img) => img.classList.remove('active-thumbnail'));
    thumbnails[index].classList.add('active-thumbnail');
    const videoLink = thumbnails[index].getAttribute('data-video-url');
    if (videoLink && videoLink.trim() !== "") {
      videoIframe.src = videoLink;
    }
    thumbnails.forEach((img, idx) => {
      img.style.transition = "transform 0.3s ease";
      img.style.transform = (idx === currentIndex) ? "scale(1.1)" : "scale(1)";
    });
  }

  updateCarousel(currentIndex);

  function moveCarouselBySteps(steps) {
    if (isAnimating || steps === 0) return;
    isAnimating = true;
    const thumbnailWidth = thumbnails[0].offsetWidth;
    const totalMoveDistance = Math.abs(steps) * thumbnailWidth;
    if (steps > 0) {
      carouselContainer.style.transition = "transform 0.3s ease-in-out";
      carouselContainer.style.transform = `translateX(-${totalMoveDistance}px)`;
      setTimeout(() => {
        for (let i = 0; i < steps; i++) {
          carouselContainer.appendChild(carouselContainer.firstElementChild);
        }
        resetCarouselPosition();
      }, 300);
    } else {
      for (let i = 0; i < Math.abs(steps); i++) {
        carouselContainer.insertBefore(carouselContainer.lastElementChild, carouselContainer.firstElementChild);
      }
      carouselContainer.style.transition = "none";
      carouselContainer.style.transform = `translateX(-${totalMoveDistance}px)`;
      setTimeout(() => {
        carouselContainer.style.transition = "transform 0.3s ease-in-out";
        carouselContainer.style.transform = "translateX(0)";
      }, 10);
    }
    setTimeout(() => {
      currentIndex = (currentIndex + steps + thumbnails.length) % thumbnails.length;
      updateCarousel(currentIndex);
      isAnimating = false;
    }, 350);
  }

  function resetCarouselPosition() {
    carouselContainer.style.transition = "none";
    carouselContainer.style.transform = "translateX(0)";
  }

  function moveClickedThumbnailToFirst(clickedIndex) {
    let steps = clickedIndex - currentIndex;
    if (steps < 0) steps += thumbnails.length;
    moveCarouselBySteps(steps);
    setTimeout(() => {
      currentIndex = clickedIndex;
      updateCarousel(currentIndex);
    }, 300);
  }

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function () {
      moveClickedThumbnailToFirst(index);
    });
  });

  rightButton?.addEventListener('click', function () {
    moveCarouselBySteps(1);
  });

  leftButton?.addEventListener('click', function () {
    moveCarouselBySteps(-1);
  });
});
