function Book(title,author,pages,readOrNot){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readOrNot = readOrNot;

    this.info = function(){
        console.log(`The ${this.title} by ${this.author}, ${this.pages}, ${this.readOrNot}`);
        return `The ${this.title} by ${this.author}, ${this.pages}, ${this.readOrNot}`;
    }
}

const myLibrary = [];
const content = document.querySelector('.content');
const dialogLogo = document.querySelector('#insertLogo');
const dialogDef = document.querySelector('#insertDef');
const dialog = document.querySelector('dialog');
const dialogCloseBtn = document.querySelector('#closeDialog');
const dialogSubmitBtn = document.querySelector('#submitDialog')
const form = document.querySelector('#myForm');
let isEditing = false; // To track if we are editing
let currentCard = null; // To track the card being edited
let currentBook = null;

function addBookToLibrary()
{
    let title = document.querySelector('#bookName').value;
    let author = document.querySelector('#author').value;
    let page = +(document.querySelector('#pages').value);
    let readOrNot = document.querySelector('#readToggle').checked;

    let book = new Book(title,author,page,readOrNot);
    myLibrary.push(book);
}

function createCard(Book)
{
  let card = document.createElement('div');
  card.className = 'card';

  let title = document.createElement('div');
  title.className = 'title';
  title.innerText = `${Book.title}`

  let innerCard = document.createElement('div');
  innerCard.className = 'inner-card';

  let author = document.createElement('div');
  author.className = 'author-name';
  author.innerText = `${Book.author}`;

  let status = document.createElement('div');
  status.className = 'status';
  
  let labelCompletedOrNot = document.createElement('label');
  labelCompletedOrNot.innerText = 'Completed or Not';

  let labelToggle = document.createElement('label');
  labelToggle.className = 'toggle-label';
  
  let inputRead = document.createElement('input');
  inputRead.setAttribute('type','checkbox');
  
  inputRead.checked = Book.readOrNot;
  inputRead.addEventListener("change", function() {
    Book.readOrNot = inputRead.checked;
  });
  let span = document.createElement('span');
  span.setAttribute('class','toggle-slider');

  let pages = document.createElement('div');
  pages.className = 'pages';
  pages.innerText = Book.pages;

  let buttons = document.createElement('div');
  buttons.className = 'button';
  buttons.style.display = 'flex';
  buttons.style.gap = '10px';

  let deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Remove';
  deleteBtn.addEventListener('click', function(e){
    e.target.parentElement.parentElement.parentElement.remove();
  })

  let EditBtn = document.createElement('button');
  EditBtn.innerText = 'Edit';
  EditBtn.addEventListener('click', function() {
    // Set editing mode
    isEditing = true;
    currentCard = card; // Save the reference to the current card
    currentBook = Book; // Save the reference to the current Book object

  
    // Pre-fill the form with the book's details
    document.getElementById('bookName').value = Book.title;
    document.getElementById('author').value = Book.author;
    document.getElementById('pages').value = Book.pages;
    document.getElementById('readToggle').checked = Book.readOrNot;
    document.getElementById('toggleStatus').innerText = Book.readOrNot ? 'Read' : 'Not Read';
  
    // Open the dialog
    dialog.showModal();
  });

  buttons.append(deleteBtn,EditBtn);

  labelToggle.append(inputRead,span);

  status.append(labelCompletedOrNot,labelToggle);

  innerCard.append(author,status,pages,buttons);

  card.append(title,innerCard);

  content.appendChild(card);

}

dialogCloseBtn.addEventListener('click', function(){
  form.reset();
  dialog.close();
})

dialogSubmitBtn.addEventListener('click', function (e) {
  e.preventDefault();

  // Validate the form
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const titleValue = document.getElementById('bookName').value;
  const authorValue = document.getElementById('author').value;
  const pagesValue = document.getElementById('pages').value;
  const readToggleValue = document.getElementById('readToggle').checked;

  if (isEditing && currentCard && currentBook) {
    // Update the card's DOM elements
    const bookTitle = currentCard.querySelector('.title');
    const bookAuthor = currentCard.querySelector('.author-name');
    const bookPages = currentCard.querySelector('.pages');
    const bookInputRead = currentCard.querySelector('input[type="checkbox"]');

    bookTitle.innerText = titleValue;
    bookAuthor.innerText = authorValue;
    bookPages.innerText = pagesValue;
    bookInputRead.checked = readToggleValue;

    // Update the corresponding Book object
    currentBook.title = titleValue;
    currentBook.author = authorValue;
    currentBook.pages = pagesValue;
    currentBook.readOrNot = readToggleValue;

    console.log(`Updated Book: ${currentBook.title}, ${currentBook.author}, ${currentBook.pages}, ${currentBook.readOrNot ? 'Read' : 'Not Read'}`);

    // Exit edit mode
    isEditing = false;
    currentCard = null;
    currentBook = null;
  } else {
    // Add new book logic
    addBookToLibrary();
    createCard(myLibrary[myLibrary.length - 1]);
  }

  // Close the dialog and reset the form
  dialog.close();
  form.reset();
});

function popDialog(){
    dialog.showModal();
}

dialogLogo.addEventListener('click', popDialog);
dialogDef.addEventListener('click', popDialog);

dialog.addEventListener("click", e => {
    const dialogDimensions = dialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close()
    }
  })


// ======toggle asset===========
// Select the checkbox and status span
const toggle = document.getElementById("readToggle");
const statuss = document.getElementById("toggleStatus");
toggle.addEventListener("change", () => {
  statuss.textContent = toggle.checked ? "Read" : "Not Read"; // Update the status text
});