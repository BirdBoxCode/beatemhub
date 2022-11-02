
function toggleMobileMenu(menu) {
  menu.classList.toggle('open');
}

window.addEventListener("scroll", function () {
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

function onClickHandler(e){
  var content = document.getElementById("body");

  if(hamburger-icon.checked){
    content.setAttribute( 'class', 'push-down' );

  }else{
    content.setAttribute( 'class', '' );
  }
}

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
