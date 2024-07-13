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
}

const renderer = {
    renderItem: function(item, id) {
        const itemDiv = document.createElement('div');
        itemDiv.setAttribute('id', id);
        for (const attribute in item) {
            if (typeof item[attribute] === 'number') {
                continue;
            }
            const attributeElement = document.createElement('p');
            attributeElement.innerText = item[attribute];
            itemDiv.appendChild(attributeElement);
        }
        itemDiv.appendChild(this.createDeleteButton(id));
        container.appendChild(itemDiv);
    },
    createDeleteButton: function(id) {
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('id', id);
        deleteButton.addEventListener('click', e => {
            console.log(e.target.parentElement);
        });
        deleteButton.innerText = 'Delete';
        return deleteButton;
    }
}

const testBook = new Book('Test', 'Me');
library.addBook(testBook);
for (let i = 0; i < library.data.length; i++) {
    renderer.renderItem(library.data[i], i);
}
console.log(library.getData());
library.deleteBook(0);
console.log(`Result: ${library.getData()}`);