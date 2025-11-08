let seconds = 0;
let interval = null;
let startTime = null; // novo: para registrar o momento exato em que começou

function updateTimer() {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  document.getElementById('display').textContent = `${hrs}:${mins}:${secs}`;
}

function startTimer() {
  if (interval) return;

  // guarda o momento atual, subtraindo o tempo já contado (caso esteja pausando e retomando)
  startTime = Date.now() - seconds * 1000;

  interval = setInterval(() => {
    // calcula quanto tempo passou desde que iniciou
    seconds = Math.floor((Date.now() - startTime) / 1000);
    updateTimer();
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  pauseTimer();
  seconds = 0;
  updateTimer();
}

updateTimer();

const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');

function setActive(button) {
    // Remove a classe active de todos os botões
    document.querySelectorAll('.button').forEach(btn => btn.classList.remove('active'));
    // Adiciona active no botão clicado
    button.classList.add('active');
}

// Eventos
startBtn.addEventListener('click', () => {
    startTimer();
    setActive(startBtn);
});

pauseBtn.addEventListener('click', () => {
    pauseTimer();
    setActive(pauseBtn);
});

resetBtn.addEventListener('click', () => {
    resetTimer();
    setActive(resetBtn);
});
