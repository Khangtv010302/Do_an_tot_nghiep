package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.Mapper;

import org.apache.ibatis.annotations.Select;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface StatisticalMapper {
    @Select("SELECT COUNT(DISTINCT ob.fullname) as numberObject  FROM object_injection as oi INNER JOIN object as ob ON oi.object_id = ob.id " +
            "WHERE state=true AND vaccination_date >= #{fromDate} AND vaccination_date <= #{toDate} AND lot_number IS NOT NULL ")
    int numberObjectInjected(LocalDate fromDate,LocalDate toDate);
    @Select("SELECT id as String FROM receive_deliver WHERE date_receiving <> (SELECT MAX(date_receiving)" +
            " FROM receive_deliver WHERE date_receiving >= #{fromDate} AND date_receiving <= #{toDate}) " +
            " AND date_receiving >= #{fromDate} AND date_receiving <= #{toDate}")
    List<String> getIdReceiverFromDateToDate (LocalDate fromDate,LocalDate toDate);

    @Select("SELECT SUM(diff) AS numberVaccine FROM ( SELECT (quantity_receiving - quantity_delivering) AS diff FROM receive_deliver_detail" +
            " WHERE receive_deliver_id =#{id} AND quantity_delivering < quantity_receiving AND expired_date > curdate()) AS subquery")
    int numberOldVaccine(String id);
    @Select("SELECT COALESCE(SUM(diff), 0) AS numberVaccine FROM ( SELECT (quantity_receiving - quantity_delivering) AS diff FROM receive_deliver_detail" +
            " WHERE receive_deliver_id = (SELECT id FROM receive_deliver WHERE date_receiving = ( SELECT MAX(date_receiving) FROM receive_deliver " +
            " WHERE date_receiving >= #{fromDate} AND date_receiving <= #{toDate})) AND quantity_delivering < quantity_receiving) AS subquery")
    int numberNewVaccine (LocalDate fromDate,LocalDate toDate);
    @Select("SELECT COUNT(*) FROM object_injection WHERE vaccination_date >= #{fromDate} AND vaccination_date <= #{toDate} AND lot_number IS NOT NULL")
    int numberVaccineInjected(LocalDate fromDate,LocalDate toDate);
    @Select("SELECT COUNT(*) FROM object_injection WHERE vaccination_date >= #{fromDate} AND vaccination_date <= #{toDate} AND reaction IS NOT NULL  AND lot_number IS NOT NULL")
    int numberObjectReaction(LocalDate fromDate,LocalDate toDate);

    //asd
    @Select("SELECT COUNT(DISTINCT ob.fullname) as numberObject  FROM object_injection as oi INNER JOIN object as ob ON oi.object_id = ob.id " +
            "WHERE state=true AND vaccination_date >= #{fromDate} AND vaccination_date <= #{toDate} AND vaccine_id=#{vaccineId} AND lot_number IS NOT NULL")
    int numberObjectInjectedByVaccineId(LocalDate fromDate,LocalDate toDate,String vaccineId);
    @Select("SELECT COALESCE(SUM(diff), 0) AS numberVaccine FROM ( SELECT (quantity_receiving - quantity_delivering) AS diff FROM receive_deliver_detail" +
            " WHERE receive_deliver_id =#{id} AND quantity_delivering < quantity_receiving AND expired_date > curdate() AND vaccine_id =#{vaccineId}) AS subquery")
    int numberOldVaccineByVaccineId(String id,String vaccineId);
    @Select("SELECT COALESCE(SUM(diff), 0) AS numberVaccine FROM ( SELECT (quantity_receiving - quantity_delivering) AS diff FROM receive_deliver_detail" +
            " WHERE receive_deliver_id = (SELECT id FROM receive_deliver WHERE date_receiving = ( SELECT MAX(date_receiving) FROM receive_deliver " +
            " WHERE date_receiving >= #{fromDate} AND date_receiving <= #{toDate}))AND vaccine_id = #{vaccineId} AND quantity_delivering < quantity_receiving) AS subquery")
    int numberNewVaccineByVaccineId (LocalDate fromDate,LocalDate toDate,String vaccineId);
    @Select("SELECT SUM(rdd.quantity_delivering) FROM receive_deliver as rd JOIN receive_deliver_detail as rdd ON rd.id = rdd.receive_deliver_id" +
            " WHERE rd.date_receiving BETWEEN #{fromDate} AND #{toDate} AND vaccine_id =#{vaccineId}" +
            " GROUP BY vaccine_id;")
    int numberVaccineInjectedByVaccineId(LocalDate fromDate,LocalDate toDate,String vaccineId);
    @Select("SELECT COUNT(*) FROM object_injection WHERE vaccination_date >= #{fromDate}  AND vaccine_id = #{vaccineId} AND vaccination_date <= #{toDate} AND reaction IS NOT NULL AND lot_number IS NOT NULL")
    int numberObjectReactionByVaccineId(LocalDate fromDate,LocalDate toDate,String vaccineId);
}
