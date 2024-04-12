package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.*;
import org.example.vaccine.model.Objects;
import org.example.vaccine.model.request.ObjectRequest;

import java.util.List;

@Mapper
public interface ObjectMapper {
    @Insert("INSERT INTO Object (fullname, sex, birth_date, reminder, ethnic_group, place_of_residence, address_detail, guardian_name, guardian_phone_number, guardian_card, note, email,guardian_year_birth)" +
            " VALUE (#{fullname},#{sex},#{birthDate},#{reminder},#{ethnicGroup},#{placeOfResidence},#{addressDetail},#{guardianName},#{guardianPhoneNumber},#{guardianCard},#{note},#{email},#{guardianYearBirth})")
    int insert(ObjectRequest objectRequest);
    @Update("UPDATE object SET fullname=#{fullname}, sex = #{sex}, birth_date = #{birthDate},reminder = #{reminder},ethnic_group = #{ethnicGroup}," +
            " place_of_residence = #{placeOfResidence}, address_detail = #{addressDetail}, guardian_name= #{guardianName}, guardian_phone_number= #{guardianPhoneNumber}," +
            "guardian_card = #{guardianCard},note = #{note},email = #{email} ,guardian_year_birth = #{guardianYearBirth} WHERE id = #{id}")
    int updateById(Objects objects);
    @Delete("DELETE FROM object WHERE id = #{id}")
    int deleteById(String id);
    @Select("SELECT * FROM object")
    List<Objects> selectAll();
    @Select("SELECT * FROM object WHERE fullname LIKE CONCAT('%',#{info},'%') OR guardian_name LIKE CONCAT('%',#{info},'%') OR email LIKE CONCAT('%',#{info},'%')" +
            "OR email LIKE CONCAT('%',#{info},'%')")
    List<Objects> selectByNameOrEmailOrGuardianName(String info);
    @Select("SELECT * FROM object WHERE id = #{id}")
    Objects selectById(String id);

}
