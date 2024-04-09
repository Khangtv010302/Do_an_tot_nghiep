package org.example.vaccine.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.example.vaccine.model.request.HealthcareStaffRequest;
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HealthcareStaff extends HealthcareStaffRequest {
    private String id;
}
