const carousalSlide = document.querySelector(".carousal-slide");
const carousalImages = document.querySelectorAll(".carousal-slide img");

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

let counter = 1;
const size = carousalImages[0].clientWidth;

carousalSlide.style.transform = `translateX(${-size * counter}px)`;

nextBtn.addEventListener("click", () => {
  if (counter >= carousalImages.length - 1) return;
  carousalSlide.style.transition = "transform 0.4s ease-in-out";
  counter++;
  carousalSlide.style.transform = `translateX(${-size * counter}px)`;
});

prevBtn.addEventListener("click", () => {
  if (counter <= 0) return;
  carousalSlide.style.transition = "transform 0.4s ease-in-out";
  counter--;
  carousalSlide.style.transform = `translateX(${-size * counter}px)`;
});

carousalSlide.addEventListener("transitionend", () => {
  if (carousalImages[counter].id === "last-clone") {
    carousalSlide.style.transition = "None";
    counter = carousalImages.length - 2;
    carousalSlide.style.transform = `translateX(${-size * counter}px)`;
  }

  if (carousalImages[counter].id === "first-clone") {
    carousalSlide.style.transition = "None";
    counter = carousalImages.length - counter;
    carousalSlide.style.transform = `translateX(${-size * counter}px)`;
  }
});
