let hasUserClicked = false;

const clickMeBtnElem = document.querySelector('#click-me-btn');

const CLICK_ME_BTN_INITIAL_TEXT = `click if you're ready.`;
const CLICK_ME_BTN_CLICKED_TEXT = `good. we must wait.`;

clickMeBtnElem.addEventListener('click', () => {
  clickMeBtnElem.textContent = CLICK_ME_BTN_CLICKED_TEXT;
});

const fridayVideoElem = document.querySelector('#friday-video');

const FRIDAY_CHECK_INTERVAL_MS = 1000;
const FRIDAY_VIDEO_SRC = '../../assets/today-is-friday-in-california.mp4';
const FRIDAY_TITLE = 'Today Is Friday In California';
const NOT_FRIDAY_TITLE = '...';

let isFridayModeOn = false;
let isFridayVideoPlaying = false;

const startFridayVideo = () => {
  fridayVideoElem.style.display = 'initial';
  fridayVideoElem.src = FRIDAY_VIDEO_SRC;
  fridayVideoElem.muted = false;
  if (hasUserClicked) {
    fridayVideoElem.play();
    isFridayVideoPlaying = true;
  }
};

const startFridayMode = () => {
  isFridayModeOn = true;

  document.title = FRIDAY_TITLE;
  clickMeBtnElem.style.display = 'none';
  clickMeBtnElem.textContent = CLICK_ME_BTN_INITIAL_TEXT;
  startFridayVideo();
};

const stopFridayVideo = () => {
  fridayVideoElem.style.display = 'none';
  fridayVideoElem.src = '';
  isFridayVideoPlaying = false;
};

const stopFridayMode = () => {
  isFridayModeOn = false;

  clickMeBtnElem.style.display = 'initial';
  document.title = NOT_FRIDAY_TITLE;
  stopFridayVideo();
};

const toggleFridayMode = (isFriday) => {
  if (isFriday && !isFridayModeOn) {
    startFridayMode();
  } else if (!isFriday && isFridayModeOn) {
    stopFridayMode();
  }
};

window.debugToggleFridayMode = () => toggleFridayMode(true);

window.addEventListener('click', () => {
  if (hasUserClicked) return;

  hasUserClicked = true;

  const isFriday = isFridayInCalifornia();
  if (isFriday) {
    startFridayMode();
  }
});

const getCurrentNarrowWeekdayCalifornia = () =>
  new Intl.DateTimeFormat('en', {
    timeZone: 'America/Los_Angeles',
    weekday: 'narrow',
  }).format(new Date());

const isFridayInCalifornia = () => getCurrentNarrowWeekdayCalifornia() === 'F';

const checkIsFridayInCalifornia = () => {
  const isFriday = isFridayInCalifornia();
  toggleFridayMode(isFriday);
};

const main = () => {
  checkIsFridayInCalifornia();
  setInterval(checkIsFridayInCalifornia, FRIDAY_CHECK_INTERVAL_MS);
};

main();
