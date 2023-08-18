const discordBox = document.querySelector('#discordBox');
const desc = document.querySelector('.info__body');
const descText = desc.textContent;
const socialBoxes = document.querySelectorAll('.info__link-item');

loadEventListeners();

function loadEventListeners() {
  discordBox.addEventListener('mouseenter', showDiscordTag)
  discordBox.addEventListener('mouseleave', hideDiscordTag)
}

function showDiscordTag() {
  setTimeout(() => {
    desc.textContent = 'draz. on Discord';
  }, 175);
}

function hideDiscordTag() {
  desc.textContent = descText;
}

window.onload = function () {
  for (let i = 0; i < socialBoxes.length; i++) {
    setTimeout(function () {
      socialBoxes[i].style.opacity = '1';
    }, i * 200);
  }
};
