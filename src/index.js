require('./style.css');
const gameflow = require('./gameflow');

const startBtn = document.getElementById('start');
const formContainer = document.getElementById('input-container');
startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  formContainer.classList.replace('hidden', 'visible');
});

gameflow.start();
