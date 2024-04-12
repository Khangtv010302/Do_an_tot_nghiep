package org.example.vaccine.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ObjectInjectionUpdateRequest {
    private String id;
    private String objectId;
    private int monthOld;
    private LocalDate vaccinationDate;
    private String vaccinationLocation;
    private int quantity;
    private Boolean state;
    private String reaction;
    private String lotNumber;
}
