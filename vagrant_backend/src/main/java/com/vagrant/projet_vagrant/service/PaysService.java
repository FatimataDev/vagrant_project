package com.vagrant.projet_vagrant.service;

import com.vagrant.projet_vagrant.model.Pays;
import com.vagrant.projet_vagrant.repository.PaysRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class PaysService {

    private final PaysRepository paysRepository;

    public PaysService(PaysRepository paysRepository) {
        this.paysRepository = paysRepository;
    }

    public List<Pays> getAll(){
        return paysRepository.findAll();

}

    public Pays create(Pays pays) {
        return paysRepository.save(pays);
    }


    public List<Pays> creates(List<Pays> pays) {
        return paysRepository.saveAll(pays);
    }

    public Pays update(Pays pays) {
        return paysRepository.save(pays);
    }

    public Boolean delete(Long id) {
        Optional<Pays> paysOptional = paysRepository.findById(id);
        if (paysOptional.isPresent()) {
            paysRepository.deleteById(id);
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

    public Boolean deleteMultiple(List<Pays> pays) {
        pays.forEach(pay ->
            {
                paysRepository.deleteById(pay.getId());
            });

            return Boolean.FALSE;
    }


    public void supprimerListe(List<Long> ids) {
        paysRepository.deleteAllById(ids);
    }

}
