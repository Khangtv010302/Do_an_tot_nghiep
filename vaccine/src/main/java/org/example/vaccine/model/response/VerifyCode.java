package org.example.vaccine.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class VerifyCode {
    String code;
    Date expiredDate;
}
