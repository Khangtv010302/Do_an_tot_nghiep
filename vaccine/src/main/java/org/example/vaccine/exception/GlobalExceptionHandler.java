package org.example.vaccine.exception;

import org.example.vaccine.base.CommonResponseCode;
import org.example.vaccine.base.ResponseBase;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.nio.file.AccessDeniedException;


@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseBase> errorException(Exception e) {
        ResponseBase exceptionResponse = ResponseBase.builder()
                .message(e.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exceptionResponse);
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ResponseBase> badCredential() {
        return ResponseEntity.status(CommonResponseCode.WRONG_LOGIN.getHttp()).body(
                new ResponseBase(CommonResponseCode.WRONG_LOGIN)
        );
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ResponseBase> usernameDisabled() {
        return ResponseEntity.status(CommonResponseCode.DISABLE_USER.getHttp()).body(
                new ResponseBase(CommonResponseCode.DISABLE_USER)
        );
    }


    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<ResponseBase> existingUnique() {
        return ResponseEntity.status(CommonResponseCode.EXISTING.getHttp()).body(
                new ResponseBase(CommonResponseCode.EXISTING)
        );
    }
    @ExceptionHandler(DuplicateScheduledDate.class)
    public ResponseEntity<ResponseBase> existingScheduleDate() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseBase("Đợt tiêm đã có")
        );
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ResponseBase> NotPermission() {
        return ResponseEntity.status(CommonResponseCode.NOT_PERMISSION.getHttp()).body(
                new ResponseBase(CommonResponseCode.NOT_PERMISSION)
        );
    }
    @ExceptionHandler(RoleConstraintException.class)
    public ResponseEntity<ResponseBase> roleConstraintException() {
        return ResponseEntity.status(CommonResponseCode.KEY_CONSTRAINT.getHttp()).body(
                new ResponseBase(CommonResponseCode.KEY_CONSTRAINT)
        );
    }
    @ExceptionHandler(InsertException.class)
    public ResponseEntity<ResponseBase> insertException(){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Thêm vào thất bại"));
    }
    @ExceptionHandler(UpdateException.class)
    public ResponseEntity<ResponseBase> updateException(){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Cập nhật thất bại"));
    }
    @ExceptionHandler(DeleteException.class)
    public ResponseEntity<ResponseBase> deleteException(){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Xóa thất bại"));
    }
    @ExceptionHandler(MailSendException.class)
    public  ResponseEntity<ResponseBase> serverConnectionFailed(){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase("Không có kết nối mạng"));
    }
}
