const container = document.querySelector('#container');

const library = {
    data: [],
    getData: function() {
        if (this.data.length === 0) {
            return 'Library is empty!';
        } else {
            return this.data;
        }
    },
    addBook: function(Book) {
        this.data.push(Book);
    },
    deleteBook: function(id) {
        for (let i = 0; i < this.data.length; i++) {
            if (i === id) {
                this.data.splice(i);
            }
        }
    }
}

function Book(title, author) {
    this.id = library.data.length;
    this.title = title;
    this.author = author;
    this.read = false;
    this.changeStatus = function() {
        if (this.read === false) {
            this.read = true;
        } else {
            this.read = false;
        }
    }
}

const renderer = {
    renderItem: function(item, id) {
        const itemDiv = document.createElement('div');
        itemDiv.setAttribute('id', id);
        itemDiv.classList.add('item');
        for (const attribute in item) {
            if (typeof item[attribute] != 'string') {
                continue;
            }
            const attributeElement = document.createElement('p');
            attributeElement.innerText = item[attribute];
            itemDiv.appendChild(attributeElement);
        }
        itemDiv.appendChild(this.createDeleteButton(id));
        itemDiv.appendChild(this.createStatusButton(id));
        container.appendChild(itemDiv);
    },
    createDeleteButton: function(id) {
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('id', id);
        deleteButton.addEventListener('click', e => {
            e.target.parentElement.remove();
            library.deleteBook(id);
        });
        deleteButton.innerText = 'Delete';
        return deleteButton;
    },
    createStatusButton: function(id) {
        const statusButton = document.createElement('button');
        statusButton.setAttribute('id', id);
        statusButton.innerText = 'Unread';
        statusButton.addEventListener('click', e => {
            library.data[e.target.id].changeStatus();
            if (library.data[e.target.id].read === true) {
                e.target.innerText = 'Read';
            } else {
                e.target.innerText = 'Unread';
            }
        });
        return statusButton;
    },
}

const formHandler = {
    titleInput: document.querySelector('#form-title'),
    authorInput: document.querySelector('#form-author'),
    bookAdder: document.querySelector('#book-form button'),
    deploy: function() {
        this.bookAdder.addEventListener('click', () => {
            addedBook = new Book(this.titleInput.value, this.authorInput.value)
            library.addBook(addedBook);
            renderer.renderItem(addedBook);
        })
    }
}

formHandler.deploy();
const testBook = new Book('Test', 'Me');
library.addBook(testBook);
for (let i = 0; i < library.data.length; i++) {
    renderer.renderItem(library.data[i], i);
}
