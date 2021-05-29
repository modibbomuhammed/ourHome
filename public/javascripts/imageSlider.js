const displayPrice = document.getElementById("displayPrice");

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


