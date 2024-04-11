package org.example.vaccine.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlanRequest {
    private String formId;
    private LocalDate scheduledDate;
    private int numberDate;
    private String location;
    private int numberObject;
    private Boolean state;
}
