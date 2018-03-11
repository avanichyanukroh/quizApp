let questionNumber = 0;
let score = 0;

function questionTemplate() {
  //the layout of the questions and answers given.
  if (questionNumber < STORE.length) {
    return `<div class="questions col-12">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption col-6">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption col-6">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption col-6">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption col-6">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
  } 
  else {
    renderResults();
    handleRestartButton();
    $('.questionNumber').text(10);
  }
  console.log('`questionTemplate` ran');
}

function changeQuestionNumber() {
  //changes question number by 1 and updates question number to user.
      questionNumber ++;
  $('.questionNumber').text(questionNumber+1);
  
  console.log('`changeQuestionNumber` ran');
}

function changeScoreNumber() {
  score ++;
  
  console.log('`changeScoreNumber` ran');
}

function updateRank() {
    //change rank title according to score range.
  if (score <= 3) {
     $('.rank').text('bronze');
    }
  else if (score > 3 && score <= 5) {
     $('.rank').text('silver');
    }
  else if (score > 5 && score <= 7) {
     $('.rank').text('gold');
    }
  else if (score === 8) {
     $('.rank').text('platinum');
    }
  else if (score === 9) {
     $('.rank').text('diamond');
    }
  else if (score === 10) {
     $('.rank').text('master');
    }

  console.log('`changeRank` ran');
}


function handleStartButton() {
  //handle start button to enter question form.
  $('.quizStart').on('click', '.startButton', function (event) {
    $('.quizStart').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
  });
  console.log('`handleStartButton` ran');
}

function renderQuestions() {
  //renders the questions one by one.
  //have it render template, link to handlestartbutton
  $('.questionAnswerForm').html(questionTemplate());
  
  console.log('`renderQuestions` ran');
}


function handleSubmitButton() {
  $('form').submit(event => {
    // stop the default form submission behavior
    event.preventDefault();
let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } 
    else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
//handle submit button after selecting answer choice.
  
  console.log('`handleSubmitButton` ran');
}

function updateScore () {
  changeScoreNumber();
  $('.score').text(score);
}

function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
  updateRank();
}

function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
}

//user feedback for correct answer
function userAnswerFeedbackCorrect () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p>You got it right!</p><button type=button class="nextButton">Next</button></div>`);
}

//user feedback for wrong answer
function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p>You got it wrong<br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

function handleNextButton() {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestions();
    handleSubmitButton();
  });
  console.log('`handleNextButton` ran');
}

function handleRestartButton() {
  //handle start over button at the end of the quiz form.
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
  
  console.log('`handleRestartButton` ran');
}

function renderResults () {
  //renders results to user at the end of the quiz.
  if (score <= 3) {
     $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>you got ${score}/10 correct!</h3><img src="https://vignette.wikia.nocookie.net/leagueoflegends/images/b/b4/BronzeBadgeSeason2.png/revision/latest?cb=20130928162132" alt="bronze medal icon"/><p>you're video game knowledge is rank <div class="rankText">bronze</div></p><button class="restartButton">Restart</button></div>`);
    }
  else if (score > 3 && score <= 5) {
     $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>you got ${score}/10 correct!</h3><img src="https://elo-boost.net/images/tiers/silver_4.png" alt="silver medal icon"/><p>you're video game knowledge is rank <div class="rankText">silver</div></p><button class="restartButton">Restart</button></div>`);
    }
  else if (score > 5 && score <= 7) {
     $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>you got ${score}/10 correct!</h3><img src="https://pro-rankedboost.netdna-ssl.com/wp-content/uploads/2015/07/Gold-Tier.png" alt="gold medal icon"/><p>you're video game knowledge is rank <div class="rankText">gold</div></p><button class="restartButton">Restart</button></div>`);
    }
  else if (score === 8) {
     $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>you got ${score}/10 correct!</h3><img src="http://vignette2.wikia.nocookie.net/leagueoflegends/images/f/f1/Platinum_iv.png/revision/latest?cb=20131220212154" alt="platinum medal icon"/><p>you're video game knowledge is rank <div class="rankText">platinum</div></p><button class="restartButton">Restart</button></div>`);
    }
  else if (score === 9) {
     $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>you got ${score}/10 correct!</h3><img src="https://vignette.wikia.nocookie.net/leagueoflegends/images/0/03/DiamondBadge.png/revision/latest?cb=20130928162320" alt="diamond medal icon"/><p>you're video game knowledge is rank <div class="rankText">diamond</div></p><button class="restartButton">Restart</button></div>`);
    }
  else if (score === 10) {
     $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>you got ${score}/10 correct!</h3><img src="https://www.lol-smurfs.com/blog/wp-content/uploads/2017/01/master.png" alt="master medal icon"/><p>you're video game knowledge is rank <div class="rankText">master</div></p><button class="restartButton">Restart</button></div>`);
    }
}

function handleQuizApp() {
  //final function that calls all other functions.
  handleStartButton();
  renderQuestions();
  handleSubmitButton();
  handleNextButton();
  
}

//when page loads, callback `handleQuizApp`
$(handleQuizApp);

