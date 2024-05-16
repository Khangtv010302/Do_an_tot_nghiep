package org.example.vaccine.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenResponse {
    private String JwtToken;
    private String username;
    private Date expiredDate;
    private String refreshToken;
    private Date expiredDateRefresh;
    private String roleCode;
}
