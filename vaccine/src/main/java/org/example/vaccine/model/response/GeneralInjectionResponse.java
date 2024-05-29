package org.example.vaccine.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.example.vaccine.model.GeneralInjection;
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GeneralInjectionResponse extends GeneralInjection {
    private String name;
    private String antigen;
    private String image;
}
