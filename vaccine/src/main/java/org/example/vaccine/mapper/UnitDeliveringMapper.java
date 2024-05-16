package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.*;
import org.example.vaccine.model.Manufacturer;
import org.example.vaccine.model.UnitDelivering;
import org.example.vaccine.model.request.ManufacturerRequest;
import org.example.vaccine.model.request.UnitDeliveringRequest;

import java.util.List;
@Mapper
public interface UnitDeliveringMapper {
    @Insert("INSERT INTO unit_delivering (name, phone_number, address) value (#{name},#{phoneNumber},#{address})")
    int insertManufacturer(UnitDeliveringRequest request);
    @Update("UPDATE unit_delivering SET name= #{name}, phone_number = #{phoneNumber}, address = #{address} WHERE id = #{id}")
    int updateManufacturer(UnitDelivering manufacturer);
    @Delete("DELETE FROM unit_delivering WHERE id = #{id}")
    int deleteManufacturer(String id);
    @Select("SELECT * FROM unit_delivering WHERE name LIKE CONCAT('%',#{name},'%')")
    List<Manufacturer> selectByName (String name);
    @Select("SELECT  count(*) FROM unit_delivering WHERE name =#{name}")
    int isExistName(String name);
}
