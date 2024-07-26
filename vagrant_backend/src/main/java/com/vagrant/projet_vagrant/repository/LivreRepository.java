package com.vagrant.projet_vagrant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vagrant.projet_vagrant.model.Livre;

import java.util.List;


public interface LivreRepository extends JpaRepository<Livre, Long> {



    List<Livre> findByTitreContainingIgnoreCase(String titre);

   





}
