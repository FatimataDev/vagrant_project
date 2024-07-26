package com.vagrant.projet_vagrant.service;


import com.vagrant.projet_vagrant.model.Emprunt;
import com.vagrant.projet_vagrant.repository.EmpruntRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;


@Service
public class EmpruntService {

    private final EmpruntRepository empruntRepository;

    public EmpruntService(EmpruntRepository empruntRepository) {
        this.empruntRepository = empruntRepository;
    }

    public Collection<Emprunt> getAll(){
        return empruntRepository.findAll();

    }

     public Emprunt create(Emprunt emprunt) {

        /* for(Livre im: emprunt.getLivres()){

           // Emprunt emprunt1 = new Emprunt();

            emprunt.setId(emprunt.getId());
            emprunt.setClient(emprunt.getClient());
            emprunt.setDate(emprunt.getDate());
            emprunt.setIdLivre(im.getId());
            emprunt.setTitre(im.getTitre());
            emprunt.setEan(im.getEan());
        } */

        return empruntRepository.save(emprunt);
    } 

    public Emprunt update(Emprunt emprunt) {
        return empruntRepository.save(emprunt);
    }

    public Boolean delete(Long id) {
        Optional<Emprunt> villeOptional = empruntRepository.findById(id);
        if (villeOptional.isPresent()) {
            empruntRepository.deleteById(id);
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }
}
