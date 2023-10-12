const library = [];
const titleInput = document.querySelector('#titleInput');
const authorInput = document.querySelector('#authorInput');
const addButton = document.querySelector('#addButton');
const bookList = document.querySelector('#bookList');

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
    populateList(library);
}

function removeBook(id) {
    let target = library.findIndex(book => {
        return book.id == id;
    });
    library.splice(target, 1);
    populateList(library);
}

function createDeletebutton(id) {
    let deleteButton = document.createElement('button');
    deleteButton.innerText = "Remove";
    deleteButton.setAttribute('id', id);
    deleteButton.addEventListener('click', e => {
        removeBook(e.target.id);
    });
    return deleteButton;
}

function createCard(book) {
    let div = document.createElement('div');
    let title = document.createElement('p');
    let author = document.createElement('p');
    let deleteButton = createDeletebutton(book.id);
    title.innerText = book.title;
    author.innerText = book.author;
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(deleteButton);
    bookList.appendChild(div);  
}

let bookOne = new Book("Book One", "Author");
library.push(bookOne);

function populateList(arr) {
    bookList.innerHTML = '';
    if (arr.length != 0) {
        arr.forEach(item => {
            createCard(item);
        });
    }
}

populateList(library);

addButton.addEventListener('click', addBookToLibrary);