const library = [];
const titleInput = document.querySelector('#titleInput');
const authorInput = document.querySelector('#authorInput');
const addButton = document.querySelector('#addButton');
const bookList = document.querySelector('#bookList');

function Book(title, author, status) {
    this.id = library.length;
    this.title = title;
    this.author = author;
    this.readStatus = status;
}

Book.prototype.setStatus = () => {
    if (this.readStatus == 'Read') {
        this.readStatus = 'Unread';
    } else {
        this.readStatus = 'Read';
    }
}

function addBookToLibrary() {
    let title = titleInput.value;
    let author = authorInput.value;
    let newBook = new Book(title, author);
    library.push(newBook);
}

function removeBook(id) {
    let target = library.findIndex(book => {
        return book.id == id;
    });
    library.splice(target, 1);
}

function createDeletebutton(id) {
    let deleteButton = document.createElement('button');
    deleteButton.innerText = "Remove";
    deleteButton.setAttribute('id', id);
    deleteButton.addEventListener('click', e => {
        removeBook(e.target.id);
        populateList(library);
    });
    return deleteButton;
}

function createStatusButton(book) {
    let statusButton = document.createElement('button');
    statusButton.innerText = book.readStatus;
    statusButton.setAttribute('id', book.id);
    statusButton.addEventListener('click', e => {
        library[e.target.id].setStatus();
        if (statusButton.innerText === 'Read') {
            statusButton.innerText = 'Unread';
        } else {
            statusButton.innerText = 'Read';
        }
    })
    return statusButton;
}

function createCard(book) {
    let div = document.createElement('div');
    let title = document.createElement('p');
    let author = document.createElement('p');
    let deleteButton = createDeletebutton(book.id);
    let statusButton = createStatusButton(book);
    title.innerText = book.title;
    author.innerText = book.author;
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(statusButton);
    div.appendChild(deleteButton);
    div.setAttribute('class', 'card');
    bookList.appendChild(div);  
}

let bookOne = new Book("Book One", "Author", "Read");
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

addButton.addEventListener('click', () => {
    addBookToLibrary();
    populateList(library);
});