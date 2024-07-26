package com.vagrant.projet_vagrant.resource;


import com.vagrant.projet_vagrant.model.Auteur;
import com.vagrant.projet_vagrant.service.AuteurService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AuteurRessource {


    private final AuteurService auteurService;

    public AuteurRessource(AuteurService auteurService) {
        this.auteurService = auteurService;
    }

    @GetMapping("/auteurs")
    public ResponseEntity<Collection<Auteur>>  getAll(){
        return new ResponseEntity<>(auteurService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/auteurs")
    public ResponseEntity<Auteur> create(@RequestBody Auteur auteur) {
        return new ResponseEntity<>(auteurService.create(auteur), HttpStatus.CREATED);
    }

    @PostMapping("/auteurss")
    public List<Auteur> creates(@RequestBody List<Auteur> auteur) {
        return(auteurService.creates(auteur));
    }

    @PutMapping("/auteurs/{id}")
    public ResponseEntity<Auteur> update(@RequestBody Auteur auteur) {
        return new ResponseEntity<>(auteurService.update(auteur), HttpStatus.CREATED);
    }

    @DeleteMapping("/auteurs/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        auteurService.delete(id);
        return null;
    }

}
