package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.example.vaccine.model.Role;
import org.example.vaccine.model.response.VaccineResponse;

import java.util.List;

@Mapper
public interface GeneralMapper {
    @Select("SELECT va.id,manufacturer_id,va.name,image,antigen,packing,unit,description,origin,contraindicated,unwanted_effect,preserve,ma.name as manufacturerName   FROM vaccine as va inner join manufacturer as ma on va.manufacturer_id = ma.id")
    List<VaccineResponse> selectAllVaccine();
    @Select("Select * FROM role")
    List<Role> selectAllRole();

}
