const displayPrice = document.getElementById("displayPrice");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const dots = document.querySelectorAll(".dot");
let slideIndex = 1;

dots.forEach(function (val) {
  val.addEventListener("click", function (e) {
    currentSlide(Number(val.id));
  });
});

prevButton.addEventListener("click", () => {
  plusSlides(-1);
});

nextButton.addEventListener("click", () => {
  plusSlides(1);
});

showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n + 1));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}


function convert(numberString) {
  const length = numberString.length;
  let newString = "";
  let counter = 0;
  for (let x = length - 1; x >= 0; x--) {
    counter++;
    if (counter % 3 === 0 && x !== 0) {
      newString += numberString[x] + ",";
      continue;
    }
    newString += numberString[x];
  }
  return newString.split("").reverse().join("");
}

displayPrice.textContent = convert(displayPrice.textContent);
