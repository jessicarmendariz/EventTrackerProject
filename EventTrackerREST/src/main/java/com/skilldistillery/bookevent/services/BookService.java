package com.skilldistillery.bookevent.services;

import java.util.List;
import java.util.Optional;

import com.skilldistillery.bookevent.entities.Book;

public interface BookService {
		
	Optional<Book> showBook (int id);
	
	public Book findById(int id);
	
	public List<Book> findAll();
	
	Book createBook (Book book);
	
	Book editBook (Book book, int id);
	
	boolean deleteBook (int id);

}
