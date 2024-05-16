package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.*;
import org.example.vaccine.model.HealthcareStaff;
import org.example.vaccine.model.request.HealthcareStaffRequest;
import org.example.vaccine.model.request.HealthcareStaffUpdateRequest;
import org.example.vaccine.model.response.HealthcareStaffResponse;
import org.example.vaccine.model.response.UserResponse;

import java.util.List;

@Mapper
public interface HealthcareStaffMapper {
    @Insert("INSERT INTO healthcare_staff (role_id, fullname, sex, email, phone_number, place_of_residence, username, password)" +
            " VALUE (#{roleId},#{fullname},#{sex},#{email},#{phoneNumber},#{placeOfResidence},#{username},#{password})")
    int insert(HealthcareStaffRequest healthcareStaffRequest);
    @Update("UPDATE healthcare_staff SET role_id = #{roleId}, fullname = #{fullname}, sex = #{sex}, email = #{email}, phone_number = #{phoneNumber}, " +
            " place_of_residence = #{placeOfResidence} WHERE id = #{id}")
    int updateById(HealthcareStaffUpdateRequest request);
    @Delete("DELETE FROM healthcare_staff WHERE id =#{id}")
    int deleteById(String id);
    @Select("SELECT  he.id,he.email,he.fullname,he.place_of_residence,he.username,he.phone_number,he.role_id,he.sex, " +
            "ro.name as 'roleName' FROM healthcare_staff as he INNER JOIN role as ro on he.role_id = ro.id")
    List<HealthcareStaffResponse> selectAll();
    @Select("SELECT he.id,he.email,he.fullname,he.place_of_residence,he.username,he.phone_number,he.role_id,he.sex, ro.name as 'roleName' " +
            "FROM healthcare_staff as he INNER JOIN role as ro on he.role_id = ro.id  WHERE he.fullname LIKE CONCAT('%',#{info}, '%') OR he.email LIKE CONCAT('%',#{info}, '%')  " +
            "OR he.username LIKE CONCAT('%', #{info}, '%')")
    List<HealthcareStaff> selectByNameOrEmailOrUsername(String info);
    @Select("SELECT  * FROM healthcare_staff WHERE id = #{id}")
    HealthcareStaff selectById(String id);
    @Select("SELECT username,password,code as roleCode FROM healthcare_staff as he INNER JOIN role as ro ON he.role_id = ro.id WHERE username= #{username}")
    UserResponse selectUserByUsername(String username);
    @Select("CALL CheckUsernameAndEmail(#{username},#{email})")
    int checkUsernameAndEmail(String username,String email);
}
