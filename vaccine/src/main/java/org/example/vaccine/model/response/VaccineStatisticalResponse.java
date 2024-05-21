package org.example.vaccine.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VaccineStatisticalResponse {
        private int objectNumber;
        private int oldNumber;
        private  int newNumber;
        private int useNumber;
        private int reactionNumber;
}
