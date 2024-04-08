package org.example.vaccine.exception;

import org.example.vaccine.base.CommonResponseCode;
import org.example.vaccine.base.ResponseBase;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.sql.SQLIntegrityConstraintViolationException;


@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseBase> errorException(Exception e) {
        ResponseBase exceptionResponse = ResponseBase.builder()
                .code(2)
                .message(e.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exceptionResponse);
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ResponseBase> badCredential() {
        return ResponseEntity.status(CommonResponseCode.WRONG_USER.getHttp()).body(
                new ResponseBase(CommonResponseCode.WRONG_USER)
        );
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ResponseBase> usernameDisabled() {
        return ResponseEntity.status(CommonResponseCode.DISABLE_USER.getHttp()).body(
                new ResponseBase(CommonResponseCode.DISABLE_USER)
        );
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ResponseBase> usernameNotFound() {
        return ResponseEntity.status(CommonResponseCode.WRONG_USER.getHttp()).body(
                new ResponseBase(CommonResponseCode.WRONG_USER)
        );
    }
}
