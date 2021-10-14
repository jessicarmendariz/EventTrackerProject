package com.skilldistillery.bookevent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.bookevent.entities.Book;

public interface BookRepository extends JpaRepository<Book, Integer> {

}
