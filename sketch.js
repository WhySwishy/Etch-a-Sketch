

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