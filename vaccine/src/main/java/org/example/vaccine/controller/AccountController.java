package org.example.vaccine.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;
import org.example.vaccine.model.request.AccountUpdateRequest;
import org.example.vaccine.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/API/Account")
@SecurityRequirement(name = "userAuth")
public class AccountController {
    AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/getNameByUsername")
    ResponseEntity<ResponseBase> getNameByUsername(@RequestParam String username){
        return accountService.selectNameByUsername(username);
    }
    @PostMapping("/ChangePassword")
    ResponseEntity<ResponseBase> changePassword(@RequestParam String username,@RequestParam String oldPassword,@RequestParam String newPassword){
        return accountService.updatePasswordByUserName(username,oldPassword,newPassword);
    }
    @GetMapping("/GetJwtTokenFromRefreshToken")
    public ResponseEntity<ResponseBase> getJwtTokenFromRefreshToken(@RequestParam String refreshToken,@RequestParam String username,@RequestParam String jwtToken){
        return accountService.getJwtTokenFromTokenRequest(refreshToken,username,jwtToken);
    }
    @GetMapping("/SelectByUsername")
    public ResponseEntity<ResponseBase> selectByUsername (@RequestParam String username){
        return accountService.selectByUsername(username);
    }
    @PostMapping("/UpdateAccount")
    public ResponseEntity<ResponseBase> updateAccount (@RequestBody AccountUpdateRequest accountUpdateRequest)
    {
        return  accountService.updateAccountById(accountUpdateRequest);
    }
    @PostMapping("/Logout")
    public ResponseEntity<ResponseBase> logout (@RequestParam String refreshToken)
    {
        return  accountService.logout(refreshToken);
    }
}
