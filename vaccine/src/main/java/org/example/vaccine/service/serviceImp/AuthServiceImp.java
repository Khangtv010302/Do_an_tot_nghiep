package org.example.vaccine.service.serviceImp;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;
import org.example.vaccine.mapper.AuthMapper;
import org.example.vaccine.model.request.LoginRequest;
import org.example.vaccine.model.request.UpdateForgotPasswordRequest;
import org.example.vaccine.model.response.TokenResponse;
import org.example.vaccine.security.JwtTokenProvider;
import org.example.vaccine.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImp implements AuthService {
     JwtTokenProvider jwtTokenProvider;
     AuthenticationManager authenticationManager;
     AuthMapper authMapper;
    private final JavaMailSender mailSender;
    @Value("$(spring.mail.username)")
    private String fromMail;
    private final Configuration config;
    @Autowired
    public AuthServiceImp(JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager , AuthMapper authMapper, JavaMailSender mailSender, Configuration config) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
        this.authMapper=authMapper;
        this.mailSender = mailSender;
        this.config = config;
    }
    @Override
    public ResponseEntity<ResponseBase> login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication.getName());
        Date now = new Date();
        Date expiredDateRefresh = new Date(now.getTime() + 86400000 * 15);
        String refreshToken = jwtTokenProvider.generateRefeshToken(authentication.getName(),expiredDateRefresh);
        authMapper.updateRefreshToken(refreshToken,expiredDateRefresh,loginRequest.getUsername());
        String roleCode = authMapper.getRoleCode(loginRequest.getUsername());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseData<>(
                        new TokenResponse(token, loginRequest.getUsername()
                                , jwtTokenProvider.extractExpireDate(token),refreshToken,expiredDateRefresh,roleCode)
                )
        );
    }

    @Override
    public ResponseEntity<ResponseBase> sendCodeForgotPassword(String email) {
                int isExistingEmail =authMapper.isExistingEmail(email);
                if (isExistingEmail <=0 )
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Không tìm thấy email"));
                String verificationCode=getCodeVerification();
                 Date now = new Date();
                 Date expiredCode = new Date(now.getTime() + 15 * 60 * 1000);
                authMapper.updateVerificationCodeByEmail(email,verificationCode,expiredCode);
                if(isSendMail(email,verificationCode))
                    return ResponseEntity.ok().body(new ResponseBase("Mã xác nhận đã được gửi tới email của bạn"));
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Không gửi được email hãy thử lại"));

    }

    @Override
    public ResponseEntity<ResponseBase> verifyCode(String code,String email) {
        int isVerifyCode= authMapper.verifyCode(code,email);
        if( isVerifyCode > 0)
            return ResponseEntity.ok().body(new ResponseBase("Xác thực thành công"));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Mã xác thực không đúng hoặc đã hết hạn"));
    }

    @Override
    public ResponseEntity<ResponseBase> updatePassword(UpdateForgotPasswordRequest request) {
           request.setPassword(bCryptPasswordEncoder(request.getPassword()));
            authMapper.updatePasswordAndCode(request);
            return ResponseEntity.ok().body(new ResponseBase("Cập nhật mật khẩu thành công"));
    }

    private Boolean isSendMail (String email,String code){
        Map<String,Object> model= new HashMap<>();
        model.put("code",code);
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());

            Template t = config.getTemplate("email-code.ftl");

            String html = FreeMarkerTemplateUtils.processTemplateIntoString(t,model);

            helper.setTo(email);
            helper.setFrom(fromMail);
            helper.setText(html,true);
            helper.setSubject("Gửi mã xác nhận");

            mailSender.send(message);

            return true;
        } catch (MessagingException | TemplateException | IOException e){
            return false;
        }
    }



     private String getCodeVerification() {
        String CODETEMPLATE = "abcdefghijklmnopqrstuvwxyz1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 5) { // length of the random string.
            int index = (int) (rnd.nextFloat() * CODETEMPLATE.length());
            salt.append(CODETEMPLATE.charAt(index));
        }
        return salt.toString();
    }
    public String bCryptPasswordEncoder(String password){
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder.encode(password);
    }
}
