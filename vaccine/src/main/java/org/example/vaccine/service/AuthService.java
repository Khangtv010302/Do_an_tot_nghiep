package org.example.vaccine.service;

import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.model.request.LoginRequest;
import org.example.vaccine.model.request.UpdateForgotPasswordRequest;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<ResponseBase> login(LoginRequest loginRequest);
    ResponseEntity<ResponseBase> sendCodeForgotPassword(String email);
    ResponseEntity<ResponseBase> verifyCode(String code,String email);
    ResponseEntity<ResponseBase> updatePassword(UpdateForgotPasswordRequest request);
}
