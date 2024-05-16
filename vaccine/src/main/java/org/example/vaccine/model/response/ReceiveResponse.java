package org.example.vaccine.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class ReceiveResponse {
    private String id;
    private String unitReceiving;
    private String unitDeliveringId;
    private String officerReceiving;
    private String officerDelivering;
    private LocalDate dateReceiving;
    private LocalDate dateDelivering;
    private String note;

}
