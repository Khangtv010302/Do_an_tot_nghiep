package org.example.vaccine.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ObjectRequest {
    private String fullname;
    private Boolean sex;
    private LocalDate birthDate;
    private Boolean reminder;
    private String ethnicGroup;
    private String placeOfResidence;
    private String addressDetail;
    private String email;
    private String guardianName;
    private int guardianYearBirth;
    private String guardianPhoneNumber;
    private String guardianCard;
    private String note;
}
