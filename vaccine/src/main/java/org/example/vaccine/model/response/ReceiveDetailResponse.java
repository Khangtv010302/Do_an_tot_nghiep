package org.example.vaccine.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceiveDetailResponse {
    private String vaccineId;
    private String name;
    private int quantityReceiving;
    private String unit;
    private int packing;
    private String lotNumber;
    private LocalDate expiredDate;
}
