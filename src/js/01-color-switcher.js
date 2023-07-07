const getRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;

const bodyEl = document.querySelector('body')
const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
let id;

toggleBtn(btnStopEl);

bodyEl.addEventListener('click', onClick);

function onClick(evt) {
    if (evt.target === btnStartEl) {
        toggleBtn(btnStartEl, btnStopEl);
        id = setInterval(() => bodyEl.style.backgroundColor = getRandomHexColor(), 1000);
    };
    if (evt.target === btnStopEl) {
        toggleBtn(btnStartEl, btnStopEl);
        clearInterval(id);
    };
}

function toggleBtn(...btns) { btns.forEach(i => i.toggleAttribute('disabled')) };


