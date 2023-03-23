'use strict';

//     console.log("hiiiiii");

//   playvisible.addEventListener("click", function (e) {
//   let play = document.body.querySelectorAll("#playVisible>img");
//   //     console.log("hiiiiii");
//   play[0].innerHTML = "FUCK";

//   //
//   //

//   // let play1=document.querySelector('.(play[1].className)');

//   // play1.style.visibility="visible";

//   //let button=e.target.querySelector('.play');
//   //console.log(button);

//   //button.style.visibility="visible";
// });
// // console.log("hii");
// let play = (document.body.querySelector(".c>img").src = "");
// play.style.visibility = "hidden";

let playvisible = document.querySelector("#playVisible");
playvisible.addEventListener("mouseover", function (e) {
  let play = playvisible.children;
  play[1].style.opacity = 1;
  console.log("hello");

  playvisible.removeEventListener("mouseout", function (e) {
    let play = playvisible.children;
    play[1].style.opacity = 0;
    console.log("hello1")
  });
});



// playvisible.removeEventListener("mouseout", function (e) {
//   let play = playvisible.children;
//   play[1].style.opacity = 0;
//   console.log("hello")
// });

//playvisible[1].style.opacity=1;
