package org.example.vaccine.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VaccineRequest  {
    private String manufacturerId;
    private String name;
    private String antigen;
    private int packing;
    private String unit;
    private String description;
    private String origin;
    private String contraindicated;
    private String useWithCaution;
    private String unwantedEffect;
    private String preserve;
    private String image;

}
