package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.example.vaccine.model.Role;
import org.example.vaccine.model.response.HistoryResponse;
import org.example.vaccine.model.response.VaccineOnlyNameResponse;
import org.example.vaccine.model.response.VaccineResponse;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface GeneralMapper {
    @Select("SELECT va.id,manufacturer_id,va.name,image,antigen,packing,unit,description,origin,contraindicated,unwanted_effect,preserve,ma.name as manufacturerName   FROM vaccine as va inner join manufacturer as ma on va.manufacturer_id = ma.id")
    List<VaccineResponse> selectAllVaccine();
    @Select("SELECT va.id,va.name FROM vaccine")
    List<VaccineOnlyNameResponse> selectAllVaccineName();
    @Select("Select * FROM role")
    List<Role> selectAllRole();
    @Select("SELECT oi.id,ob.fullname as object_name,va.name as vaccine_name,month_old,vaccination_date,vaccination_location,state, " +
            "   reaction,lot_number,quantity from object_injection as oi JOIN vaccine as va ON oi.vaccine_id = va.id JOIN object as ob" +
            "   ON oi.object_id = ob.id WHERE oi.vaccination_date >= #{fromDate} AND oi.vaccination_date <= #{toDate} AND (reaction is NULL OR reaction ='' )AND state = #{state}")
    List<HistoryResponse> selectObjectInjectionFromDateToDateReactionFalse(LocalDate fromDate,LocalDate toDate,Boolean state);
    @Select("SELECT oi.id,ob.fullname as object_name,va.name as vaccine_name,month_old,vaccination_date,vaccination_location,state, " +
            "   reaction,lot_number,quantity from object_injection as oi JOIN vaccine as va ON oi.vaccine_id = va.id JOIN object as ob" +
            "   ON oi.object_id = ob.id WHERE oi.vaccination_date >= #{fromDate} AND oi.vaccination_date <= #{toDate} AND (reaction is  NOT NULL AND reaction <>'') AND state = #{state}")
    List<HistoryResponse> selectObjectInjectionFromDateToDateReactionTrue(LocalDate fromDate,LocalDate toDate,Boolean state);

}
