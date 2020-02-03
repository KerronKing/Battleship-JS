import './style.css';
import gameflow from './gameflow';

const startBtn = document.getElementById('start');
const restartBtn = document.getElementById('restart');

const formContainer = document.getElementById('input-container');
startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  formContainer.classList.replace('hidden', 'visible');
});

restartBtn.addEventListener('click', (e) => {
  e.preventDefault();
  gameflow.resetGame();
});

gameflow.start();
