package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public class ObjectMapper {
    @Insert("INSERT INTO Object (fullname, sex, birth_date, reminder, ethnic_group, place_of_residence, address_detail, guardian_name, guardian_phone_number, guardian_card, note, email)" +
            " VALUE (#{fullname},#{sex},#{birthDate},#{reminder},#{ethnic_g},#{},#{},#{},#{},#{},#{},#{})")
}
