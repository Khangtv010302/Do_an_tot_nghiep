package org.example.vaccine.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HealthcareSearchRequest {
    private String fullname;
    private String email;
    private String username;
}
