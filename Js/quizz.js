const question = document.querySelector('#question');
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const choices = document.querySelectorAll('.choice-text');
const progressBarFull = document.querySelector('#progressBarFull');
const InputName = document.getElementById('InputName')
const SubmitScore = document.getElementById('SubmitScore')
const highscore = document.getElementById('highscore')


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'what is 2 + 2',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'what is 10 + 2',
        choice1: '12',
        choice2: '4',
        choice3: '1',
        choice4: '07',
        answer: 1,
    },
    {
        question: 'what is 13 - 2',
        choice1: '2',
        choice2: '41',
        choice3: '2',
        choice4: '11',
        answer: 4,
    },
    {
        question: 'what is 10 * 2',
        choice1: '22',
        choice2: '40',
        choice3: '20',
        choice4: '17',
        answer: 3,
    },
    {
        question: 'what is 23 + 110',
        choice1: '221',
        choice2: '400',
        choice3: '201',
        choice4: '133',
        answer: 4,
    },
    {
        question: 'what is 24 + 10',
        choice1: '34',
        choice2: '42',
        choice3: '21',
        choice4: '17',
        answer: 1,
    },
    {
        question: 'what is 1 + 2',
        choice1: '2',
        choice2: '4',
        choice3: '1',
        choice4: '3',
        answer: 4,
    },
    {
        question: 'what is 7+ 14',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 3,
    },
    {
        question: 'what is 20 + 201',
        choice1: '2',
        choice2: '221',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'what is 90 + 2',
        choice1: '2',
        choice2: '92',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'what is 2 + 2',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'what is 2 + 15',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 4,
    },

]



const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () =>{
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]

    document.querySelector("#play").addEventListener("click", function () {
        document.getElementById("home1").style.display = "none";
        document.getElementById("home").style.display = "flex";
        console.log("ddd")
    });
    
    getNewQuestion()

}

const getNewQuestion =  () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        setTimeout(()=>{
            document.getElementById("home").style.display = "none";
        document.getElementById("username").style.display = "flex";
        },2000)

        // return window.location.assign('/endpage.html')
    }

    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}` /* 1/4*/
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    questionCounter++
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length) // random int in the range of 0 to length availableQuestions
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion["choice"+ number] 
    })

    availableQuestions.splice(questionsIndex, 1) // remove the old question and answer

    acceptingAnswers = true
}
Array.from(choices).forEach(choice => {
    choice.addEventListener('click', async (e) =>{
        e.preventDefault() // block refresh page
        if(!acceptingAnswers){
            return
        }

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'
        if(classToApply === 'correct'){
            selectedChoice.parentElement.classList.add("correct")
            incrementScore(SCORE_POINTS)
        }else{
            selectedChoice.parentElement.classList.add("incorrect")
        }
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)


    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}


startGame()

startScore = () =>{
    document.querySelector("#highscore-btn").addEventListener("click", function () {
        document.getElementById("home1").style.display = "none";
        document.getElementById("highscore").style.display = "flex";
    });
}


const setNameWithScore = (name,scr)=>{
    let players = localStorage.getItem("players") ? JSON.parse(localStorage.getItem("players")) : []

    let player = {
        name,
        scr
    }

    players.push(player)
    localStorage.setItem("players",JSON.stringify(players))
}


SubmitScore.addEventListener("click",()=>{
    setNameWithScore(InputName.value,score)
    displayScore()
    score = 0
    
})


const displayScore = ()=>{

    let players =  localStorage.getItem("players") ? JSON.parse(localStorage.getItem("players")) : null

    if(players){
        highscore.innerHTML =""
        let result = players.sort((player1,player2) => player1.scr - player2.scr).reverse()
        console.log(result);
        result.forEach((elm,idx)=>{
            let percnetage = 80 - idx*(80/result.length)
            highscore.innerHTML += `
            <span style="display:flex ; justify-content : space-between; align-items : center">
            <h1 style="font-size :  ${percnetage}px">${elm.name } </h1> <h3>${elm.scr }</h3>
            </span>
            <a class="coolBeans" href="/"><i class="bi bi-box-arrow-in-left"></i></a>
            `
        })    
        }
}

displayScore()


// for (let i = 0; i < localStorage.length * 2; i++){
//     let singleName = localStorage.getItem(condidatName.key(i))
//     let singleScore = localStorage.getItem(condidatScore.key(i))
//     allCondidatsNames.push(singleName);
//     allCondidatsScore.push(singleScore);
// }


// console.log(allCondidatsNames);
// console.log(allCondidatsScore);