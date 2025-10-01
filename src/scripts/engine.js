const state = {
    view:
    {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score')
    },

    values:
    {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },

    actions:
    {
        timerId: setInterval(randomSquare, 1000),
        countdownTimerId: setInterval(countdown, 1000)
    }
};

function countdown()
{
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0)
    {
        alert('Fim de Jogo! Seu placar final foi: ' + state.values.result);
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countdownTimerId);
    }
}

function randomSquare()
{
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    })

    let randomNumber = Math.floor(Math.random() * 9);

    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}

function playSound(audioName)
{
    let audio = new Audio(`./src/audios/${audioName}.m4a`)
    audio.play()
}

function addListenerHitbox()
{
    state.view.squares.forEach((square) => {
        square.addEventListener('click', () =>{
            if (square.id === state.values.hitPosition)
            {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    })
}

function initialize()
{
    addListenerHitbox();
}

initialize();

