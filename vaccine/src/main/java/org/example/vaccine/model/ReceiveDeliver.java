package org.example.vaccine.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.vaccine.model.request.ReceiveDeliverRequest;
import org.example.vaccine.model.request.ReceiveDeliverUpdateRequest;

import java.time.LocalDate;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceiveDeliver  {
    private String id;
    private String unitReceiving;
    private String unitDeliveringId;
    private String officerReceiving;
    private String officerDelivering;
    private LocalDate dateReceiving;
    private LocalDate dateDelivering;
    private String note;
    private List<ReceiveDeliverUpdateRequest> receiveDeliverUpdateRequests;

    public ReceiveDeliver(ReceiveDeliverRequest request) {
        this.unitReceiving = request.getUnitReceiving();
        this.unitDeliveringId = request.getUnitDeliveringId();
        this.officerReceiving = request.getOfficerReceiving();
        this.officerDelivering = request.getOfficerDelivering();
        this.dateReceiving = request.getDateReceiving();
        this.dateDelivering = request.getDateDelivering();
        this.note = request.getNote();
    }
}
