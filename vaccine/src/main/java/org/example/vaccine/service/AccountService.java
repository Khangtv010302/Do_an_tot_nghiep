package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.request.AccountUpdateRequest;
import org.springframework.http.ResponseEntity;

public interface AccountService {
    ResponseEntity<ResponseBase> selectNameByUsername(String username);
    ResponseEntity<ResponseBase> updatePasswordByUserName(String username,String oldPassword,String newPassword);
    ResponseEntity<ResponseBase> getJwtTokenFromTokenRequest(String refreshToken,String username,String jwtToken);
    ResponseEntity<ResponseBase> selectByUsername(String username);
    ResponseEntity<ResponseBase> updateAccountById(AccountUpdateRequest request);
}
