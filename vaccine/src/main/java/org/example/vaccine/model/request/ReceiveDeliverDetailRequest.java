package org.example.vaccine.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceiveDeliverDetailRequest {
    private String vaccineId;
    private int quantityReceiving;
    private String lotNumber;
    private LocalDate expiredDate;
}
