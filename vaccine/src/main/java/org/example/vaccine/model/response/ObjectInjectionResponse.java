package org.example.vaccine.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ObjectInjectionResponse {
    private String id;
    private String objectId;
    private String name;
    private int quantity;
    private boolean state;
    private String vaccinationLocation;
    private LocalDate vaccinationDate;
}
