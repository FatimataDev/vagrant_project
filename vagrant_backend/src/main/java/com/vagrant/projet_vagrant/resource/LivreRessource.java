package com.vagrant.projet_vagrant.resource;


import com.vagrant.projet_vagrant.model.Livre;
import com.vagrant.projet_vagrant.service.LivreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class LivreRessource {


    private final LivreService livreService;

    public LivreRessource(LivreService livreService) {
        this.livreService = livreService;
    }

    @GetMapping("/livres")
    public ResponseEntity<Collection<Livre>>  getAll(){
        return new ResponseEntity<>(livreService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/livres1")
    public ResponseEntity<Collection<Livre>>  getAllGraph(){
        return new ResponseEntity<>(livreService.getAllGraph(), HttpStatus.OK);
    }

    @PostMapping("/livres")
    public ResponseEntity<Livre> create(@RequestBody Livre livre) {
        return new ResponseEntity<>(livreService.create(livre), HttpStatus.CREATED);
    }
    @PostMapping("/livress")
    public List<Livre> creates(@RequestBody List<Livre> livres) {
        return(livreService.creates(livres));
    }

    @PutMapping("/livres/{id}")
    public ResponseEntity<Livre> update(@RequestBody Livre livre) {
        return new ResponseEntity<>(livreService.update(livre), HttpStatus.CREATED);
    }

    @DeleteMapping("/livres/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        livreService.delete(id);
        return null;
    }

    @GetMapping("/livres/{id}")
    public ResponseEntity<Livre> getLivreById(@PathVariable Long id) {
        Optional<Livre> product = livreService.findOne(id);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @GetMapping("/livres/search")
    public ResponseEntity<Collection<Livre>>  getAllLivreByTitre(@RequestParam String titre){

        System.out.println("tata"+titre);
        return new ResponseEntity<>(livreService.searchByName(titre), HttpStatus.OK);
    }

}
