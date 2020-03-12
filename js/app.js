/*
* Memory Game 
* @author: Alaaeddine 
* URL: https://www.github.com/Aladin96
*/

window.addEventListener('load', () => {

  // Variables

  const gameFlips     = document.querySelectorAll('.game-flip');
  const gameCards     = document.querySelectorAll('.game-card');
  const gameFronts    = document.querySelectorAll('.game-front');
  const gameBacks     = document.querySelectorAll('.game-back');
  const timer        = document.querySelectorAll('.timer');
  const bestScore     = document.querySelector('.time-section');
  const levelSection  = document.querySelector('.level-section');
  const levelCheck    = document.querySelector('.level');
  const levelTime     = document.querySelector('.level-time');
  const play          = document.querySelector('.play');
  const reset         = document.querySelector('.reset');
  const close         = document.querySelector('.close');
  const win           = document.querySelector('.win-section');
  const mouseCursor   = document.querySelector('.cursor');
  const clickables    = [
    ...gameFlips,
    ...document.querySelectorAll('button'),
    ...document.querySelectorAll('a')
  ];
  let images = [
    { src:'images/img1.jpeg', alt: 'img1' },
    { src:'images/img2.jpg',  alt: 'img2' },
    { src:'images/img3.jpg',  alt: 'img3' },
    { src:'images/img4.jpg',  alt: 'img4' },
    { src:'images/img5.jpg',  alt: 'img5' },
    { src:'images/img6.jpg',  alt: 'img6' },
    { src:'images/img7.png',  alt: 'img7' },
    { src:'images/img8.jpg',  alt: 'img8' },
    { src:'images/img1.jpeg', alt: 'img1' },
    { src:'images/img2.jpg',  alt: 'img2' },
    { src:'images/img3.jpg',  alt: 'img3' },
    { src:'images/img4.jpg',  alt: 'img4' },
    { src:'images/img5.jpg',  alt: 'img5' },
    { src:'images/img6.jpg',  alt: 'img6' },
    { src:'images/img7.png',  alt: 'img7' },
    { src:'images/img8.jpg',  alt: 'img8' }
  ];

  let clicks = 0;
  let quizSucces = 0;
  let quizManage = [];
  let indexes = [];
  let bestTimePlayer;
  let status = false;
  let setIntervalId;
  let again = false;
 

  // Play the game after click on [ play Button ]
  play.addEventListener('click', () => {

    play.classList.add('hide');

    levelCheck.classList.add('hide');

    reset.classList.remove('hide');

    levelSection.classList.remove('hide');

    randomImages();
    checkLevelGame();

    status = true;
    if (!again) {
      playGame();
      again = true;
    }
    tourGame();
  });

  // Reset the game after Click on [ Reset Button ]
  reset.addEventListener('click', () => {
    reset.classList.add('hide');
    play.classList.remove('hide');
    levelCheck.classList.remove('hide');

    resetImages();
    clearInterval(tourGameId);
    gameOver();
    timerScore();

  });

  // Cursor
  window.addEventListener('mousemove', (e) => {
    mouseCursor.style.top = `${e.pageY}px`;
    mouseCursor.style.left = `${e.pageX}px`;
  });

  clickables.forEach(clickable => {
    clickable.addEventListener('mouseover', () => {
      mouseCursor.classList.add('cursorHover');
    });
    clickable.addEventListener('mouseleave', () => {
      mouseCursor.classList.remove('cursorHover');
    });
  });

  // Close the Win Message
  close.addEventListener('click', () => {
    win.classList.add('hide');
    reset.classList.add('hide');
    play.classList.remove('hide');
    levelCheck.classList.remove('hide');
  });


  if (localStorage.getItem('bestTimePlayer') != null) {
    bestTimePlayer = convertToMilliSeconds(toTime(localStorage.getItem('bestTimePlayer')));
    timer[1].textContent = localStorage.getItem('bestTimePlayer');
  } else {
    bestTimePlayer = null;
    timer[1].textContent = '- -:- -';
  }

  /*
  *
  * Function Check the level selected by the player
  *
  */
function checkLevelGame(){
  document.querySelectorAll('input[type="radio"]').forEach( d => {
    if(d.checked == true){
      levelGame(d.getAttribute('id'))
    }
  });
}
/*
*
* 
*
*/
  function levelGame(level){

    if(level == 'hard'){
      level = 2;
    }else if(level == 'medium'){
      level = 4;
    }else if(level == 'easy'){
      level = 6;
    }else{
      level = 3;
    }
    levelTime.textContent = level;

    let go = setInterval(()=>{
      level--;

      levelTime.textContent = level;
      levelTime.classList.add('animate');

      levelTime.addEventListener('transitionend',()=>{
        levelTime.classList.remove('animate');
      })

      if(level == 0){
        levelTime.textContent = '';
        clearInterval(go);
        levelSection.classList.add('hide')
        levelTime.classList.remove('animate');
      }
    },1000);

    gameCards.forEach(gameCard =>{
      gameCard.style.transform = 'rotateY(180deg)';
    });
    setTimeout(()=>{
      gameCards.forEach(gameCard =>{
        gameCard.style.transform = 'rotateY(0deg)';
      });
      timerScore();
    },level * 1000);

  }
  /*
   *
   *
   *
   */

  function randomImages() {

    let i = 0;
    let indexesImg = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    while (indexesImg.length >= 1) {

      let randomIndex = indexesImg[Math.floor(Math.random() * indexesImg.length)];
      
      if (!gameBacks[randomIndex].children[0]) {
        let img = document.createElement('img');
        gameBacks[randomIndex].append(img);

        gameBacks[randomIndex].children[0].setAttribute('src', images[i].src);
        gameBacks[randomIndex].children[0].setAttribute('alt', images[i].alt);
        delete images[i];
        i++;

        indexesImg = indexesImg.filter(index => index !== randomIndex)

      }
    }
    indexesImg = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  }
/*
*
*
*/
function resetImages(){

   images = [
    { src:'images/img1.jpeg', alt: 'img1' },
    { src:'images/img2.jpg',  alt: 'img2' },
    { src:'images/img3.jpg',  alt: 'img3' },
    { src:'images/img4.jpg',  alt: 'img4' },
    { src:'images/img5.jpg',  alt: 'img5' },
    { src:'images/img6.jpg',  alt: 'img6' },
    { src:'images/img7.png',  alt: 'img7' },
    { src:'images/img8.jpg',  alt: 'img8' },
    { src:'images/img1.jpeg', alt: 'img1' },
    { src:'images/img2.jpg',  alt: 'img2' },
    { src:'images/img3.jpg',  alt: 'img3' },
    { src:'images/img4.jpg',  alt: 'img4' },
    { src:'images/img5.jpg',  alt: 'img5' },
    { src:'images/img6.jpg',  alt: 'img6' },
    { src:'images/img7.png',  alt: 'img7' },
    { src:'images/img8.jpg',  alt: 'img8' }
  ];
  gameBacks.forEach(gameBack =>{
    gameBack.children[0].remove();
  });
}

  /*
   *
   *
   *
   */
  function process(gameFlip, index) {

    if (status == false) return;

    clicks++;

    if (clicks >= 3) {
      indexes.forEach(index => {
        gameCards[index].style.transform = 'rotateY(0deg)';
      });
      emptyData();
      return;
    }


    // Flip the card
    gameCards[index].style.transform = 'rotateY(180deg)';


    let quiz = gameBacks[index].children[0].getAttribute('alt');

    
    quizManage.push(quiz);
    indexes.push(index);

    gameCards[index].addEventListener('transitionend', function() {
      areSimilar();
    })


  }

  function tourGame() {
    tourGameId = setInterval(() => {
      if (quizSucces == 8 || status == false) {

        let lastTime = convertToMilliSeconds(toTime(timer[0].textContent));
        if(localStorage.getItem('bestTimePlayer') != null){

            bestTime(lastTime, timer[0].textContent);
        }else{
          bestTime(lastTime, timer[0].textContent);
        }


        winMessage(timer[0].textContent);

        resetImages()

        gameOver();

        clearInterval(tourGameId);

        clearInterval(setIntervalId);

      }

    }, 0);
  }
  
  /*
   *
   *  
   *
   */
  function playGame() {
    gameFlips.forEach((gameFlip, index) =>
      gameFlip.addEventListener('click', () => {
        if (gameFlip.getAttribute('data') == 'false') {
          process(gameFlip, index);

        }
      })
    );
  }

  /*
   * Game Over
   *
   */
  function gameOver() {
    gameCards.forEach(gameCard => {
      gameCard.parentElement.setAttribute('data', 'false')
      gameCard.style.transform = 'rotateY(0deg)';
    });

    quizSucces = 0;
    status = false;
    timerScore();
    emptyData();
  }
  /*
   *
   *
   */

  function winMessage(lastTime) {

    win.classList.remove('hide');
    win.children[0].children[1].textContent = `Time: ${lastTime}`

  }

  /*
   * 
   *
   */
  function emptyData() {
    clicks = 0;
    indexes = [];
    quizManage = [];
  }

  /*
   * function checking two cards selected if they are the same or not
   *
   */

  function areSimilar() {
    if (clicks == 2) {

      if (quizManage[0] == quizManage[1] && indexes[0] != indexes[1]) {
        gameCards[indexes[0]].parentElement.setAttribute('data', 'true')
        gameCards[indexes[1]].parentElement.setAttribute('data', 'true')
        quizSucces++;
        emptyData()
      } else {
        setTimeout(() => {
          gameCards[indexes[0]].style.transform = 'rotateY(0deg)';
          gameCards[indexes[1]].style.transform = 'rotateY(0deg)';
          emptyData()
        }, 700)

      }

    }
  }

  /*
   * function show time while playing
   *
   */
  function timerScore() {

    if (status == false) {
      timer[0].textContent = "00:00";
      clearInterval(setIntervalId);
      return;
    }
    let seconds = 0;
    let minutes = 0;

    setIntervalId = setInterval(function() {
      seconds++
      if (seconds == 60) {
        seconds = 0;
        minutes += 1;
      }
      if (seconds < 10 && minutes < 10) {
        timer[0].textContent = `0${minutes}:0${seconds}`
      } else if (seconds >= 10 && minutes < 10) {
        timer[0].textContent = `0${minutes}:${seconds}`
      } else if (seconds < 10 && minutes >= 10) {
        timer[0].textContent = `${minutes}:0${seconds}`
      } else {
        timer[0].textContent = `${minutes}:${seconds}`
      }


    }, 1000);
  }

  /*
   * best Time ( Best Score )
   *
   */
  function bestTime(lastTimeMilliseconds, lastTimeText) {
    console.log(lastTimeMilliseconds);
    console.log(bestTimePlayer)
      
    if (bestTimePlayer == null || bestTimePlayer > lastTimeMilliseconds) {

      bestTimePlayer = lastTimeMilliseconds;
      localStorage.setItem('bestTimePlayer', lastTimeText);
      timer[1].textContent = localStorage.getItem("bestTimePlayer");
    }

  }
  /*
   *  
   *  @return Array [minutes, Seconds]
   */
  function toTime(time) {
    let t = time.split(':');
    return t;
  }

  /*
   * Convert time to milliseconds
   * @return Integer
   */
  function convertToMilliSeconds(time) {

    let seconds = parseInt(time[1]) * 1000;
    let minutes = parseInt(time[0]) * 60000;

    return seconds + minutes;

  }

  // Fix Width 

(function(){

  let w = document.querySelector('.game-section').clientWidth;
     
  w = (w / 4)  - 40;

  gameCards.forEach( gameCard => gameCard.style.width = `${w}px`);


}());

});


