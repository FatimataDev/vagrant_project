package com.vagrant.projet_vagrant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vagrant.projet_vagrant.model.Client;



public interface ClientRepository extends JpaRepository<Client, Long> {

}