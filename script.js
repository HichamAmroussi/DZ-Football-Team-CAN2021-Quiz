//Variables
const quizData = [
  {
    question: "كم عدد ألقاب كأس الأمم الأفريقية الحائزة عليها الجزائر؟",
    a: "صفر لقب",
    b: "أربع ألقاب",
    c: "لقبين",
    d: "لقب واحد",
    correct: "c",
    background: "https://i.imgur.com/kOTqrGR.jpeg"
  },
  {
    question: "من هو المدرب الذي فاز بكأس افريقيا 1990؟",
    a: "إسماعيل خباطو",
    b: "عبد الحميد كرمالي",
    c: "رابح سعدان",
    d: "رشيد مخلوفي",
    correct: "b",
    background: "https://i.imgur.com/EAi2wuu.jpeg"
  },
  {
    question: "كم من مرة في تاريخها شاركت الجزائر في كأس افريقيا؟",
    a: "ثمان مرات",
    b: "عشر مرات",
    c: "خمس عشرة مرة",
    d: "تسعة عشر مرة",
    correct: "d",
    background: "https://media.thestar.com.my/Prod/44603895-4BFC-4361-B6DE-8BD48B493D8D"
  },
  {
    question: "متى كانت أول مشاركة في كأس افريقيا؟",
    a: "1962",
    b: "1965",
    c: "1968",
    d: "1982",
    correct: "c",
    background: "https://i.imgur.com/3Za7p3L.jpeg"
  },
  {
    question: "أي لاعب أكثر تسجيل للاهداف في هذه المنافسة؟",
    a: "رياض محرز",
    b: "سفيان فغولي",
    c: "إسلام سليماني",
    d: "رابح ماجر",
    correct: "a",
    background: "https://i.imgur.com/RtUXsbJ.jpeg"
  },
  {
    question: "أين نظمت أول طبعة فاز بها المنتخب الوطني الجزائري؟",
    a: "إثيوبيا",
    b: "مصر",
    c: "تونس",
    d: "الجزائر",
    correct: "d",
    background: "https://i.imgur.com/WSmU5C7.jpeg"
  },
{
    question: "ضد من كان هدف حسين عشيو الاسطوري في كأس أفريقيا 2004 بتونس؟",
    a: "المغرب",
    b: "تونس",
    c: "مصر",
    d: "مالي",
    correct: "c",
    background: "https://i.imgur.com/C3d9PMX.jpeg"
  },
{
    question: "أي دور أقصيت فيه الجزائر عام 2004؟",
    a: "النهائي",
    b: "ربع النهائي",
    c: "نصف النهائي",
    d: "مرحلة المجموعات",
    correct: "b",
    background: "https://i.imgur.com/NgAqDWE.jpeg"
  },
{
    question: "في أي دقيقة سجل بوقرة هدف التعادل في الربع النهائي المجنون ضد فريق ساحل العاج عام 2010؟",
    a: "الدقيقة 80",
    b: "الدقيقة 70",
    c: "الدقيقة 93",
    d: "الدقيقة 91",
    correct: "d",
    background: "https://i.imgur.com/0PW0L39.jpg"
  },
{
    question: "أي جزائري نال لقب أحسن لاعب في دورة 2019؟",
    a: "رياض محرز",
    b: "إسماعيل بن ناصر",
    c: "يوسف بلايلي",
    d: "بغداد بونجاح",
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
          ${score === 10 ? `<h4 class="remarque">&#128079; كل اجاباتك صحيحة, أنت مشجع وفي</h4>` : (score > 6) ? `<h4 class="remarque">&#9917; معرفتك عن المنتخب الجزائري جيدة</h4>` : (score > 3) ? `<h4 class="remarque">&#9917; أحسنت, لكن يمكنك تحسين معرفتك</h4>` : `<h4 class="remarque">&#128064; يمكنك تحسين معرفتك بكثير </h4>`}
          <hr style="border: none; height: 2px; width:10%; background: #AB3127">
          <h4 class="score-text"> تحصلت على ${score} إجابات صحيحة من ${quizData.length}</h4>
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