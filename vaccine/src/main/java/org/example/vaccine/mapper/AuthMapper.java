package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.example.vaccine.model.request.UpdateForgotPasswordRequest;

import java.util.Date;

@Mapper
public interface AuthMapper {
    @Update("UPDATE healthcare_staff SET refresh_token =  #{refreshToken} , expire_date_token = #{expireDateToken} WHERE username = #{username}")
    void updateRefreshToken(String refreshToken, Date expireDateToken,String username);
    @Select("SELECT code FROM role WHERE id =(SELECT role_id FROM healthcare_staff WHERE username = #{username})")
    String getRoleCode(String username);
    @Select("SELECT  count(*) FROM healthcare_staff WHERE email =#{email}")
    int isExistingEmail(String email);
    @Select("SELECT  count(*) FROM healthcare_staff WHERE verification_code =#{code} AND expire_date_code >= now() AND email= #{email}")
    int verifyCode(String code,String email);
    @Update("UPDATE healthcare_staff SET verification_code=#{code} , expire_date_code = #{expiredDateCode} WHERE email=#{email}")
    void updateVerificationCodeByEmail(String email,String code,Date expiredDateCode);
    @Update("UPDATE healthcare_staff SET password=#{password}, verification_code = '' WHERE email = #{email} AND verification_code = #{code}")
    void updatePasswordAndCode(UpdateForgotPasswordRequest request);
}
