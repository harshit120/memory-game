// 1.  classList function is used to add or delete the class from a tag

// // 2. creating and inserting elements
// const msg=document.createElement('div');
// now here we can add class to the element that we have created
// add html methos for thsi are 1..textcontent 2.innerHTML
// append and prepend methods is to wherewe have to add this new tag

// styles
//getcomputedStyle(element).property this give the value which is applied on the object

//dom events
//1.mouseenter
"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  // e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
// if we get more than one class of same name and we want which class object is clicked

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const allset = document.querySelectorAll(".section");
console.log(allset);

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  //console.log(e.target.getBoundingClientRect());
  //   //s1coords.x,s1coords.y
  //  // window.scrollBy(s1coords.left,s1coords.top);
  //  // both the scroll and scrollby work but in scrollTo we have to add pageoffset property
  //   window.scrollTo
  //     ({left:s1coords.left+window.pageXOffset,
  //       top: s1coords.top+window.pageYOffset,
  //       behavior:'smooth'});
  //these are the two methods for scroll now we get one more modern method for scroll
  section1.scrollIntoView({ behavior: "smooth" });
});

//these are the two methods for page navigation
//1.
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   console.log("hello1");
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

//2.

// Add event listener to common parent element
//Determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

const operation = document.querySelector(".operations");


const tabs=document.querySelectorAll('.operations__tab');
const content=document.querySelectorAll('.operations__content');


operation.addEventListener("click", function (e) {
  const el=e.target.closest(".operations__tab");
  if (el) {
    console.log(el)
   
    const id ="."+"operations__tab--" + el.getAttribute("data-tab");
    const show=document.querySelector(id);
    tabs.forEach(t=> t.classList.remove('operations__tab--active'))
    show.classList.add('operations__tab--active'); 
content.forEach(t=> t.classList.remove('operations__content--active'));

const cont= "."+"operations__content--" +el.getAttribute("data-tab");
document.querySelector(cont).classList.add('operations__content--active');
    

  }
});
// const a = "hello";
// const b = "harshit";
// console.log(a+b);
