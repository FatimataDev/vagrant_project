package com.vagrant.projet_vagrant.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;




@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Auteur {
    @Id
    @GeneratedValue
    private Long id ;
    private String nom;





}
