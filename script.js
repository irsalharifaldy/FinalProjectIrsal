const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const nameLabel = document.getElementById('nameLabel');

let shuffledQuestions, currentQuestionIndex
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion() 
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Siapa Nama Presiden Indonesia saat pertama?',
    answers: [
      { text: 'ir. Soekarno', correct: true },
      { text: 'BJ. Habibie', correct: false },
      { text: 'SBY', correct: false },
      { text: 'Gus Dur', correct: false }
    ]
  },
  {
    question: 'Apa Nama Ibu Kota Indonesia?',
    answers: [
      { text: 'Jakarta', correct: true },
      { text: 'Jerusalem', correct: false },
      { text: 'Bekasi', correct: false },
      { text: 'Bogor', correct: false }
    ]
  },
  {
    question: 'Lumba-Lumba adalah jenis hewan?',
    answers: [
      { text: 'Reptile', correct: false },
      { text: 'Mamalia', correct: true },
      { text: 'Terbang', correct: false },
      { text: 'Berkaki empat', correct: false }
    ]
  },
  {
    question: 'Siapa Nama mantan pelatih club mancester united yang saat ini menjadi legenda?',
    answers: [
      { text: 'Zinadine Zidane', correct: false },
      { text: 'Alex Ferguson', correct: true },
      { text: 'Ruud guild', correct: false },
      { text: 'Sergio van dijk', correct: false }
    ]
  }
]