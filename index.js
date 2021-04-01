// txtElement - span in html
// words - data-words='["Developer", "Designer", "Creator"]'
// wait - data-wait="3000" - остановка

// const TypeWriter = function (txtElement, words, wait= 3000) {
//     this.txtElement = txtElement;
//     this.words = words;
//
//     // txt - представляет собой то что напечатано в месте, где будут слова "Developer", "Designer", "Creator"
//     this.txt = '';
//     //  индекс слова которое впечатывается
//     this.wordIndex = 0;
//     this.wait = parseInt(wait, 10);
//
//     // метод который делает все
//     this.type();
//
//     // отлавливаем момент, когда надпись удалена
//     this.isDeleting = false;
// }

// ES6 Classes
class TypeWriter {
    constructor(txtElement, words, wait= 3000) {
        this.txtElement = txtElement;
        this.words = words;

        // txt - представляет собой то что напечатано в месте, где будут слова "Developer", "Designer", "Creator"
        this.txt = '';
        //  индекс слова которое впечатывается
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);

        // метод который делает все
        this.type();

        // отлавливаем момент, когда надпись удалена
        this.isDeleting = false;
    }

    type() {
        // получаем текущий индекс слова
        const current = this.wordIndex % this.words.length;

        // нужно получить полный текст текущего слова
        const fullTxt = this.words[current];

        // проверяем на удаление
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1)
        }else  {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1)
        }

        // Insert txt into Element
        this.txtElement.innerHTML = `<span class="txt"> ${this.txt} </span>`;

        // Type Speed
        let typeSpeed = 300;
        if (this.isDeleting) {
            typeSpeed /= 2
        }

        // If Word is complete
        if(!this.isDeleting && this.txt === fullTxt) {
            // make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false
            // Move to the next word
            this.wordIndex++
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    // должны сразу распарсить атрибут, чтобы использовать его в js
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // Init TypeWriter
    new TypeWriter(txtElement, words, wait)
}
