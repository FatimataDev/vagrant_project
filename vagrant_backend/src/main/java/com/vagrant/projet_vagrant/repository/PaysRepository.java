package com.vagrant.projet_vagrant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vagrant.projet_vagrant.model.Pays;



public interface PaysRepository extends JpaRepository<Pays, Long> {

}
