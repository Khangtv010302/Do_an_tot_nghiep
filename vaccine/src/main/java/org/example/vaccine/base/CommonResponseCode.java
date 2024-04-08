package org.example.vaccine.base;

import org.springframework.http.HttpStatus;

public enum CommonResponseCode implements IResponseCode {
    // Common
    SUCCESS(1, "Success",HttpStatus.OK),
    NO_FOUND(0, "No found data",HttpStatus.INTERNAL_SERVER_ERROR),

    ERROR_EXCEPTION(2, "Error exception",HttpStatus.INTERNAL_SERVER_ERROR),
    EXISTING(3, "Existing data",HttpStatus.BAD_REQUEST),

    WRONG_USER(4,"Wrong username or password",HttpStatus.UNAUTHORIZED),
    WRONG_TOKEN(5, "Wrong refresh token",HttpStatus.BAD_REQUEST),
    DISABLE_USER(6,"account has been disabled",HttpStatus.BAD_REQUEST),
    TOKEN_EXPIRED(7,"Token has been expired",HttpStatus.BAD_REQUEST),
    FORBIDDEN(8,"User does not have permission ",HttpStatus.FORBIDDEN);





    private final int code;
    private final String message;
    private final HttpStatus httpStatus;

    CommonResponseCode(int code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }

    @Override
    public int getCode() {
        return code;
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