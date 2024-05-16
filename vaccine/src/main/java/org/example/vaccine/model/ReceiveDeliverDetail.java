package org.example.vaccine.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.example.vaccine.model.request.ReceiveDeliverDetailRequest;
import org.example.vaccine.model.request.ReceiveDeliverUpdateRequest;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceiveDeliverDetail extends ReceiveDeliverDetailRequest {

    private int quantityDelivering;
    private String receiveDeliverId;

    public ReceiveDeliverDetail(ReceiveDeliverUpdateRequest request, String receiveDeliverId) {
        super(request.getVaccineId(), request.getQuantityReceiving(), request.getLotNumber(), request.getExpiredDate());
        this.receiveDeliverId = receiveDeliverId;
        this.quantityDelivering = request.getQuantityDelivering();
    }
}
