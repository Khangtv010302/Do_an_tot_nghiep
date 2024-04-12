package org.example.vaccine.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VaccineResponse {
    private String id;
    private String name;
    private String manufacturerName;
    private String antigen;
    private String unit;
    private int packing;
    private String image;
}
