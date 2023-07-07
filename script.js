const arrayContainer = document.getElementById('array-container');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

nextBtn.addEventListener('click', nextStep);
prevBtn.addEventListener('click', prevStep);

let array = [];
let steps = [];
let currentIndex = 0;
let pass = 0;

function generateArrayFromInput() {
  const input = prompt('Enter comma-separated array values:');
  const values = input.split(',').map(value => parseInt(value.trim()));
  
  if (values.length < 8 || values.length > 20) {
    alert('Invalid input! Number of elements should be between 8 and 20.');
    generateArrayFromInput();
    return;
  }
  
  if (values.every(Number.isInteger)) {
    array = values;
    renderArray(array);
  } else {
    alert('Invalid input! Please enter comma-separated integer values.');
    generateArrayFromInput();
  }
}

function renderArray(array) {
  arrayContainer.innerHTML = '';

  array.forEach((value) => {
    const bar = document.createElement('div');
    bar.classList.add('bar');

    const number = document.createElement('span');
    number.textContent = value;
    bar.appendChild(number);

    bar.style.height = value * 4 + 'px';
    arrayContainer.appendChild(bar);
  });

  // Remove swapping classes from all bars
  const swappingBars = document.querySelectorAll('.bar.swapping');
  swappingBars.forEach((bar) => {
    bar.classList.remove('swapping');
  });
}

function nextStep() {
  if (pass >= array.length - 1) {
    // Sorting is complete
    nextBtn.disabled = true;
    return;
  }

  if (currentIndex >= array.length - 1 - pass) {
    // Move to the next pass
    currentIndex = 0;
    pass++;
    alert(`Pass ${pass} completed.`);
  }

  let swapped = false;
  if (array[currentIndex] > array[currentIndex + 1]) {
    // Swap the elements
    const temp = array[currentIndex];
    array[currentIndex] = array[currentIndex + 1];
    array[currentIndex + 1] = temp;
    swapped = true;

    renderArray(array); // Render the array before adding the swapping class

    // Add swapping classes to the bars being swapped
    const currentBar = arrayContainer.children[currentIndex].firstChild;
    const nextBar = arrayContainer.children[currentIndex + 1].firstChild;
    currentBar.classList.add('swapping');
    nextBar.classList.add('swapping');
    
    setTimeout(() => {
      // Remove the swapping class after a delay to visualize the swap
      currentBar.classList.remove('swapping');
      nextBar.classList.remove('swapping');
    }, 500); // Delay in milliseconds (adjust as desired)
  }

  currentIndex++;
  if (!swapped && currentIndex >= array.length - 1 - pass) {
    // No more swaps in this pass
    currentIndex = 0;
    pass++;
    alert(`Pass ${pass} completed.`);
  }

  steps.push([...array]); // Save current step
  prevBtn.disabled = false;

  if (pass >= array.length - 1) {
    nextBtn.disabled = true; // Disable next button when all passes are completed
  }
}

function prevStep() {
  if (steps.length > 1) {
    steps.pop(); // Remove current step
    array = [...steps[steps.length - 1]]; // Restore previous step

    // Restore the current index and pass
    currentIndex--;
    if (currentIndex < 0) {
      pass--;
      currentIndex = array.length - 2 - pass;
    }

    renderArray(array);
    nextBtn.disabled = false;
  }

  if (steps.length === 1) {
    prevBtn.disabled = true; // Disable previous button if we reach the initial state
  }
}

generateArrayFromInput();

  
  




