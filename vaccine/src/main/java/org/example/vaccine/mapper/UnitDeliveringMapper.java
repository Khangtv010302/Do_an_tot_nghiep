package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.example.vaccine.model.Manufacturer;
import org.example.vaccine.model.request.ManufacturerRequest;

import java.util.List;

public interface UnitDelivering {
    @Insert("INSERT INTO manufacturer (name, phone_number, address) value (#{name},#{phoneNumber},#{address})")
    int insertManufacturer(ManufacturerRequest request);
    @Update("UPDATE manufacturer SET name= #{name}, phone_number = #{phoneNumber}, address = #{address} WHERE id = #{id}")
    int updateManufacturer(Manufacturer manufacturer);
    @Delete("DELETE FROM manufacturer WHERE id = #{id}")
    int deleteManufacturer(String id);
    @Select("SELECT * FROM manufacturer")
    List<Manufacturer> selectAll ();
}
