const library = [];
const titleInput = document.querySelector('#titleInput');
const authorInput = document.querySelector('#authorInput');
const addButton = document.querySelector('#addButton');

function Book(title, author) {
    this.id = library.length;
    this.title = title;
    this.author = author;
}

function addBookToLibrary() {
    let title = titleInput.value;
    let author = authorInput.value;
    let newBook = new Book(title, author);
    library.push(newBook);
    console.log(library);
}

function removeBook(id) {
    library.splice(id, 1);
    console.log(library);
}

addButton.addEventListener('click', addBookToLibrary);