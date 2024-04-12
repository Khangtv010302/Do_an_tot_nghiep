package org.example.vaccine.exception;

import org.example.vaccine.base.CommonResponseCode;
import org.example.vaccine.base.ResponseBase;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;



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
    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<ResponseBase> existingUnique() {
        return ResponseEntity.status(CommonResponseCode.EXISTING.getHttp()).body(
                new ResponseBase(CommonResponseCode.EXISTING)
        );
    }
    @ExceptionHandler(InsertException.class)
    public ResponseEntity<ResponseBase> insertException(){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase(0,"Insert Failed"));
    }
    @ExceptionHandler(UpdateException.class)
    public ResponseEntity<ResponseBase> updateException(){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase(0,"Update Failed"));
    }
    @ExceptionHandler(DeleteException.class)
    public ResponseEntity<ResponseBase> deleteException(){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase(0,"Delete Failed"));
    }
}
