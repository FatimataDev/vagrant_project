package com.vagrant.projet_vagrant.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.vagrant.projet_vagrant.model.Auteur;


public interface AuteurRepository extends JpaRepository<Auteur, Long> {

   // @Query(value = "MATCH (a:Auteur) RETURN a")

}
