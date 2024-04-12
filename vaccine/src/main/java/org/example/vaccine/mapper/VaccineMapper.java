package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.*;
import org.example.vaccine.model.Vaccine;
import org.example.vaccine.model.request.VaccineRequest;
import org.example.vaccine.model.request.VaccineSearchRequest;
import org.example.vaccine.model.response.VaccineResponse;

import java.util.List;

@Mapper
public interface VaccineMapper {
    @Insert("INSERT INTO vaccine(manufacturer_id, name, image, antigen, packing, unit, description, origin, contraindicated, use_with_caution, unwanted_effect, preserve)" +
            "value (#{manufacturerId},#{name},#{image},#{antigen},#{packing},#{unit},#{description},#{origin},#{contraindicated},#{useWithCaution},#{unwantedEffect},#{preserve})")
    int insert(VaccineRequest vaccineRequest);

    @Update("UPDATE vaccine SET name=#{name} , image = #{image}, packing = #{packing}, unit = #{unit}, antigen = #{antigen}, description=#{description}, origin = #{origin}, contraindicated = #{contraindicated},use_with_caution =  #{useWithCaution}, unwanted_effect = #{unwantedEffect}, preserve = #{preserve}, manufacturer_id = #{manufacturerId}  WHERE id = #{id}")
    int updateById(Vaccine vaccine);
    @Delete("DELETE FROM vaccine WHERE id = #{id}")
    int deleteById(String id);
    @Select("SELECT va.id,va.name,va.antigen,va.unit,va.packing,va.image,ma.name as 'manufacturerName' FROM vaccine as va INNER JOIN manufacturer as ma ON va.manufacturer_id = ma.id")
    List<VaccineResponse> selectAll();
    @Select("SELECT * FROM vaccine WHERE name LIKE CONCAT('%',#{name},'%') OR manufacturer_id = #{manufacturerId}")
    List<Vaccine> selectByNameOrManufacturerId(VaccineSearchRequest request);
    @Select("SELECT * FROM vaccine WHERE id = #{id}")
    Vaccine selectById(String id);
    @Select("SELECT * FROM vaccine WHERE name = #{name}")
    Vaccine selectByName(String name);
}
