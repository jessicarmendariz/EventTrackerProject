package com.skilldistillery.bookevent.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.bookevent.entities.Book;
import com.skilldistillery.bookevent.services.BookService;

@RestController
@RequestMapping("api")
public class BookController {
	
	@Autowired
	BookService bookService;
	
	@GetMapping("books/{id}")
	public Book show(@PathVariable int id) {
		return bookService.findById(id);
		
	}
	
	@PostMapping("books")
	public Book addBook(@RequestBody Book book, HttpServletRequest req, HttpServletResponse resp) {
		book = bookService.createBook(book);
		return book;
	}
	
	@PutMapping("books/{id}")
	public Book updateBook(@PathVariable int id, @RequestBody Book book, HttpServletRequest req, HttpServletResponse resp) {
		book = bookService.editBook(book, id);
		if (book != null) {
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(book.getId());
			resp.setHeader("Location", url.toString());
		} else {
			resp.setStatus(404);
			book = null;
		}
		return book;
	}

	@DeleteMapping("books/{id}")
	private boolean deleteBook(@PathVariable Integer id, HttpServletResponse res) {
		Book book = bookService.findById(id);
		if (book != null) {
			bookService.deleteBook(id);
			return true;
		} else {
			res.setStatus(404);
			return false;
		}
	
}
}