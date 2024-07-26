package com.vagrant.projet_vagrant.service;


import com.vagrant.projet_vagrant.model.Client;
import com.vagrant.projet_vagrant.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;


@Service
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Collection<Client> getAll(){
        return clientRepository.findAll();

    }

    public Client create(Client client) {
        return clientRepository.save(client);
    }

    public Client update(Client client) {
        return clientRepository.save(client);
    }

    public Boolean delete(Long id) {
        Optional<Client> villeOptional = clientRepository.findById(id);
        if (villeOptional.isPresent()) {
            clientRepository.deleteById(id);
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }
}
