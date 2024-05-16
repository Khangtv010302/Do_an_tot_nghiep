package org.example.vaccine.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ObjectInjectionDetailResponse extends ObjectInjectionResponse{
      private String antigen;
      private String lotNumber;
      private String reaction;
      private int monthOld;
      private String vaccineId;
}
