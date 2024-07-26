package com.vagrant.projet_vagrant.service;

import com.vagrant.projet_vagrant.model.Livre;
import com.vagrant.projet_vagrant.repository.AuteurRepository;
import com.vagrant.projet_vagrant.repository.LivreRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivreService {

    private final LivreRepository livreRepository;
    public LivreService(LivreRepository livreRepository, AuteurRepository auteurRepository) {
        this.livreRepository = livreRepository;
    }

    public List<Livre> getAll(){
        return livreRepository.findAll();
    }

    public List<Livre> getAllGraph(){
        return livreRepository.findAll();
    }


        public Optional<Livre> findOne(Long id) {
            return livreRepository.findById(id);
        }



    public Livre create(Livre livre) {
        return livreRepository.save(livre);
    }

    public List<Livre> creates(List<Livre> livres) {
        return livreRepository.saveAll(livres);
    }

    public Livre update(Livre livre) {
        return livreRepository.save(livre);
    }

    public Boolean delete(Long id) {
        Optional<Livre> livreOptional = livreRepository.findById(id);
        if (livreOptional.isPresent()) {
            livreRepository.deleteById(id);
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }


    public List<Livre> searchByName(String titre) {
        return livreRepository.findByTitreContainingIgnoreCase(titre);
    }



}
