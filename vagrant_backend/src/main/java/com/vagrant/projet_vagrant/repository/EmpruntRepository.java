package com.vagrant.projet_vagrant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vagrant.projet_vagrant.model.Emprunt;


public interface EmpruntRepository extends JpaRepository<Emprunt, Long> {

}
