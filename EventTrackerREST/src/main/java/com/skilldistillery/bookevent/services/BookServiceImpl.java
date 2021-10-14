package com.skilldistillery.bookevent.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.bookevent.entities.Book;
import com.skilldistillery.bookevent.repositories.BookRepository;

@Service
@Transactional
public class BookServiceImpl implements BookService {

	@Autowired
	private BookRepository bookRepo;
	
	@Override
	public Book findById(int id) {
		Optional<Book> bookOpt=bookRepo.findById(id);
		if (bookOpt.isPresent()) {
			return bookOpt.get();
		}
		return null; 
	}

	
	@Override
	public List<Book> findAll() {
		return bookRepo.findAll();
	}


	@Override
	public Optional<Book> showBook(int id) {
		return bookRepo.findById(id);
	}


	@Override
	public Book createBook(Book book) {
		return bookRepo.save(book);
	}


	@Override
	public Book editBook(Book book, int id) {
		Book editedBook = bookRepo.findById(id).get();
		
		if (editedBook.getTitle() != null) {
			editedBook.setDescription(book.getDescription());
			editedBook.setAuthor(book.getAuthor());
			editedBook.setSeries(book.getSeries());
			editedBook.setImageUrl(book.getImageUrl());
		}
		return editedBook;
	}


	@Override
	public boolean deleteBook(int id) {
		boolean read = false;
		Optional<Book> bookOpt = bookRepo.findById(id);
		if (bookOpt.isPresent()) {
			if (bookOpt.get().getId() == id) {
				bookRepo.deleteById(id);
				read = true;
			}
		}
		return read;
	}

}
