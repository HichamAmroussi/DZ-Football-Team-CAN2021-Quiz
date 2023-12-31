// JSON file path
const quizFileFR = "./data/FRQuestions.json";
const quizFileAR = "./data/ARQuestions.json";
// DOM Selectors
const startContainer = document.querySelector('.start-container');
const languageBtns = startContainer.querySelectorAll('button');
const btnElements = document.querySelectorAll('.answer');
const background = document.querySelector('.background');
const questionsContainer = document.querySelector('.container');
const questionElement = document.querySelector('.question');
const btnElement1 = document.querySelector('.a_text');
const btnElement2 = document.querySelector('.b_text');
const btnElement3 = document.querySelector('.c_text');
const btnElement4 = document.querySelector('.d_text');
// Top Progress Bar
const bars = document.querySelectorAll('.bar');
const barNumbers = document.querySelector('.question-nums');
// Variables
let quizLanguage;
let quizFilePath;
let currentQuestion = 0;
let score = 0;
let currentActive = 1;
let questionAnswerStatut = [];

// Event Listeners
languageBtns.forEach(button => button.addEventListener('click', loadQuiz));
btnElements.forEach(button => button.addEventListener('click', setNextQuestion));

//Functions
async function loadQuiz(e) {
  // Remove Language Container and Display Quiz Container
  startContainer.style.display = "none";
  background.style.display = "flex";

  // Set Quiz Language
  quizLanguage = e.target.value;

  if(quizLanguage === "FR") {
    quizFilePath = "./data/FRQuestions.json";
  } else {
    quizFilePath = "./data/ARQuestions.json";
  }

  const api = await fetch(quizFilePath);
  const quizData = await api.json();

  //Deselect Answers
  deselectAnswers();
  //Display how many questions has been answered on the top left
  barNumbers.innerText = currentActive + "/" + quizData.questions.length;
  
  //Wait for Background Image to Load
  let image = new Image();
  image.src = quizData.questions[currentQuestion].background;
  //Display Quiz
  setTimeout(() => {
    background.style.backgroundImage = "linear-gradient( 115deg, rgba(53, 126, 106, 0.7), rgba(101, 188, 164, 0.6) ), url(" + image.src + ")";
    background.style.backgroundColor = "rgba(15 ,15 ,15 ,0)";
    questionElement.innerText = quizData.questions[currentQuestion].question;
    btnElement1.innerText = quizData.questions[currentQuestion].a;
    btnElement2.innerText = quizData.questions[currentQuestion].b;
    btnElement3.innerText = quizData.questions[currentQuestion].c;
    btnElement4.innerText = quizData.questions[currentQuestion].d;

    questionsContainer.style.transition = "all 1s ease";
    questionsContainer.classList.add('transition');
  }, 1000);
}

async function nextQuestion() {
  const api = await fetch(quizFilePath);
  const quizData = await api.json();

  //Deselect Answers
  deselectAnswers();
  //Display how many questions has been answered on the top left
  barNumbers.innerText = currentActive + "/" + quizData.questions.length;
  
  //Wait for Background Image to Load
  let image = new Image();
  image.src = quizData.questions[currentQuestion].background;
  //Display Quiz
  setTimeout(() => {
    background.style.backgroundImage = "linear-gradient( 115deg, rgba(53, 126, 106, 0.7), rgba(101, 188, 164, 0.6) ), url(" + image.src + ")";
    background.style.backgroundColor = "rgba(15 ,15 ,15 ,0)";
    questionElement.innerText = quizData.questions[currentQuestion].question;
    btnElement1.innerText = quizData.questions[currentQuestion].a;
    btnElement2.innerText = quizData.questions[currentQuestion].b;
    btnElement3.innerText = quizData.questions[currentQuestion].c;
    btnElement4.innerText = quizData.questions[currentQuestion].d;

    questionsContainer.style.transition = "all 1s ease";
    questionsContainer.classList.add('transition');
  }, 1000);
}

async function setNextQuestion() {
  const api = await fetch(quizFilePath);
  const quizData = await api.json();

  background.style.backgroundColor = "rgba(15 ,15 ,15 ,1)";
  questionsContainer.style.transition = "none";
  questionsContainer.classList.remove('transition');
  //Update the Top Progress Bar
  currentActive++;
  
  if(currentActive > quizData.questions.length) {
    currentActive = quizData.questions.length;
  }
  
  bars.forEach((bar, index) => {
    if(index < currentActive) {
      bar.classList.add('active');
    }
  })
  
  barNumbers.innerText = currentActive + "/" + quizData.questions.length;
  
  //CHECK ANSWER
  const answer = getSelected();
  
  if(answer === quizData.questions[currentQuestion].correct) {
    score++;
    questionAnswerStatut[currentQuestion] = true;
  } else {
    questionAnswerStatut[currentQuestion] = false;
  }

  currentQuestion++;
  
  if(currentQuestion < quizData.questions.length) {
    nextQuestion();
  } else {
    setTimeout(() => {
      displayScore(quizData);
    }, 2000);
  }
}

function getSelected() {
  let answer;
  
  btnElements.forEach(button => {
    if(button.checked) {
      answer = button.id;
    }
  })
  
  return answer;
}

function deselectAnswers() { 
  btnElements.forEach(button => {
    button.checked = false;
  })
}

function displayScore(quizData) {
  bars.forEach(bar => {
    bar.style.display = "none";
  })
  barNumbers.style.display = "none";
  background.style.backgroundColor = "rgba(15 ,15 ,15 ,0)";
  background.style.backgroundImage = "linear-gradient( 115deg, rgba(20, 20, 20, 0.9), rgba(20, 20, 20, 0.8) ), url(https://media.thestar.com.my/Prod/44603895-4BFC-4361-B6DE-8BD48B493D8D)";
  background.style.justifyContent = "center";
  background.innerHTML = `
    <hr style="border: none; height: 2px; width:10%; background: #AB3127">
    ${
      score === 10 ? `<h4 class="remarque">${quizData.score.high}</h4>` 
      : (score > 6) ? `<h4 class="remarque">${quizData.score.middle}</h4>` 
      : (score > 3) ? `<h4 class="remarque">${quizData.score.low}</h4>` 
      : `<h4 class="remarque">${quizData.score.veryLow}</h4>`
    }
    <hr style="border: none; height: 2px; width:10%; background: #AB3127">

    ${quizLanguage === "FR" 
      ? `<h4 class="score-text">Ton score est de ${score} sur ${quizData.questions.length}</h4>`
      : `<h4 class="score-text"> تحصلت على ${score} إجابات صحيحة من ${quizData.questions.length}</h4>`
    }

    <div class="wrapper">
      <div class="circular-progress">
        <div class="value-container">${score}/${quizData.questions.length}</div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="250px" height="250px">
        <circle cx="125" cy="125" r="123" stroke-linecap="round" />
      </svg>

      <div class="bubble-container">
        <div class="bubble ${questionAnswerStatut[0] ? "green" : "red"}"></div>
        <div class="bubble ${questionAnswerStatut[1] ? "green" : "red"}"></div>
        <div class="bubble ${questionAnswerStatut[2] ? "green" : "red"}"></div>
        <div class="bubble ${questionAnswerStatut[3] ? "green" : "red"}"></div>
        <div class="bubble ${questionAnswerStatut[4] ? "green" : "red"}"></div>
        <div class="bubble ${questionAnswerStatut[5] ? "green" : "red"}"></div>
        <div class="bubble ${questionAnswerStatut[6] ? "green" : "red"}"></div>
        <div class="bubble ${questionAnswerStatut[7] ? "green" : "red"}"></div>
        <div class="bubble ${questionAnswerStatut[8] ? "green" : "red"}"></div>
        <div class="bubble ${questionAnswerStatut[9] ? "green" : "red"}"></div>
      </div>
    </div>
  `
  document.querySelector('circle').style.setProperty('--m', 770 - (770 * (score * 0.1)));
}