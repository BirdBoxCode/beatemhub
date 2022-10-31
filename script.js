window.addEventListener("scroll", function () {
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

// window.scroll({
//   top: 2500,
//   left: 0,
//   behavior: 'smooth'
// });

// Scroll certain amounts from current position
// window.scrollBy({
//   top: 100, // could be negative value
// //   left: 0,
// //   behavior: 'smooth'
// // });

// document.querySelector('.bgimg-1').scrollIntoView({
//   behavior: 'smooth'
// });
