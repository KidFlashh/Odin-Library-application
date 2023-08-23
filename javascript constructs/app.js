const favBook = document.getElementById('favbook');
const bookBtn = document.querySelector('.add');
const cancelbtn = document.querySelector('.cancel');
const submit = document.querySelector('#confirmBtn');
let info = document.querySelector(".book-info");
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

//prototype inherits the toggle button for read or not read 
//accessing the toggle
Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

//function calls on toggle button to mark selected attribute
function toggleRead(index) {
    myLibrary[index].toggleRead();
    DisplayBook();
}


//take user input to add book to array
// add library to array
function addBookToLibrary () {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    DisplayBook();
    console.log(myLibrary);
}


function DisplayBook () {
    let library = document.querySelector('.library');

    //refresh or empty element to replace with a new item
    library.innerHTML = '';

     //loop through the array and display each book that is stored in array
    //create a table or card to display these objects
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        const div = document.createElement('div');
        div.classList.add('content');
        div.innerHTML = 
        `<div class="content">
            <h3 class="title">${book.title}</h3>
            <h5 class="author"> By ${book.author}</h5>
            <div class="content-info">
            <p>${book.pages}</p>
            <p class="read-status">${book.read ? "Have Read" : "Have Not Read Yet"} </p>
            <input type="checkbox" class="toggle-read" onclick="toggleRead(${i})">Check if you have read/haven't </input>
            <button class="del" onclick="removeBook(${i})">Remove</button>
            </div>
        </div>`;
        library.appendChild(div);
    }
}

//"Shows the dialog screen once add book is pressed"
bookBtn.addEventListener('click', function () {
    favBook.showModal();
});

//"closes dialog box if no information is submitted"
//"cancels dialog box"
cancelbtn.addEventListener("click", function (e) {
    e.preventDefault();
    favBook.close();
    console.log(this);
});

//"removes book from libraby"
function removeBook(index) {
    myLibrary.splice(index, 1);
    DisplayBook();
}

//submits button to array
submit.addEventListener('click', function (e) {
    e.preventDefault();
    favBook.close();
    addBookToLibrary();
    console.log(this);
})


