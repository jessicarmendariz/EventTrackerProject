window.addEventListener('load', function(e) {
	console.log('script.js is loaded');
	init();
});

function init() {
	document.bookForm.lookup.addEventListener('click', function(event) {
		event.preventDefault();
		var bookId = document.bookForm.bookId.value;
		if (!isNaN(bookId) && bookId > 0) {
			getbook(bookId);
		}
	});
	document.bookForm.delete.addEventListener('click', function(event) {
		event.preventDefault();
		var bookId = document.bookForm.bookId.value;
		if (!isNaN(bookId) && bookId > 0) {
			deleteBook(bookId);
		}
	});

	document.addBookForm.addBook.addEventListener('click', function(event) {
		event.preventDefault();
		let fm = document.addBookForm;
		let newBook = {
			title: fm.title.value,
			author: fm.author.value,
			description: fm.description.value,
			series: fm.series.value,
			imageUrl: fm.imageURL.value,
			studied: fm.studied.value,
		};
		console.log(newBook);
		postNeBook(newBook);
	});

	document.updateForm.updateBook.addEventListener("click", function(e) {
		e.preventDefault();
		let updatedBookId = document.bookForm.bookId.value;
		updateBook(updatedBookId);
	});
}

function updateBook(bookId) {
	let fm = document.updateForm;
	let updatedBook = {
			title: fm.title.value,
			author: fm.author.value,
			description: fm.description.value,
			series: fm.series.value,
			imageUrl: fm.imageURL.value,
			studied: fm.studied.value,
	};
	let xhr = new XMLHttpRequest();
	xhr.open("PUT", `api/books/${bookId}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) {
				updatedBook = JSON.parse(xhr.responseText);
				displayBook(updatedBook);
			} else {
				console.error(xhr.status + ": " + xhr.responseText);
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(JSON.stringify(updatedBook));
	updateForm.reset();
}

function getBook(bookId) {
	console.log('getBook(): BookId is ' + bookId);
	let xhr = new XMLHttpRequest();
	console.log('xhr.readyState = ' + xhr.readyState);
	xhr.open('GET', 'api/books/' + bookId);
	console.log('xhr.readyState = ' + xhr.readyState);
	xhr.onreadystatechange = function() {
		console.log('xhr.readyState = ' + xhr.readyState);

		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let book = JSON.parse(xhr.responseText);
				console.log(book);
				displayContestant(book);
			}
			else {
				var dataDiv = document.getElementById('bookId');
				dataDiv.textContent = '';
				let h1 = document.createElement('h1');
				h1.textContent = 'Book Not Found';
				console.log('Book Not Found');
			}
		}
	}
	console.log('Before send: xhr.readyState = ' + xhr.readyState);
	xhr.send();
	console.log('After send: xhr.readyState = ' + xhr.readyState);
}



function displayBook(book) {
	var dataDiv = document.getElementById('bookId');
	dataDiv.textContent = '';
	let h1 = document.createElement('h1');
	h1.textContent = 'Title: ' + book.name;
	dataDiv.appendChild(h1);
	let ul = document.createElement('ul');
	dataDiv.appendChild(ul);
	li = document.createElement('li');
	li.textContent = 'Details: '
	dataDiv.appendChild(bq);
	let li = document.createElement('li');
	li.textContent = 'Id: ' + book.id;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = 'Author: ' + book.author;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = 'Series: ' + book.series;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = 'Description: ' + book.description;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = 'Book Cover: ' + book.imageUrl;
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = 'Studied: ' + book.studied;
	ul.appendChild(li);
}

function deleteBook(bookId) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/books/' + bookId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 204) {
				var dataDiv = document.getElementById('bookData');
				dataDiv.textContent = '';
				let h1 = document.createElement('h1');
				h1.textContent = 'Book Removed...';
				dataDiv.appendChild(h1);
				console.log('Deleted Book!');
			}
			else {
				console.log('Failed to Delete Book, Try Again');
			}
		}
	}
	console.log('Before send: xhr.readyState = ' + xhr.readyState);
	xhr.send();
	console.log('After send: xhr.readyState = ' + xhr.readyState);
	document.bookForm.reset();
}