const select = document.getElementById("state");
const locations = document.getElementById("location");
const submitBtn = document.querySelector("#edit-submit-button");
const imageUpload = document.getElementById("imageUpload");
const minPrice = document.getElementById("min-price");
const maxPrice = document.getElementById("max-price");

const locationsObject = { Lagos: lagosOptions, Abuja: abujaOptions };

select.addEventListener("change", function (e) {
  removeElements();
  addLocations(state.value);
});

if (page !== "Home") {
  submitBtn.addEventListener("click", (e) => {
    const deletePics = document.querySelectorAll("input:checked").length;
    const currentPics = document.getElementsByClassName("deleteCheckbox")
      .length;
    const picturesUpload = imageUpload.files.length || 0;
    const total = picturesUpload + currentPics - deletePics;
    if (total > 10) {
      const allowedPhotos = total - 10;
      e.preventDefault();
      alert(
        `You can't have more than 10 pictures. Please remove ${allowedPhotos} photo${
          allowedPhotos === 1 ? "" : "s"
        }`
      );
    }
  });
}

function removeElements() {
  while (locations.firstElementChild) {
    locations.removeChild(locations.firstElementChild);
  }
}

function addLocations(searchState) {
  if (searchState === "0") return;
  const locationsArray = locationsObject[searchState];
  for (var i = 0; i < locationsArray.length; i++) {
    var opt = locationsArray[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    locations.appendChild(el);
  }
}

if (page === "Home") {
  window.addEventListener("load", () => {
    for (let amount of prices) {
      const figure = document.createElement("option");
      figure.textContent = amount;
      figure.value = amount === "none" ? "0" : amount;
      minPrice.innerHTML += figure.outerHTML;
      maxPrice.innerHTML += figure.outerHTML;
    }
  });
}
