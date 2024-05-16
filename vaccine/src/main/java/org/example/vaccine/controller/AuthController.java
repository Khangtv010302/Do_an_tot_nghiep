package org.example.vaccine.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.ResponseBase;

import org.example.vaccine.model.request.LoginRequest;
import org.example.vaccine.model.request.UpdateForgotPasswordRequest;
import org.example.vaccine.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/API/Auth")
@SecurityRequirement(name = "userAuth")
public class AuthController {
    final AuthService authService;
    @GetMapping("/Login")
    public ResponseEntity<ResponseBase> login(@RequestParam String username, @RequestParam String password){
        LoginRequest loginRequest = new LoginRequest(username,password);
        return authService.login(loginRequest);
    }
    @GetMapping("/SendEmailCode")
    public ResponseEntity<ResponseBase> SendEmailCode(@RequestParam String email){
        return authService.sendCodeForgotPassword(email);
    }
    @GetMapping("/VerifyCode")
    public ResponseEntity<ResponseBase> VerifyCode(@RequestParam String code,@RequestParam String email){
        return authService.verifyCode(code,email);
    }
    @PostMapping("/UpdatePassword")
    public ResponseEntity<ResponseBase> UpdatePassword(@RequestBody UpdateForgotPasswordRequest request){
        return authService.updatePassword(request);
    }

}
