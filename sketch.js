

const slider = document.querySelector('.slider'); // Get the slider element
const sliderValues = document.querySelectorAll('.slider-value'); // Get all slider-value elements

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

const colorbtn = document.querySelector('#colorbtn');
const lightenbtn = document.querySelector('#lightenbtn');
const darkbtn = document.querySelector('#darkbtn');
const rainbowbtn = document.querySelector('#rainbowbtn');
const eraserbtn = document.querySelector('#eraserbtn');
const clearbtn = document.querySelector('#clearbtn');


function buttonstatus(){
  if (colorbtn.classList.contains('active')){
    
    const griditems = document.querySelectorAll('.grid-item')

    griditems.forEach(griditem => {
      griditem.addEventListener('click', () => {
        griditem.style.backgroundColor = 'black'
      })
    })
  } 
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

