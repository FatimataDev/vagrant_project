package com.vagrant.projet_vagrant.resource;


import com.vagrant.projet_vagrant.model.Genre;
import com.vagrant.projet_vagrant.service.GenreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api")
public class GenreRessource {


    private final GenreService genreService;

    public GenreRessource(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping("/genres")
    public ResponseEntity<Collection<Genre>>  getAll(){
        return new ResponseEntity<>(genreService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/genres")
    public ResponseEntity<Genre> create(@RequestBody Genre genre) {
        return new ResponseEntity<>(genreService.create(genre), HttpStatus.CREATED);
    }

    @PutMapping("/genres/{id}")
    public ResponseEntity<Genre> update(@RequestBody Genre genre) {
        return new ResponseEntity<>(genreService.update(genre), HttpStatus.CREATED);
    }

    @DeleteMapping("/genres/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        genreService.delete(id);
        return null;
    }

}
