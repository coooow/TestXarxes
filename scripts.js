var tema1 = [];
var tema1copy = [];
var tema2 = [];
var tema2copy = [];
var tema3 = [];
var tema3copy = [];
var tema4 = [];
var tema4copy = [];
var tema5 = [];
var tema5copy = [];
var tema6 = [];
var tema6copy = [];
var tema7 = [];
var tema7copy = [];
var temaAll = [];
var temaAllcopy = [];
var temaFinal = [];
var temaFinalcopy = [];

let currentQuestion;
var selectedTema;
var firstAnswer = true;
var answered = true;

// Load questions from JSON file

function nextQuestion() {
    if(!answered){
        remindOpen();
        return;
    }
    unselect();
    resetImg();
    firstAnswer = true;

    let qTitle = document.getElementById("questionText");

    if (selectedTema === 1) {
        if (tema1copy.length === 0) {
            showFinished();
            return;
        }
        let n = Math.floor(Math.random() * tema1copy.length);
        currentQuestion = tema1copy.splice(n, 1)[0];
    } else if (selectedTema === 2) {
        if (tema2copy.length === 0) {
            showFinished();
            return;
        }
        let n = Math.floor(Math.random() * tema2copy.length);
        currentQuestion = tema2copy.splice(n, 1)[0];
    } else if (selectedTema === 3) {
        if (tema3copy.length === 0) {
            showFinished();
            return;
        }
        let n = Math.floor(Math.random() * tema3copy.length);
        currentQuestion = tema3copy.splice(n, 1)[0];
    } else if (selectedTema === 4) {
        if (tema4copy.length === 0) {
            showFinished();
            return;
        }
        let n = Math.floor(Math.random() * tema4copy.length);
        currentQuestion = tema4copy.splice(n, 1)[0];
    } else if (selectedTema === 5) {
        if (tema5copy.length === 0) {
            showFinished();
            return;
        }
        let n = Math.floor(Math.random() * tema5copy.length);
        currentQuestion = tema5copy.splice(n, 1)[0];
    } else if (selectedTema === 6) {
        if (tema6copy.length === 0) {
            showFinished();
            return;
        }
        let n = Math.floor(Math.random() * tema6copy.length);
        currentQuestion = tema6copy.splice(n, 1)[0];
    } else if (selectedTema === 7) {
        if (tema7copy.length === 0) {
            showFinished();
            return;
        }
        let n = Math.floor(Math.random() * tema7copy.length);
        currentQuestion = tema7copy.splice(n, 1)[0];
    } else if (selectedTema === 8) {
        if (temaAllcopy.length === 0) {
            showFinished();
            return;
        }

        let n = Math.floor(Math.random() * temaAllcopy.length);
        currentQuestion = temaAllcopy.splice(n, 1)[0];
    } else if (selectedTema === 9) {
        if (temaFinalcopy.length === 0) {
            showFinished();
            return;
        }

        let n = Math.floor(Math.random() * temaFinalcopy.length);
        currentQuestion = temaFinalcopy.splice(n, 1)[0];

        if(currentQuestion.imgfile != ""){
            document.getElementById("questionImage").style.display = "block";
            document.getElementById("questionImg").src = currentQuestion.imgfile;
        }
    }

    qTitle.innerHTML = currentQuestion.question;
    for (let i = 1; i < 5; i++) {
        let answer = currentQuestion.answers[i - 1].answer;
        let a = document.getElementById("label" + i);
        a.innerHTML = answer;
    }

    var count = document.getElementById("counterText");
    var c = count.innerHTML.split("/");
    var correct = parseInt(c[0]);
    var total = parseInt(c[1]);
    total++;
    count.innerHTML = correct + "/" + total;

    answered = false;
}

$(document).ready(function () {
    resetCounter();
    fetch("questions.json")
        .then(response => response.json()) // Parse JSON response
        .then(data => {
            tema1 = data.tema1 || [];
            tema2 = data.tema2 || [];
            tema3 = data.tema3 || [];
            tema4 = data.tema4 || [];
            tema5 = data.tema5 || [];
            tema6 = data.tema6 || [];
            tema7 = data.tema7 || [];
            temaFinal = data.temaFinal || [];
            temaAll = tema1.concat(tema2, tema3, tema4, tema5, tema6, tema7);
        })
        .catch(error => console.error("Error loading JSON:", error));
});

function answer() {
    let selectedAnswer = isChecked();
    document.getElementById("correct").style.display = "none";
    document.getElementById("wrong").style.display = "none";

    for (let i = 0; i < 4; i++) {
        if (i === selectedAnswer) {
            if (currentQuestion.answers[i].correct) {
                document.getElementById("correct").style.display = "block";
                if (firstAnswer) {
                    var count = document.getElementById("counterText");
                    var c = count.innerHTML.split("/");
                    var correct = parseInt(c[0]);
                    var total = parseInt(c[1]);
                    correct++;
                    count.innerHTML = correct + "/" + total;
                }
            } else {
                document.getElementById("wrong").style.display = "block";
            }
        }
    }

    if (firstAnswer) {
        firstAnswer = false;
    }

    answered = true;
    remindClose();
}

function unselect() {
    document.getElementById("correct").style.display = "none";
    document.getElementById("wrong").style.display = "none";
    let answers = document.getElementsByName("answer");
    for (let i = 0; i < 4; i++) {
        answers[i].checked = false;
    }
}

function resetCounter() {
    var count = document.getElementById("counterText");
    count.innerHTML = "0/0";
}

function resetQuestions() {
    tema1copy = tema1.slice();
    tema2copy = tema2.slice();
    tema3copy = tema3.slice();
    tema4copy = tema4.slice();
    tema5copy = tema5.slice();
    tema6copy = tema6.slice();
    tema7copy = tema7.slice();
    temaAllcopy = temaAll.slice();
    temaFinalcopy = temaFinal.slice();
}

function selectTema(tema) {
    selectedTema = tema;
    document.getElementById("testMenu").style.display = "block";
    document.getElementById("menu").style.display = "none";
    resetQuestions();
    nextQuestion();
    answered = false;
}

function tornarMenu() {
    document.getElementById("testMenu").style.display = "none";
    document.getElementById("finished").style.display = "none";
    document.getElementById("popupBg").style.display = "none";
    document.getElementById("menu").style.display = "block";
    resetCounter();
    answered = true;
}

function isChecked() {
    let selectedAnswer = null;

    if (document.getElementById("testMenu").style.display != "block") {
        return;
    }

    for (let i = 1; i < 5; i++) {
        let answer = document.getElementById("answer" + i);
        if (answer.checked) {
            selectedAnswer = i-1;
            break;
        }
    }
    if (selectedAnswer === null) {
        alert("Please select an answer!");
    }
    return selectedAnswer;
}

function showFinished() {
    document.getElementById("finished").style.display = "block";
    document.getElementById("popupBg").style.display = "block";
}

function retry() {
    document.getElementById("finished").style.display = "none";
    document.getElementById("popupBg").style.display = "none";
    resetQuestions();
    resetCounter();
    nextQuestion();
    answered = false;
    firstAnswer = true;
}

function remindOpen(){
    var clase = document.getElementById("remind").className;
    clase = clase.replace("hidden", "visible");
    document.getElementById("remind").className = clase;
}

function remindClose(){
    var clase = document.getElementById("remind").className;
    clase = clase.replace("visible", "hidden");
    document.getElementById("remind").className = clase;
}

function resetImg(){
    document.getElementById("questionImage").style.display = "none";
    document.getElementById("questionImg").src = "";
}