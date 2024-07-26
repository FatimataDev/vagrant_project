package com.vagrant.projet_vagrant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vagrant.projet_vagrant.model.Genre;


public interface GenreRepository extends JpaRepository<Genre, Long> {

    //@Query(value = "MATCH (a:Genre) RETURN a")

}
