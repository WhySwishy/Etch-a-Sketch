

const slider = document.querySelector('.slider'); // Get the slider element
const sliderValues = document.querySelectorAll('.slider-value'); // Get all slider-value elements

const colorbtn = document.querySelector('#colorbtn');
const lightenbtn = document.querySelector('#lightenbtn');
const darkbtn = document.querySelector('#darkbtn');
const rainbowbtn = document.querySelector('#rainbowbtn');
const eraserbtn = document.querySelector('#eraserbtn');
const clearbtn = document.querySelector('#clearbtn');
const griditems = document.querySelectorAll('.grid-item'); // Defining these above so it can work for full code

// Update values dynamically
slider.addEventListener('input', () => {
  sliderValues.forEach((element) => {
    element.textContent = slider.value;
  });
  creategriditems(slider.value);
});

// Changing the grid values using slider.value

const sketcharea = document.querySelector('.sketch-area');
let size = slider.value;

function creategriditems(size){
  const totalitems = size * size;

  sketcharea.innerHTML = ' '

  for (let i = 1; i <= totalitems; i++){
    const newitem = document.createElement('div');
    newitem.className = 'grid-item';
    sketcharea.appendChild(newitem);
  }

  sketcharea.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  sketcharea.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  buttonstatus();
}

creategriditems(slider.value); 

// Buttons on and off mechanism

const buttons = document.querySelectorAll('.buttons button')

buttons.forEach((button) => {
  button.addEventListener('click', () => {

    buttons.forEach((btn) => btn.classList.remove('active')); // removes .active from all other buttons

    button.classList.toggle('active'); // adds .active to only specific button clicked

    buttonstatus(); // triggers a function to further write logic on specific button being on
  });
});

// Grid blocks changing colors as per color selected.

const colorpicker = document.querySelector('#colorpicker');

let currentColor = colorpicker.value; // Initialize with the color picker value

colorpicker.addEventListener('input', (e) => {
  currentColor = e.target.value; // Update the current color whenever the user picks a new color
});

function buttonstatus(){

  const griditems = document.querySelectorAll('.grid-item');

   // Clear all previous listeners to avoid duplicates
   griditems.forEach((griditem) => {
    griditem.removeEventListener('click', handleGridItemClick);
  });

  if (colorbtn.classList.contains('active')){

    griditems.forEach((griditem) => {
      griditem.addEventListener('click', handleGridItemClick)
      });
  }
  else if(eraserbtn.classList.contains('active')){

    griditems.forEach((griditem) => {
      griditem.addEventListener('click', handleEraserClick)
    })
  }
  else if(clearbtn.classList.contains('active')){

    griditems.forEach((griditem) => {
      griditem.style.backgroundColor = '';
  })
  }
}
    
   // Event handler for grid item color click
  function handleGridItemClick(e) {
  e.target.style.backgroundColor = currentColor; // Apply the current color picked from the colorpicker
}

  // Event handler for eraser click (clear color)
  function handleEraserClick(e) {
  e.target.style.backgroundColor = ''; // Remove color (erase)
}



  /*
  else if (lightenbtn.classList.contains('active')){
    console.log("lightenbtn")
  }
  else if (darkbtn.classList.contains('active')){
    console.log("darkbtn")
  }
  else if (rainbowbtn.classList.contains('active')){
    console.log("rainbowbtn")
  }
  else if (eraserbtn.classList.contains('active')){
    console.log("eraserbtn")
  }
  else if (clearbtn.classList.contains('active')){
    console.log("clearbtn")
  }
}
*/

// Applyimng function for color selecting im color mode
