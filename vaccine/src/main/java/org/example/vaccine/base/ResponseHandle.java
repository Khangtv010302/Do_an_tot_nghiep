package org.example.vaccine.base;


import org.springframework.stereotype.Component;

@Component
public class ResponseHandle {
    public CommonResponseCode response(int code) {
        return switch (code) {
            case 1 -> CommonResponseCode.SUCCESS;
            case 0 -> CommonResponseCode.NO_FOUND;
            case 3 -> CommonResponseCode.EXISTING;
            case 18 -> CommonResponseCode.WRONG_TOKEN;
            case 20 -> CommonResponseCode.TOKEN_EXPIRED;
            default -> CommonResponseCode.WRONG_LOGIN;
        };
    }
}
