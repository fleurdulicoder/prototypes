// $('body').on('scroll', function(){
//   var top = ($(window).scrollTop() || $("body").scrollTop());
//   console.log(top);
// });
//


document.body.addEventListener('scroll', function(){
  var top = document.body.scrollTop || window.scrollTop;
  console.log(top);
}, false);
