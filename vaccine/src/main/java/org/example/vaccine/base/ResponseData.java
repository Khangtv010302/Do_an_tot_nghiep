package org.example.vaccine.base;


import lombok.Data;
import lombok.EqualsAndHashCode;


@EqualsAndHashCode(callSuper = true)
@Data
public class ResponseData<T> extends ResponseBase {
    private T data;
    public ResponseData(T data) {
        this.data = data;
    }

}