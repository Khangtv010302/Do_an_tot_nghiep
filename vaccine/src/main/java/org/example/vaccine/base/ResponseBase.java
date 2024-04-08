package org.example.vaccine.base;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ResponseBase {

    private int code;
    private String message;
    public ResponseBase() {
        this.message = CommonResponseCode.SUCCESS.getMessage();
        this.code = CommonResponseCode.SUCCESS.getCode();
    }

    public ResponseBase(CommonResponseCode code){
        this.message = code.getMessage();
        this.code = code.getCode();
    }


}