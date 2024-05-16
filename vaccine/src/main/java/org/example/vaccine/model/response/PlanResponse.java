package org.example.vaccine.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlanResponse {
    private String id;
    private String form;
    private LocalDate scheduledDate;
    private int numberDate;
    private String location;
    private int numberObject;
    private Boolean state;
    private List<String> vaccineId;
}
