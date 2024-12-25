

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
    newitem.style.backgroundColor = 'white';
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
   griditems.forEach(griditem => {
    const newGridItem = griditem.cloneNode(true);
    griditem.replaceWith(newGridItem);
  });

  // Re-select the new grid items after replacing
  const updatedGridItems = document.querySelectorAll('.grid-item');

  // Checks which button class has 'active' and add event listeners to each grid item to perform specific task
  
  if (colorbtn.classList.contains('active')) {
    let ismousedown = false;
  
    updatedGridItems.forEach((griditem) => {
      griditem.addEventListener('mousedown', () => {
        ismousedown = true;
        griditem.style.backgroundColor = currentColor;
      });
  
      griditem.addEventListener('mouseover', () => {
        if (ismousedown) {
          griditem.style.backgroundColor = currentColor;
        }
      });
    });
  
    document.addEventListener('mouseup', () => {
      ismousedown = false;
    });
  }
  else if(lightenbtn.classList.contains('active')){

    updatedGridItems.forEach((griditem) => {
      griditem.addEventListener('click', () => {
        const color = window.getComputedStyle(griditem).backgroundColor;

        const {r, g, b} = parseRgb(color)
        const { h, s, l} = rgbToHsl(r, g, b);

        const newL = Math.min(l + 7, 100);
        const newcolor = `hsl(${h}, ${s}%, ${newL}%)`;

        griditem.style.backgroundColor = newcolor;

        }
    )})
    }
  else if(darkbtn.classList.contains('active')){

    updatedGridItems.forEach((griditem) => {
      griditem.addEventListener('click', () => {
        const color = window.getComputedStyle(griditem).backgroundColor;

        const {r, g, b} = parseRgb(color)
        const { h, s, l} = rgbToHsl(r, g, b);

        const newL = Math.max(l - 7, 0);
        const newcolor = `hsl(${h}, ${s}%, ${newL}%)`;

        griditem.style.backgroundColor = newcolor;
    }
  )})
   }
  else if(rainbowbtn.classList.contains('active')){

    let ismousedown = false;
  
    updatedGridItems.forEach((griditem) => {
      griditem.addEventListener('mousedown', () => {
        ismousedown = true;
        griditem.style.backgroundColor = getRandomColor();
      });
  
      griditem.addEventListener('mouseover', () => {
        if (ismousedown) {
          griditem.style.backgroundColor = getRandomColor();
        }
      });
    });
  
    document.addEventListener('mouseup', () => {
      ismousedown = false;
    });
  }
  else if(eraserbtn.classList.contains('active')){

    let ismousedown = false;
  
    updatedGridItems.forEach((griditem) => {
      griditem.addEventListener('mousedown', () => {
        ismousedown = true;
        griditem.style.backgroundColor = 'white';
      });
  
      griditem.addEventListener('mouseover', () => {
        if (ismousedown) {
          griditem.style.backgroundColor = 'white';
        }
      });
    });
  
    document.addEventListener('mouseup', () => {
      ismousedown = false;
    });
  }
  else if(clearbtn.classList.contains('active')){

    updatedGridItems.forEach((griditem) => {
      griditem.style.backgroundColor = 'white';
  })
  }
}

    
   // Event handler for grid item color click
  function handleGridItemClick(e) {
  e.target.style.backgroundColor = currentColor; // Apply the current color picked from the colorpicker
}

  // Event handler for eraser click (clear color)
  function handleEraserClick(e) {
  e.target.style.backgroundColor = 'white'; // Remove color (erase)
}

// Lighten and darken button logic

// converts the rgb to hsl 

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let l = (max + min) / 2;

  let s = 0;
  if (max !== min) {
    s = l <= 0.5 ? (max - min) / (max + min) : (max - min) / (2.0 - max - min);
  }

  let h = 0;
  if (max !== min) {
    if (max === r) {
      h = (g - b) / (max - min);
    } else if (max === g) {
      h = 2.0 + (b - r) / (max - min);
    } else {
      h = 4.0 + (r - g) / (max - min);
    }
  }

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return { h, s, l };
}

// convert the rgb input got from computedstyle in right format to process to hsl  

function parseRgb(rgbString) {
  const match = rgbString.match(/rgb\((\d+), (\d+), (\d+)\)/);
  if (!match) {
    throw new Error('Invalid RGB format');
  }
  const [, r, g, b] = match.map(Number);
  return { r, g, b };
}

// Get random color function 

function getRandomColor(){
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}