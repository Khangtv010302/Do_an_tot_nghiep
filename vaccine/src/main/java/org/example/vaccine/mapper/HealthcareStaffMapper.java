package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.*;
import org.example.vaccine.model.HealthcareStaff;
import org.example.vaccine.model.request.HealthcareStaffRequest;

import java.util.List;

@Mapper
public interface HealthcareStaffMapper {
    @Insert("INSERT INTO healthcare_staff (role_id, fullname, sex, email, phone_number, place_of_origin, place_of_residence, username, password)" +
            " VALUE (#{roleId},#{fullname},#{sex},#{email},#{phoneNumber},#{placeOfOrigin},#{placeOfResidence},#{username},#{password})")
    int insert(HealthcareStaffRequest healthcareStaffRequest);
    @Update("UPDATE healthcare_staff SET role_id = #{role_id}, fullname = #{fullname}, sex = #{sex}, email = #{email}, phone_number = #{phoneNumber}, " +
            "place_of_origin = #{placeOfOrigin}, place_of_residence = #{placeOfResidence} WHERE id = #{id}")
    int updateById(HealthcareStaff healthcareStaff);
    @Delete("DELETE FROM healthcare_staff WHERE id =#{id}")
    int deleteById(String id);
    @Select("SELECT  * FROM healthcare_staff")
    List<HealthcareStaff> selectAll();
    @Select("SELECT * FROM healthcare_staff \n" +
            "WHERE fullname LIKE CONCAT('%', #{fullname}, '%') \n" +
            "OR email LIKE CONCAT('%', #{email}, '%') \n" +
            "OR username LIKE CONCAT('%', #{username}, '%');")
    List<HealthcareStaff> selectByNameOrEmailOrUsername();
}
