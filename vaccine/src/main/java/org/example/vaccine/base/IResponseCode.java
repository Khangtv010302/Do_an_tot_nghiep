package org.example.vaccine.base;

import org.springframework.http.HttpStatus;

public interface IResponseCode {
    int getCode();
    String getMessage();
    HttpStatus getHttp();

}