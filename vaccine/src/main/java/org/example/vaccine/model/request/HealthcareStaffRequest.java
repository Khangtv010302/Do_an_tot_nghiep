package org.example.vaccine.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HealthcareStaffRequest {
    private String fullname;
    private Boolean sex;
    private String email;
    private String phoneNumber;
    private String placeOfOrigin;
    private String placeOfResidence;
    private String username;
    private String password;
    private String roleId;
}
