

const slider = document.querySelector('.slider'); // Get the slider element
const sliderValues = document.querySelectorAll('.slider-value'); // Get all slider-value elements

// Update values dynamically
slider.addEventListener('input', () => {
  sliderValues.forEach((element) => {
    element.textContent = slider.value;
  });
});
