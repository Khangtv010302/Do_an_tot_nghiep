package org.example.vaccine.base;

import org.springframework.http.HttpStatus;

public interface IResponseCode {
    String getMessage();
    HttpStatus getHttp();

}