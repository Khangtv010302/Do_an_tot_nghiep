package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.example.vaccine.model.HealthcareStaff;
import org.example.vaccine.model.request.AccountUpdateRequest;

import java.util.Date;

@Mapper
public interface AccountMapper {
    @Select("SELECT fullname FROM healthcare_staff WHERE username = #{username}")
    String selectNameByUsername(String username);
    @Select("SELECT password from healthcare_staff where username =#{username}")
    String selectPasswordByUsername(String username);
    @Update("UPDATE healthcare_staff SET password = #{password} WHERE username = #{username}")
    void updatePasswordByUsername(String password,String username);
    @Select("SELECT  expire_date_token FROM healthcare_staff WHERE refresh_token = #{refreshToken} AND username = #{username}")
    Date getExpiredDateRefreshFromTokenAndUsername(String refreshToken, String username);
    @Select(" SELECT  * FROM healthcare_staff WHERE username= #{username}")
    HealthcareStaff selectByUsername(String username);
    @Update("UPDATE  healthcare_staff SET email = #{email}, fullname = #{fullname},phone_number = #{phoneNumber},place_of_residence = #{placeOfResidence}, sex = #{sex} WHERE id=#{id} ")
    int updateAccountById (AccountUpdateRequest accountUpdateRequest);
    @Update("UPDATE  healthcare_staff SET expire_date_token = null, refresh_token = null  WHERE refresh_token=#{refreshToken} ")
    int logout (String refreshToken);
}
