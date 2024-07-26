package com.vagrant.projet_vagrant.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Livre {
    @Id
    @GeneratedValue
    private Long id ;
    private String titre;
    private String resume;
    private String ean;
    private String edition;
    private String photo;
    private String annee;
  }
