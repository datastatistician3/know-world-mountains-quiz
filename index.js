questionIndex = 0;

correctAnswers = 0;

function generateQuestionForm() {
    return `
    <section id="question-section" role="main">
        <h1 id="question">${DATASTORE[questionIndex].question}</h2>
        <form>
            <fieldset>
                <div>
                    <input type="radio" class='q1' name="q1" value = "${DATASTORE[questionIndex].choices[0]}" checked>
                    <span id ="span-opt">${DATASTORE[questionIndex].choices[0]}</span><br>
                    <input type="radio" class='q1' name="q1" value = "${DATASTORE[questionIndex].choices[1]}">
                    <span id ="span-opt">${DATASTORE[questionIndex].choices[1]}</span><br>
                    <input type="radio" class='q1' name="q1" value = "${DATASTORE[questionIndex].choices[2]}">
                    <span id ="span-opt">${DATASTORE[questionIndex].choices[2]}</span><br>
                    <input type="radio" class='q1' name="q1" value = "${DATASTORE[questionIndex].choices[3]}">
                    <span id ="span-opt">${DATASTORE[questionIndex].choices[3]}</span>
                    </div>
            </fieldset>
            <button id="js-btn-submit">Submit</button>
        </form>
        
        <div>
            <span id="count-questions">Quesion #: ${DATASTORE[questionIndex].number}</span>
            <span id="count-score">Score: ${correctAnswers}/${DATASTORE.length} </span>
            
        </div>
    </section>`
};

function handleStartButton() {
    $('#btn-start').on('click', function(e){
        nextquizQuestions();
    })
}

function nextquizQuestions() {
    $('#container').html(generateQuestionForm())
}

function handleSubmitButton(){
    $('#container').on('click', '#js-btn-submit', function(e){
        e.preventDefault();

        const getUserAnswer = $('input:checked').val();
        console.log(getUserAnswer);

        let isUserCorrect;
        if (getUserAnswer ==  DATASTORE[questionIndex].correctAnswer) {
            isUserCorrect = true;
        } else {
            isUserCorrect = false;            
        }
        console.log(isUserCorrect);
        
        if(isUserCorrect) {
            showCorrectFeedback();
          } else {
            showIncorrectFeedback();
          }

    
    })
};

function templateCorrectFeedback(pic) {
    return `
    <section class="correct-feedback-page" role="main">
        <h2 id ="feedback-page">That's Correct!</h2>
        <img src="${pic}" class = "resize" alt="Everest."><br>
        <button id="js-next-button">Next</button>
    </section>
    `;
}

function templateIncorrectFeedback(pic, correct) {
    return `
    <section class="incorrect-feedback-page" role="main">
        <h2 id ="feedback-page">Nope. Correct Answer: ${DATASTORE[questionIndex].correctAnswer}</h2>
        <img src="${pic}" class = "resize" alt="Everest."><br>
        <button id="js-next-button">Next</button>
    </section>
    `;
}

function showCorrectFeedback() {
    $('#container').html(templateCorrectFeedback(DATASTORE[questionIndex].image));
    correctAnswers++;    
}

function showIncorrectFeedback() {
    $('#container').html(templateIncorrectFeedback(DATASTORE[questionIndex].image, DATASTORE[questionIndex].correctAnswer));
}


function renderQuestionsHtml(){

}

function generateFinalScorePage(correctAnswers) {
    $('#container').html(`
      <section id="final-page">
        <h2 id = "feedback-page">Your Final Score: ${correctAnswers} out of 10</h2>
        <button id="js-restart-button">Would you like to test again?</button>
      </section>
    `);
  }

function handleNextButton() {
$('#container').on('click', '#js-next-button', function(event) {

    if(questionIndex === 9) {
        generateFinalScorePage(correctAnswers);
    } else {
    questionIndex++;    
    nextquizQuestions();
}
});
}

function handleRestartButton() {
    $('#container').on('click', '#js-restart-button', function(event) {
  
      questionIndex = 1;
  
      correctAnswers = 1;
  
      nextquizQuestions();
    });
  }



function main(params) {
    handleStartButton();
    handleSubmitButton();
    handleNextButton();
    handleRestartButton();
}

$(main)