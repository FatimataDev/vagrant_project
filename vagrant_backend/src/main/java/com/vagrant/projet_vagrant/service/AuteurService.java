package com.vagrant.projet_vagrant.service;

import com.vagrant.projet_vagrant.model.Auteur;
import com.vagrant.projet_vagrant.repository.AuteurRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class AuteurService {

    private final AuteurRepository auteurRepository;

    public AuteurService(AuteurRepository auteurRepository) {
        this.auteurRepository = auteurRepository;
    }

    public Collection<Auteur> getAll(){
        return auteurRepository.findAll();

}

    public List<Auteur> creates(List<Auteur> auteurs) {


        return auteurRepository.saveAll(auteurs);
    }

    public Auteur create(Auteur auteur) {
        return auteurRepository.save(auteur);
    }

    public Auteur update(Auteur auteur) {
        return auteurRepository.save(auteur);
    }

    public Boolean delete(Long id) {
        Optional<Auteur> auteurOptional = auteurRepository.findById(id);
        if (auteurOptional.isPresent()) {
            auteurRepository.deleteById(id);
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

}
