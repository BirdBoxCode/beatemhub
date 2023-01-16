function toggleMobileMenu(menu) {
  menu.classList.toggle('open');
}

// Navbar movement
window.addEventListener("scroll", function () {
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

// function onClickHandler(e){
//   var content = document.getElementById("body");

//   if(hamburger-icon.checked){
//     content.setAttribute( 'body', 'push-down' );

//   }else{
//     content.setAttribute( 'body', 'push-down' );
//   }
// }

// Title scroll into view
// const element = document.getElementById("caption");

// element.scrollIntoView();
// element.scrollIntoView(false);
// element.scrollIntoView({block: "end"});
// element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

// window.scroll({
//   top: 2500,
//   left: 0,
//   behavior: 'smooth'
// });

// Smooth scroll to element on link click

// var element = document.getElementById("aboutarea");
// element.scrollIntoView({behavior: "smooth"});

// $(document).ready(function() {
//   $("a.aboutarea").click(function(event) {
//       event.preventDefault();
//       $("html, body").animate({
//           scrollTop: $($(this).attr("#aboutarea")).offset().top
//         }, 500);
//     });
// });

// Smooth scroll
