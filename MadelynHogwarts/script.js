const introScreen = document.getElementById('introScreen');
const mainPage = document.getElementById('mainPage');
const startBtn = document.getElementById('startBtn');
const startBtnSecondary = document.getElementById('startBtnSecondary');
const doorOverlay = document.getElementById('doorOverlay');
const scrollLetterBtn = document.getElementById('scrollLetterBtn');
const questionTitle = document.getElementById('questionTitle');
const optionsContainer = document.getElementById('options');
const houseResult = document.getElementById('houseResult');
const mapCards = document.querySelectorAll('.map-card');
const mapDetail = document.getElementById('mapDetail');
const potionButtons = document.querySelectorAll('.potion');
const potionMessage = document.getElementById('potionMessage');
const patronusBtn = document.getElementById('patronusBtn');
const patronusResult = document.getElementById('patronusResult');
const finishBtn = document.getElementById('finishBtn');
const houseButtons = document.querySelectorAll('.house-btn');

const questions = [
  {
    question: '¿Qué valoras más?',
    options: [
      { text: 'La valentía y la acción', house: 'Gryffindor' },
      { text: 'La lealtad y la amistad', house: 'Hufflepuff' },
      { text: 'La sabiduría y la curiosidad', house: 'Ravenclaw' },
      { text: 'La ambición y el propósito', house: 'Slytherin' }
    ]
  },
  {
    question: '¿Qué harías ante un reto?',
    options: [
      { text: 'Lo afrontaría sin dudar', house: 'Gryffindor' },
      { text: 'Buscaría apoyo y paciencia', house: 'Hufflepuff' },
      { text: 'Lo analizaría hasta encontrar la mejor respuesta', house: 'Ravenclaw' },
      { text: 'Lo convertiría en una oportunidad', house: 'Slytherin' }
    ]
  },
  {
    question: '¿Qué criatura mágica elegirías?',
    options: [
      { text: 'Un fénix', house: 'Gryffindor' },
      { text: 'Un tejo', house: 'Hufflepuff' },
      { text: 'Un hipogrifo', house: 'Ravenclaw' },
      { text: 'Una serpiente', house: 'Slytherin' }
    ]
  },
  {
    question: '¿Qué te define mejor?',
    options: [
      { text: 'Coraje', house: 'Gryffindor' },
      { text: 'Bondad', house: 'Hufflepuff' },
      { text: 'Inteligencia', house: 'Ravenclaw' },
      { text: 'Determinación', house: 'Slytherin' }
    ]
  }
];

const houseDetails = {
  Gryffindor: {
    title: 'Gryffindor',
    text: 'Una casa de valentía, pasión y coraje. Tu magia brilla cuando te enfrentas al miedo.'
  },
  Hufflepuff: {
    title: 'Hufflepuff',
    text: 'Una casa de lealtad, paciencia y trabajo constante. Tu luz es serena pero inolvidable.'
  },
  Ravenclaw: {
    title: 'Ravenclaw',
    text: 'Una casa de creatividad, conocimiento y mente brillante. Tu magia crece con la curiosidad.'
  },
  Slytherin: {
    title: 'Slytherin',
    text: 'Una casa de ambición, astucia y fuerza interior. Tu magia se vuelve poderosa cuando confías en ti.'
  }
};

const mapContent = {
  library: {
    title: 'Biblioteca',
    text: 'Aquí encontrarás algunos secretos escondidos entre páginas y estrellas.'
  },
  greatHall: {
    title: 'Gran Comedor',
    text: 'Hay una sorpresa esperándote en cada mesa y cada conversación.'
  },
  astronomy: {
    title: 'Torre de Astronomía',
    text: 'Una noche llena de estrellas a la que solo los más curiosos llegan.'
  },
  owlery: {
    title: 'Lechucería',
    text: 'Un lugar dedicado a las mensajeras más elegantes del mundo mágico.'
  }
};

const potionContent = {
  happiness: 'Espero que nunca te falten motivos para sonreír.',
  courage: 'Siempre sigue adelante, incluso cuando el camino se vuelva incierto.',
  luck: 'Que la magia te acompañe en cada paso nuevo.'
};

const patronusAnimals = ['🦊', '🦉', '🦌', '🦁', '🐺', '🐇', '🦅', '🦋'];

let currentQuestion = 0;
const scores = { Gryffindor: 0, Hufflepuff: 0, Ravenclaw: 0, Slytherin: 0 };
let chosenHouse = null;

function enterExperience() {
  introScreen.classList.add('opening');
  doorOverlay.classList.add('active');
  setTimeout(() => {
    introScreen.style.display = 'none';
    mainPage.style.display = 'block';
    document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
  }, 1200);
}

startBtn.addEventListener('click', () => {
  enterExperience();
});

startBtnSecondary.addEventListener('click', () => {
  enterExperience();
});

scrollLetterBtn.addEventListener('click', () => {
  document.querySelector('.letter-card').scrollIntoView({ behavior: 'smooth' });
});

function renderQuestion() {
  const current = questions[currentQuestion];
  questionTitle.textContent = current.question;
  optionsContainer.innerHTML = '';

  current.options.forEach((option) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = option.text;
    button.addEventListener('click', () => handleAnswer(option.house));
    optionsContainer.appendChild(button);
  });
}

function handleAnswer(house) {
  scores[house] += 1;
  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
  } else {
    revealHouse();
  }
}

function revealHouse() {
  let house = chosenHouse;

  if (!house) {
    const sortedHouse = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    house = sortedHouse;
  }

  const detail = houseDetails[house];
  houseResult.innerHTML = `
    <div>
      <h4>${detail.title}</h4>
      <p>${detail.text}</p>
    </div>
  `;
  houseResult.classList.add('active');
  createConfetti();
}

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  document.body.appendChild(confetti);
  const colors = ['#f5d36f', '#7ec1ff', '#d7a1ff', '#ffffff'];

  for (let i = 0; i < 28; i += 1) {
    const piece = document.createElement('span');
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = `${2 + Math.random() * 2}s`;
    piece.style.animationDelay = `${Math.random() * 0.3}s`;
    confetti.appendChild(piece);
  }

  setTimeout(() => confetti.remove(), 2400);
}

houseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    chosenHouse = button.dataset.house;
    houseButtons.forEach((btn) => btn.classList.remove('selected'));
    button.classList.add('selected');
    houseResult.innerHTML = `<div><h4>${houseDetails[chosenHouse].title}</h4><p>Tu elección quedó guardada. Puedes seguir con el sombrero o dejarlo así.</p></div>`;
    houseResult.classList.add('active');
  });
});

mapCards.forEach((card) => {
  card.addEventListener('click', () => {
    mapCards.forEach((item) => item.classList.remove('active'));
    card.classList.add('active');
    const detail = mapContent[card.dataset.place];
    mapDetail.innerHTML = `<h4>${detail.title}</h4><p>${detail.text}</p>`;
  });
});

potionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    potionMessage.textContent = potionContent[button.dataset.potion];
  });
});

patronusBtn.addEventListener('click', () => {
  const animal = patronusAnimals[Math.floor(Math.random() * patronusAnimals.length)];
  patronusResult.textContent = animal;
  patronusResult.classList.add('show');
  setTimeout(() => patronusResult.classList.remove('show'), 800);
});

finishBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

renderQuestion();
