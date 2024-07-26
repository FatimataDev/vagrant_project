package com.vagrant.projet_vagrant.resource;



import com.vagrant.projet_vagrant.model.Emprunt;
import com.vagrant.projet_vagrant.service.EmpruntService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/api")
public class EmpruntRessource {


    private final EmpruntService empruntService;

    public EmpruntRessource(EmpruntService empruntService) {
        this.empruntService = empruntService;
    }


    @GetMapping("/emprunts")
    public ResponseEntity<Collection<Emprunt>>  getAll(){
        return new ResponseEntity<>(empruntService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/emprunts")
    public ResponseEntity<Emprunt> create(@RequestBody Emprunt emprunt) {
        return new ResponseEntity<>(empruntService.create(emprunt), HttpStatus.CREATED);
    }

   /*  @PutMapping("/emprunts/{id}")
    public ResponseEntity<Emprunt> update(@RequestBody Emprunt emprunt) {
        return new ResponseEntity<>(empruntService.create(emprunt), HttpStatus.CREATED);
    } */

    @DeleteMapping("/emprunts/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        empruntService.delete(id);
        return null;
    }

}

