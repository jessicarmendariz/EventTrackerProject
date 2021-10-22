import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];

  constructor (
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.index().subscribe(
    books => {
      this.books = books;
    },
    fail => {
      console.error('BookListComponent.loadBooks(): ERROR LOADING BOOKS');
      console.error(fail);
    }
    );
  }

}
