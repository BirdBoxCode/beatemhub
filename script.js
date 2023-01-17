//burger bar

function toggleMobileMenu(menu) {
  menu.classList.toggle('open');
}

// Navbar movement
window.addEventListener("scroll", function () {
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

// scroll on click
function slowScrollToElement(elementId) {
  if (elementId === 'aboutarea') {
    var element = document.getElementById('aboutarea');
    var elementPosition = element.offsetTop;
  } else if (elementId === 'servicesarea') {
    var element = document.getElementById('servicesarea');
    var elementPosition = element.offsetTop;
  } else if (elementId === 'events') {
    var element = document.getElementById('events');
    var elementPosition = element.offsetTop;
  } else if (elementId === 'clientarea') {
    var element = document.getElementById('clientarea');
    var elementPosition = element.offsetTop;
  } else if (elementId === 'contactarea') {
    var element = document.getElementById('contactarea');
    var elementPosition = element.offsetTop;
  } else if (elementId === 'home') {
    var element = document.getElementById('home');
    var elementPosition = element.offsetTop;
  }
    var startPosition = window.pageYOffset;
    var distance = elementPosition - startPosition;
    var duration = 1200;
    var start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
}
function easeInOutCubic(t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t*t + b;
  t -= 2;
  return c/2*(t*t*t + 2) + b;
};

// SCROLL INTO VIEW

// Select the element that you want to move into view
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 1,
  rootMargin: "0px 0px -100px 0px"
};

// Create an IntersectionObserver
const appearOnScroll = new IntersectionObserver
(function(
  entries,
  appearOnScroll
  ) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('appear')
        appearOnScroll.unobserve(entry.target);
      }
    })
  },
  appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});


// Observe the element
// observer.observe(element);



// const appearOnScroll = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//     // Check if the element is in view
//     if (entry.intersectionRatio > 0) {
//       // Add a class to the element to move it into view
//       element.classList.add("move-into-view");
//     } else {
//       // Remove the class to move the element back to its original position
//       element.classList.remove("move-into-view");
//     }
//   });
// });

// if (entry.intersectionRatio > 0) {
//   // Add a class to the element to move it into view
//   element.classList.add("move-into-view");
// } else {
//   // Remove the class to move the element back to its original position
//   element.classList.remove("move-into-view");
// }
// });
// });
