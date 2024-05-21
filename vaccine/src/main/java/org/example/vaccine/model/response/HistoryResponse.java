package org.example.vaccine.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.vaccine.model.ObjectInjection;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HistoryResponse  {
    private String id;
    private String objectName;
    private String vaccineName;
    private int monthOld;
    private LocalDate vaccinationDate;
    private String vaccinationLocation;
    private Boolean state;
    private String reaction;
    private int quantity;
    private String lotNumber;
}
