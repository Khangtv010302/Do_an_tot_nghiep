package org.example.vaccine.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HealthcareStaffUpdateRequest {
    private String fullname;
    private Boolean sex;
    private String email;
    private String phoneNumber;
    private String placeOfResidence;
    private String roleId;
    private String id;
}
