const hintElement = document.querySelector('.hint'),
shuffleLetterElement = document.querySelector('.shuffle-letter'),
timeCountDown = document.querySelector('.time-count-down'),
inputResult = document.querySelector('.input-result input'),
btnRefresh = document.getElementById('btn-refresh'),
btnSubmit = document.getElementById('btn-submit'),
alertElement = document.querySelector('.alert')

const maxTimeOut = 30
var timer, wordToGuess

function initGame() {
    const randomWord = words[Math.floor(Math.random() * words.length)]
    let { word, hint} = randomWord
    wordToGuess = word
    let arrLetter = shuffleLetter(word)
    showArrLetter(arrLetter)
    hintElement.innerHTML = `<span>Gợi ý:</span>${hint}`
    countDown()
}

function shuffleLetter(word) {
    let arrLetter = word.split('')
    arrLetter = arrLetter.filter(x => x !== ' ')
    
    for (let i = arrLetter.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        console.log(j);
        [arrLetter[i], arrLetter[j]] = [arrLetter[j], arrLetter[i]]
    }

    return arrLetter
}

function showArrLetter(arrLetter) {
    shuffleLetterElement.innerHTML = ''    
    arrLetter.map(letter => {
        let li = document.createElement('li')
        li.innerText = letter
        shuffleLetterElement.appendChild(li)
    })
}

function countDown() {
    let timeOut = maxTimeOut
    timeCountDown.innerText = timeOut + 's'

    timer = setInterval(() => {
        if (timeOut > 0) {
            timeOut--
            timeCountDown.innerText = timeOut + 's'
        }
        else {
            clearInterval(timer)
            showAlert(`Hết thời gian! Đáp án đúng là "${wordToGuess}"`, true, 2000)        
        }
    }, 1000)
}

function showAlert(msg, isGameOver = false, duration = 1500) {
    alertElement.innerText = msg
    setTimeout(() => {
        alertElement.innerText = ''
    }, duration)

    if (isGameOver) {
        setTimeout(() => {
            clearInterval(timer)
            initGame()  
            inputResult.value = ''     
        }, duration)    
    }
}

function checkResult(value) {
    if (wordToGuess.toLowerCase() === value.toLowerCase()) {
        showAlert(`Chúc mừng bạn đã đoán đúng! Đáp án là "${wordToGuess}"`, true, 2000)       
    }
    else {
        showAlert('Bạn đã đoán sai, hãy đoán lại!')
    }
}

btnRefresh.onclick = () => {
    clearInterval(timer)
    inputResult.value = ''
    initGame()
}

btnSubmit.onclick = () => {
    let value = inputResult.value
    checkResult(value)
}

initGame()