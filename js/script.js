// --------------------
// Portada -> Libro
// --------------------

const startButton = document.getElementById("start");
const intro = document.getElementById("intro");
const bookSection = document.getElementById("bookSection");
const albumAudio = document.getElementById('albumAudio');
const musicToggle = document.getElementById('musicToggle');
const musicPlayIcon = musicToggle ? musicToggle.querySelector('.music-play') : null;

function updateMusicButton(isPlaying) {
    if (!musicToggle || !musicPlayIcon) return;
    if (isPlaying) {
        musicToggle.classList.add('playing');
        musicToggle.setAttribute('aria-label', 'Pausar música');
        musicToggle.setAttribute('aria-pressed', 'true');
        musicPlayIcon.textContent = '❚❚';
    } else {
        musicToggle.classList.remove('playing');
        musicToggle.setAttribute('aria-label', 'Reproducir música');
        musicToggle.setAttribute('aria-pressed', 'false');
        musicPlayIcon.textContent = '▶';
    }
}

startButton.addEventListener("click", () => {

    intro.classList.remove("active");
    bookSection.classList.add("active");

    if (albumAudio && musicToggle) {
        albumAudio.play().then(() => {
            updateMusicButton(true);
        }).catch((error) => {
            console.warn('Audio autoplay blocked or failed:', error);
            updateMusicButton(false);
        });
    }

});

// --------------------
// Páginas del libro
// --------------------

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

const openBook = document.getElementById("openBook");
const backToPage1 = document.getElementById("backToPage1");

openBook.addEventListener("click", () => {

    page1.classList.remove("activePage");
    page2.classList.add("activePage");

});

backToPage1.addEventListener("click", () => {

    page2.classList.remove("activePage");
    page1.classList.add("activePage");

});
// Página 2 -> Página 3

const goToPage2 = document.getElementById("goToPage2");
const backToPage2 = document.getElementById("backToPage2");

const page3 = document.getElementById("page3");

goToPage2.addEventListener("click", () => {

    page2.classList.remove("activePage");
    page3.classList.add("activePage");

});

backToPage2.addEventListener("click", () => {

    page3.classList.remove("activePage");
    page2.classList.add("activePage");

});
// --------------------
// Página 3 -> Página 4
// --------------------

const page4 = document.getElementById("page4");

const goToPage4 = document.getElementById("goToPage4");
const backToPage3 = document.getElementById("backToPage3");

goToPage4.addEventListener("click", () => {
    
    console.log("clic");

    page3.classList.remove("activePage");
    page4.classList.add("activePage");

});

backToPage3.addEventListener("click", () => {

    page4.classList.remove("activePage");
    page3.classList.add("activePage");

});

// --------------------
// Página 4 -> Página 5
// --------------------

const goToPage5 = document.getElementById("goToPage5");
const backToPage4 = document.getElementById("backToPage4");
const page5 = document.getElementById("page5");

const goToPage6 = document.getElementById("goToPage6");
const backToPage5 = document.getElementById("backToPage5");
const page6 = document.getElementById("page6");

goToPage5.addEventListener("click", () => {

    page4.classList.remove("activePage");
    page5.classList.add("activePage");

});

backToPage4.addEventListener("click", () => {

    page5.classList.remove("activePage");
    page4.classList.add("activePage");

});

goToPage6.addEventListener("click", () => {

    page5.classList.remove("activePage");
    page6.classList.add("activePage");

});

backToPage5.addEventListener("click", () => {

    page6.classList.remove("activePage");
    page5.classList.add("activePage");

});

// --------------------
// Music player (play / pause)
// --------------------

if (musicToggle && albumAudio) {

    // comportamiento por defecto: loop y volumen moderado
    albumAudio.loop = true;
    albumAudio.volume = 0.95;

    musicToggle.addEventListener('click', () => {

        if (albumAudio.paused) {
            albumAudio.play().then(() => {
                updateMusicButton(true);
            }).catch((error) => {
                console.warn('Audio play failed:', error);
                updateMusicButton(false);
            });
        } else {
            albumAudio.pause();
            updateMusicButton(false);
        }

    });

    albumAudio.addEventListener('play', () => updateMusicButton(true));
    albumAudio.addEventListener('pause', () => updateMusicButton(false));
    albumAudio.addEventListener('ended', () => updateMusicButton(false));

}