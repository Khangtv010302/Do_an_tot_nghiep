package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.*;
import org.example.vaccine.model.Vaccine;
import org.example.vaccine.model.request.VaccineRequest;
import org.example.vaccine.model.request.VaccineSearchRequest;
import org.example.vaccine.model.response.VaccineOnlyNameResponse;
import org.example.vaccine.model.response.VaccineResponse;

import java.util.List;

@Mapper
public interface VaccineMapper {
    @Insert("INSERT INTO vaccine(manufacturer_id, name, image, antigen, packing, unit, description, origin, contraindicated, unwanted_effect, preserve)" +
            "value (#{manufacturerId},#{name},#{image},#{antigen},#{packing},#{unit},#{description},#{origin},#{contraindicated},#{unwantedEffect},#{preserve})")
    int insert(VaccineRequest request);

    @Update("UPDATE vaccine SET name=#{name} , image = #{image}, packing = #{packing}, unit = #{unit}, antigen = #{antigen}, description=#{description}, origin = #{origin}, contraindicated = #{contraindicated}, unwanted_effect = #{unwantedEffect}, preserve = #{preserve}, manufacturer_id = #{manufacturerId}  WHERE id = #{id}")
    int updateById(Vaccine vaccine);

    @Delete("DELETE FROM vaccine WHERE id = #{id}")
    int deleteById(String id);

    @Select("SELECT va.id,manufacturer_id,va.name,image,antigen,packing,unit,description,origin,contraindicated,unwanted_effect,preserve,ma.name as manufacturerName   FROM vaccine as va inner join manufacturer as ma on va.manufacturer_id = ma.id")
    List<VaccineResponse> selectAll();
    @Select("SELECT name, id from vaccine")
    List<VaccineOnlyNameResponse> selectAllOnlyName();
    @Select("SELECT * FROM vaccine WHERE name LIKE CONCAT('%',#{name},'%') OR manufacturer_id = #{manufacturerId}")
    List<Vaccine> selectByNameOrManufacturerId(VaccineSearchRequest request);

    @Select("SELECT * FROM vaccine WHERE id = #{id}")
    Vaccine selectById(String id);

    @Select("SELECT * FROM vaccine WHERE name = #{name}")
    Vaccine selectByName(String name);
}
