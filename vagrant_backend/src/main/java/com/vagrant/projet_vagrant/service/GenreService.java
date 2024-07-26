package com.vagrant.projet_vagrant.service;

import com.vagrant.projet_vagrant.model.Genre;
import com.vagrant.projet_vagrant.repository.GenreRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class GenreService {

    private final GenreRepository genreRepository;

    public GenreService(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    public Collection<Genre> getAll(){
        return genreRepository.findAll();

}

    public Genre create(Genre genre) {
        return genreRepository.save(genre);
    }

    public Genre update(Genre genre) {
        return genreRepository.save(genre);
    }

    public Boolean delete(Long id) {
        Optional<Genre> genreOptional = genreRepository.findById(id);
        if (genreOptional.isPresent()) {
            genreRepository.deleteById(id);
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

}
