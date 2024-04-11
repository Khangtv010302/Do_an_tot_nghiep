package org.example.vaccine.model;

import lombok.*;
import org.example.vaccine.model.request.VaccineRequest;
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vaccine extends VaccineRequest{
    private String id;
//    private String manufacturerId;
//    private String name;
//    private String antigen;
//    private int packing;
//    private String unit;
//    private String description;
//    private String origin;
//    private String contraindicated;
//    private String useWithCaution;
//    private String unwantedEffect;
//    private String preserve;
//    private String image;

    public Vaccine(String manufacturerId, String name, String antigen, int packing, String unit, String description, String origin, String contraindicated, String useWithCaution, String unwantedEffect, String preserve, String image, String id) {
        super(manufacturerId, name, antigen, packing, unit, description, origin, contraindicated, useWithCaution, unwantedEffect, preserve, image);
        this.id = id;
    }
}
