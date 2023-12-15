//Variables
const quizData = [
  {
    question: "Combien de titres de Coupe d'Afrique des Nations l'Algérie a-t-elle remportés ?",
    a: "Aucun",
    b: "Quatre titre",
    c: "Deux titre",
    d: "Un seul titre",
    correct: "c",
    background: "https://i.imgur.com/kOTqrGR.jpeg"
  },
  {
    question: "Qui est l'entraîneur qui a remporté la Coupe d'Afrique 1990 ?",
    a: "Smaïl Khabatou",
    b: "Abdelhamid Kermali",
    c: "Rabah Saâdane",
    d: "Rachid Mekhloufi",
    correct: "b",
    background: "https://i.imgur.com/EAi2wuu.jpeg"
  },
  {
    question: "Combien de fois dans son histoire l’Algérie a-t-elle participé à la Coupe d’Afrique ?",
    a: "Huit fois",
    b: "Dix fois",
    c: "Quinze fois",
    d: "Dix neuf fois",
    correct: "d",
    background: "https://media.thestar.com.my/Prod/44603895-4BFC-4361-B6DE-8BD48B493D8D"
  },
  {
    question: "Quand a eu lieu la première participation à la Coupe d'Afrique ?",
    a: "1962",
    b: "1965",
    c: "1968",
    d: "1982",
    correct: "c",
    background: "https://i.imgur.com/3Za7p3L.jpeg"
  },
  {
    question: "Quel est le meilleur buteur à la CAN dans l'histoire de l'Algérie ?",
    a: "Riyad Mahrez",
    b: "Sofiane Feghouli",
    c: "Islam Slimani",
    d: "Rabah Madjer",
    correct: "a",
    background: "https://i.imgur.com/RtUXsbJ.jpeg"
  },
  {
    question: "Où s'est déroulée la première CAN remportée par l'équipe nationale algérienne ?",
    a: "Éthiopie",
    b: "Égypte",
    c: "Tunisie",
    d: "Algérie",
    correct: "d",
    background: "https://i.imgur.com/WSmU5C7.jpeg"
  },
{
    question: "Contre qui Houcine Achiou a-t-il inscrit son but historique lors de la CAN 2004 organisée en Tunisie ?",
    a: "Maroc",
    b: "Tunisie",
    c: "Égypte",
    d: "Mali",
    correct: "c",
    background: "https://i.imgur.com/C3d9PMX.jpeg"
  },
{
    question: "À quel tour l'Algérie a-t-elle été éliminé en 2004 ?",
    a: "Finale",
    b: "Quart de finale",
    c: "demi-finales",
    d: "Phase de groupes",
    correct: "b",
    background: "https://i.imgur.com/NgAqDWE.jpeg"
  },
{
    question: "A quelle minute Bougherra a-t-il égalisé lors du quart de finale fou contre la Côte d'Ivoire en 2010 ?",
    a: "80ème minute",
    b: "70ème minute",
    c: "93ème minute",
    d: "91ème minute",
    correct: "d",
    background: "https://i.imgur.com/0PW0L39.jpg"
  },
{
    question: "Quel joueur Algérien a remporté le titre de meilleur joueur de la CAN 2019",
    a: "Riyad Mahrez",
    b: "Ismaël Bennacer",
    c: "Youcef Belaïli",
    d: "Baghdad Bounedjah",
    correct: "b",
    background: "https://i.imgur.com/2Mjlw20.jpeg"
  }
]

let currentQuestion = 0;
let score = 0;
let currentActive = 1;

//Selectors
const btnElements = document.querySelectorAll('.answer');
const background = document.querySelector('.background');
const questionsContainer = document.querySelector('.container');
const questionElement = document.querySelector('.question');
const btnElement1 = document.querySelector('.a_text');
const btnElement2 = document.querySelector('.b_text');
const btnElement3 = document.querySelector('.c_text');
const btnElement4 = document.querySelector('.d_text');
//Top Progress Bar
const bars = document.querySelectorAll('.bar');
const barNumbers = document.querySelector('.question-nums');

//Event Listeners
btnElements.forEach(button => {
  button.addEventListener('click', setNextQuestion);
})

loadQuiz();

//Functions
function loadQuiz() {
  //Deselect Answers
  deselectAnswers();
  //Display how many questions has been answered on the top left
  barNumbers.innerText = currentActive + "/" + quizData.length;
  
  //Wait for Background Image to Load
  let image = new Image();
  image.src = quizData[currentQuestion].background;
  //Load Quiz
  setTimeout(() => {
    background.style.backgroundImage = "linear-gradient( 115deg, rgba(53, 126, 106, 0.7), rgba(101, 188, 164, 0.6) ), url(" + image.src + ")";
    background.style.backgroundColor = "rgba(15 ,15 ,15 ,0)";
    questionElement.innerText = quizData[currentQuestion].question;
    btnElement1.innerText = quizData[currentQuestion].a;
    btnElement2.innerText = quizData[currentQuestion].b;
    btnElement3.innerText = quizData[currentQuestion].c;
    btnElement4.innerText = quizData[currentQuestion].d;

    questionsContainer.style.transition = "all 1s ease";
    questionsContainer.classList.add('transition');
  }, 1000);
}

function setNextQuestion() {
  background.style.backgroundColor = "rgba(15 ,15 ,15 ,1)";
  questionsContainer.style.transition = "none";
  questionsContainer.classList.remove('transition');
  //Update the Top Progress Bar
  currentActive++;
  
  if(currentActive > quizData.length) {
    currentActive = quizData.length;
  }
  
  bars.forEach((bar, index) => {
    if(index < currentActive) {
      bar.classList.add('active');
    }
  })
  
  barNumbers.innerText = currentActive + "/" + quizData.length;
  
  //CHECK ANSWER
  const answer = getSelected();
  
  if(answer === quizData[currentQuestion].correct) {
      score++;
  }
  
  currentQuestion++;
  
  if(currentQuestion < quizData.length) {
    loadQuiz();
  } else {
      setTimeout(() => {
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
            score === 10 ? `<h4 class="remarque">Score complet, Bravo à toi ! &#128079;</h4>` 
            : (score > 6) ? `<h4 class="remarque">Très bon score, il te manque peu pour avoir un score complet. &#9917;</h4>` 
            : (score > 3) ? `<h4 class="remarque">Bien joué! mais je sais que tu peux faire mieux. &#9917;</h4>` 
            : `<h4 class="remarque">Tu peux faire beaucoup mieux que ça! &#128064;</h4>`
          }
          <hr style="border: none; height: 2px; width:10%; background: #AB3127">
          <h4 class="score-text">Ton score est de ${score} sur ${quizData.length}</h4>
          <div class="wrapper">
            <div class="circular-progress">
              <div class="value-container">${score}/${quizData.length}</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="250px" height="250px">
              <circle cx="125" cy="125" r="123" stroke-linecap="round" />
            </svg>
          </div>
      `
        document.querySelector('circle').style.setProperty('--m', 770 - (770 * (score * 0.1)));
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