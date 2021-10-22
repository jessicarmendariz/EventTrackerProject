window.addEventListener('load', function(e) {
  console.log('document loaded');
  init();
});

  function init() {
    document.bookForm.lookup.addEventListener('click', function(event) {
      event.preventDefault();
      var bookId = document.bookForm.bookId.value;
      if (!isNaN(bookId) && bookId > 0) {
        console.log("The Book ID is: " + bookId);
        getBook(bookId);
      }
    });
    document.newBookForm.addBook.addEventListener('click', createBook);
    document.bookForm.delete.addEventListener('click', deleteBook);

  }

  function getBook(bookId) {
    console.log('getBook, bookId=' + bookId);
    let xhr = new XMLHttpRequest(); /// 0
    xhr.open('GET', 'api/books/' + bookId); /// 1
    xhr.onreadystatechange = function() {
      // console.log(xhr)
      if (xhr.readyState === 4) {
        if (xhr.status < 400) {
          let book = JSON.parse(xhr.responseText);
          console.log(book.title);
          displayBook(book);

        } else {
          console.error(`Book ID ${bookId} not found`);
          displayError(`Book ID ${bookId} not found`)
        }
      }
    };
    xhr.send();
}

function changeForm(){
  let formName = document.getElementById('formName');
  formName.innerHTML = 'Add or Edit Book'
};

function displayError(msg) {
  var dataDiv = document.getElementById('bookData');
  dataDiv.textContent = '';
  let element = document.createElement('h3');
  element.textContent = msg;
  dataDiv.appendChild(element);
}

function displayBook(book) {
  var dataDiv = document.getElementById('bookData');
  dataDiv.textContent = '';
  let element = document.createElement('h1');
  element.textContent = book.id + ": " + book.title;
  dataDiv.appendChild(element);
  element = document.createElement('blockquote');
  element.textContent = book.description;
  dataDiv.appendChild(element);
  let ul = document.createElement('ul');
  dataDiv.appendChild(ul);
  let li = document.createElement('li');
  li.textContent = book.author;
  ul.appendChild(li);
  li = document.createElement('li');
  li.textContent = book.series;
  ul.appendChild(li);
  changeForm();
}

function createBook(evt) {
  evt.preventDefault();
  console.log('Creating Book');
  let form = document.newBookForm;
  let book = {
    rating: form.rating.value
  };
  book.title = form.title.value;
  book.description = form.description.value;
  book.series = form.series.value;
  postBook(book);
}
function postBook(book) {
  console.log('Posting Book');
  console.log(book);
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'api/books');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 201 || xhr.status === 200) {
        let newBook = JSON.parse(xhr.responseText);
        displayBook(newBook);
      } else {
        displayError('Error Creating Book ' + xhr.status);
      }
    }
  };
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(book));
}
function editBook(evt) {
  evt.preventDefault();
  console.log('Updating Book');
  let id = document.bookEditForm.bookId
  let form = document.bookEditForm;
  let book = {
    series: form.series.value
  };
  book.title = form.title.value;
  book.description = form.description.value;
  book.series = form.series.value;
  putBook(book);
}
function putBook(book) {
console.log('Replacing Book');
console.log(book);
let xhr = new XMLHttpRequest();
xhr.open('PUT', 'api/books/' + bookId);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 201 || xhr.status === 200) {
      let editedBook = JSON.parse(xhr.responseText);
      displayBook(editedBook);
    } else {
      displayError('Error Replacing Book: ' + xhr.status);
    }
  }
};
xhr.setRequestHeader("Content-type", "application/json");
xhr.send(JSON.stringify(book));
}
function deleteBook(book){
  console.log('Deleting Book');
  console.log(book);
  let xhr = new XMLHttpRequest();
  xhr.open('DELETE', 'api/books/' + bookId);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 204 || xhr.status === 200) {
        let editedBook = JSON.parse(xhr.responseText);
        console.log("Deleted Book");
      } else {
        displayError('Error Deleting Book: ' + xhr.status);
      }
    }
  };
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(book));
} 