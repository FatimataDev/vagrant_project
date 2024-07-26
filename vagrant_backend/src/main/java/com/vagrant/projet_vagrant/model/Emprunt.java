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
public class Emprunt {

    @Id
    @GeneratedValue
    private Long id ;
    private String date;
    private Boolean emprunt;
    private Long idLivre ;
    private String titre;
    private String ean;

}
