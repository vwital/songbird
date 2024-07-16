import { birdsData } from "./birds.js";

const audio = document.querySelector(".audio");
let roundCounter = 1;

const roundOne = birdsData[0]; //Разминка
const roundTwo = birdsData[1]; //Воробьиные
const roundThree = birdsData[2]; //Лесные птицы
const roundFour = birdsData[3]; //Певчие птицы
const roundFive = birdsData[4]; // Хищные птицы
const roundSix = birdsData[5]; //Морские птицы
//for modal
const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".modal-reload");
const close = document.querySelector(".close");
const congratulations = document.querySelector(".congratulations-text");

close.onclick = function () {
  modal.style.display = "none";
};

//modal-end
let currentRound = birdsData[roundCounter - 1];

function newRound(arg) {
  // if (roundCounter <= 5) {
  // console.log(
  //   "Правильный ответ:",
  //   birdsData[roundCounter][randomNumberFromSix].name
  // );
  roundScore = 5;
  answered = false;
  roundCounter++;
  mainBirdName.innerHTML = "*";
  addVariants(variants);
  removeMarkers(variants);
  currentRound = birdsData[roundCounter - 1];
  loadAudio();

  resetChar();
  randomNumberFromSix = randomNumber(6);
  nextLevelButton.classList.remove("next-level-button-active");
  nextLevelButton.style.color = "black";
  currentBirdName.innerHTML = "Послушайте плеер.";
  currentBirdNameLatin.innerHTML = "Выберите птицу из списка";
  // }
}

let answered = false;
let roundScore = 5;
let resultScore = 0;
const score = document.querySelector(".score");
const variants = document.querySelectorAll(".choice-list");

const variantOne = variants[0];
const variantTwo = variants[1];
const variantThree = variants[2];
const variantFour = variants[3];
const variantFive = variants[4];
const variantSix = variants[5];

const currentBirdName = document.querySelector(".char-name");
const currentBirdNameLatin = document.querySelector(".char-name-latin");
const currentBirdAudio = document.querySelector(".char-audio");
const currentBirdDescription = document.querySelector(".char-info");
const currentBirdImage = document.querySelector(".char-img");
const mainBirdName = document.querySelector(".main-bird-name");
const mainBirdImage = document.querySelector(".guess-bird__image");
const nextLevelButton = document.querySelector(".next-level-button");
const menu = document.querySelectorAll(".menu-list");

let randomNumberFromSix = randomNumber(6);

function randomNumber(num) {
  num = Math.random() * num;
  return Math.round(num);
}
function loadAudio() {
  if (currentRound[randomNumberFromSix] === undefined) {
    alert("Проблема загрузки с сервера, страница будет перезагружена");
    location.reload();
  } else {
    audio.src = currentRound[randomNumberFromSix].audio;
  }
}
loadAudio();
//Correct or wrong answer
const correctSound = new Audio("./sounds/correct3.mp3");
const wrongSound = new Audio("./sounds/wrong1.mp3");

function correctAnswer(arg) {
  if (answered === false) {
    arg.childNodes[0].classList.add("marker-true");
    correctSound.play();
    resultScore = resultScore + roundScore;
    score.innerHTML = `Ваш бал: ${resultScore}`;
  }
}

function removeMarkers(arg) {
  arg.forEach((el) => {
    el.firstChild.classList.remove("marker-false");
    el.firstChild.classList.remove("marker-true");
  });
}

function resetChar() {
  currentBirdName.innerHTML = "";
  currentBirdNameLatin.innerHTML = "";
  currentBirdAudio.src = "";
  currentBirdDescription.innerHTML = "";
  currentBirdImage.src = "./images/bird.png";
  mainBirdImage.src = "./images/bird.png";
}

function addVariants(arg) {
  arg.forEach((el) => {
    el.lastChild.innerHTML = birdsData[roundCounter - 1][findIndex(el)].name;
  });
}

function wrongAnswer(arg) {
  if (answered === false) {
    arg.childNodes[0].classList.add("marker-false");
    wrongSound.play();
  }
}

function findIndex(arg) {
  let result;
  for (let i = 0; i < variants.length; i++) {
    if (arg === variants[i]) {
      result = i;
    }
  }
  return result;
}
let clicked = false;
variants.forEach((el) => {
  el.addEventListener("click", () => {
    currentBirdName.innerHTML = currentRound[findIndex(el)].name;
    currentBirdNameLatin.innerHTML = currentRound[findIndex(el)].species;
    currentBirdAudio.src = currentRound[findIndex(el)].audio;
    currentBirdDescription.innerHTML = currentRound[findIndex(el)].description;
    currentBirdImage.src = currentRound[findIndex(el)].image;
    let correctAudio = currentRound[findIndex(el)].audio;

    if (audio.src === correctAudio) {
      audio.pause();
      correctAnswer(el);
      answered = true;
      mainBirdName.innerHTML = currentRound[findIndex(el)].name;
      mainBirdImage.src = currentRound[findIndex(el)].image;
      nextLevelButton.style.color = "white";
      nextLevelButton.classList.add("next-level-button-active");
    } else {
      wrongAnswer(el);
      if (el.classList === "clicked") {
        roundScore = roundScore;
      } else {
        if (roundScore > 0) {
          roundScore = roundScore - 1;
        }
      }
      el.classList.add("clicked");
    }
    isEnd();
  });
});
function isEnd() {
  if (roundCounter == 6 && answered == true) {
    modal.style.display = "block";
    congratulations.innerHTML = `Вы прошли викторину и набрали ${resultScore} из 30 возможных баллов`;
  }
}

// New round

nextLevelButton.addEventListener("click", () => {
  if (answered === true && roundCounter <= 6) {
    newRound();
    menu[roundCounter - 1].classList.add("active");
    menu[roundCounter - 2].classList.remove("active");
  }
});

modalBtn.onclick = function () {
  location.reload();
};
// console.log("Правильный ответ:", birdsData[0][randomNumberFromSix].name);

console.log("Самооценка 170/270");
console.log("Аудиоплеер стандартный HTML5 +10  ");
console.log("Верхняя панель страницы викторины +20");
console.log("Блок с вопросом +20");
console.log("Блок с вариантами ответов (названия птиц) +60");
console.log("Блок с описанием птицы: +30");
console.log("Кнопка перехода к следующему вопросу +30");
