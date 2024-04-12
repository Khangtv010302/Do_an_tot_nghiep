package org.example.vaccine.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.example.vaccine.model.ReceiveDeliverDetail;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceiveDeliverUpdateRequest   {
    private String vaccineId;
    private int quantityReceiving;
    private String lotNumber;
    private LocalDate expiredDate;
    private int quantityDestroy;
    private int quantityDelivering;
}
