package org.example.vaccine.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AccountUpdateRequest {
    private String id;
    private String fullname;
    private String email;
    private String phoneNumber;
    private Boolean sex;
    private String placeOfResidence;
}
