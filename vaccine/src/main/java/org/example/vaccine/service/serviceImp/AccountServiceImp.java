package org.example.vaccine.service.serviceImp;


import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;
import org.example.vaccine.mapper.AccountMapper;
import org.example.vaccine.model.HealthcareStaff;
import org.example.vaccine.model.request.AccountUpdateRequest;
import org.example.vaccine.model.response.JwtTokenRespone;

import org.example.vaccine.security.JwtTokenProvider;
import org.example.vaccine.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AccountServiceImp implements AccountService {
    AccountMapper accountMapper;
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AccountServiceImp(AccountMapper accountMapper, JwtTokenProvider jwtTokenProvider) {
        this.accountMapper = accountMapper;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public ResponseEntity<ResponseBase> selectNameByUsername(String username) {
        return ResponseEntity.ok().body(new ResponseBase(accountMapper.selectNameByUsername(username)));
    }

    @Override
    public ResponseEntity<ResponseBase> updatePasswordByUserName(String username, String oldPassword, String newPassword) {
        String encodedPassword = accountMapper.selectPasswordByUsername(username);
        if (verifyPassword(oldPassword, encodedPassword)) {
            accountMapper.updatePasswordByUsername(bCryptPasswordEncoder(newPassword), username);
            return ResponseEntity.ok().body(new ResponseBase("Đổi mật khẩu thành công"));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Mật khẩu cũ không chính xác"));

    }

    @Override
    public ResponseEntity<ResponseBase> getJwtTokenFromTokenRequest(String refreshToken, String username, String jwtToken) {
        if (!jwtTokenProvider.validateToken(jwtToken))
            return ResponseEntity.status((HttpStatus.BAD_REQUEST)).body(new ResponseBase("Jwt token không chính xác"));
        if (!jwtTokenProvider.validateToken(refreshToken))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Refresh token không chính xác"));if (!username.equalsIgnoreCase(jwtTokenProvider.extractUsername(refreshToken)))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Username không chính xác"));
        Date expiredDateRefreshToken = accountMapper.getExpiredDateRefreshFromTokenAndUsername(refreshToken, username);
        Date now = new Date();
        if (expiredDateRefreshToken.getTime() < now.getTime())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("RefreshToken đã hết hạn"));
        jwtTokenProvider.expiredJWT(jwtToken);
        String token = jwtTokenProvider.generateToken(username);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseData<>(
                        new JwtTokenRespone(token, jwtTokenProvider.extractExpireDate(token))
                )
        );
    }

    @Override
    public ResponseEntity<ResponseBase> selectByUsername(String username) {
        HealthcareStaff healthcareStaff = accountMapper.selectByUsername(username);
        if(healthcareStaff == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Không có thông tin cá nhân"));
        return  ResponseEntity.ok().body(new ResponseData<> (healthcareStaff));
    }

    @Override
    public ResponseEntity<ResponseBase> updateAccountById(AccountUpdateRequest request) {
        int isUpdateSuccess = accountMapper.updateAccountById(request);
        if (isUpdateSuccess == 1)
           return ResponseEntity.ok().body(new ResponseBase("Cập nhật thông tin thành công"));
        return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Cập nhật không thành công"));
    }

    public boolean verifyPassword(String rawPassword, String encodedPassword) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder.matches(rawPassword, encodedPassword);
    }

    public String bCryptPasswordEncoder(String password) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder.encode(password);
    }
}
