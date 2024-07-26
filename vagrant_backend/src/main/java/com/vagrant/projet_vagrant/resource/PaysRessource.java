package com.vagrant.projet_vagrant.resource;


import com.vagrant.projet_vagrant.model.Pays;
import com.vagrant.projet_vagrant.service.PaysService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PaysRessource {


    private final PaysService paysService;

    public PaysRessource(PaysService paysService) {
        this.paysService = paysService;
    }

    @GetMapping("/pays")
    public ResponseEntity<Collection<Pays>>  getAll(){
        return new ResponseEntity<>(paysService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/pays")
    public ResponseEntity<Pays> create(@RequestBody Pays pays) {
        return new ResponseEntity<>(paysService.create(pays), HttpStatus.CREATED);
    }




    @PostMapping("/payss")
    public List<Pays> creates(@RequestBody List<Pays> pays) {
        return(paysService.creates(pays));
    }

    @PutMapping("/pays/{id}")
    public ResponseEntity<Pays> update(@RequestBody Pays pays) {
        return new ResponseEntity<>(paysService.create(pays), HttpStatus.CREATED);
    }

    @DeleteMapping("/pays/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        paysService.delete(id);
        return null;
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> delete(@PathVariable List<Pays> ids) {
        paysService.deleteMultiple(ids);
        return null;
    }


}
