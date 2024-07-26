package com.vagrant.projet_vagrant.resource;


import com.vagrant.projet_vagrant.model.Client;
import com.vagrant.projet_vagrant.service.ClientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api")
public class ClientRessource {


    private final ClientService clientService;

    public ClientRessource(ClientService clientService) {
        this.clientService = clientService;
    }


    @GetMapping("/clients")
    public ResponseEntity<Collection<Client>>  getAll(){
        return new ResponseEntity<>(clientService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/clients")
    public ResponseEntity<Client> create(@RequestBody Client client) {
        return new ResponseEntity<>(clientService.create(client), HttpStatus.CREATED);
    }

    @PutMapping("/clients/{id}")
    public ResponseEntity<Client> update(@RequestBody Client client) {
        return new ResponseEntity<>(clientService.create(client), HttpStatus.CREATED);
    }

    @DeleteMapping("/clients/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        clientService.delete(id);
        return null;
    }

}

