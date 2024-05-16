package org.example.vaccine.base;

import org.springframework.http.HttpStatus;

public enum CommonResponseCode implements IResponseCode {
    // Common
    SUCCESS( "Success",HttpStatus.OK),
    NO_FOUND( "No found data",HttpStatus.NOT_FOUND),

    ERROR_EXCEPTION( "Error exception",HttpStatus.INTERNAL_SERVER_ERROR),
    EXISTING( "Existing data",HttpStatus.BAD_REQUEST),
    EXISTING_ROLE_CODE( "Mã loại nhân viên đã tồn tại ",HttpStatus.BAD_REQUEST),

    WRONG_LOGIN("Sai thông tin đăng nhập",HttpStatus.UNAUTHORIZED),
    NOT_PERMISSION("Bạn không có quyền truy cập",HttpStatus.FORBIDDEN),
    KEY_CONSTRAINT("Bạn không xóa được vì có liên kết với dữ liệu khác",HttpStatus.BAD_REQUEST),
   
    WRONG_TOKEN( "Wrong refresh token",HttpStatus.BAD_REQUEST),
    DISABLE_USER("account has been disabled",HttpStatus.BAD_REQUEST),
    TOKEN_EXPIRED("User does not have permission ",HttpStatus.FORBIDDEN);






    private final String message;
    private final HttpStatus httpStatus;

    CommonResponseCode( String message, HttpStatus httpStatus) {
        this.message = message;
        this.httpStatus = httpStatus;
    }
    @Override
    public String getMessage() {
        return message;
    }

    @Override
    public HttpStatus getHttp() {
        return httpStatus;
    }


}