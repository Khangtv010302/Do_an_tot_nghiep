package org.example.vaccine.mapper;

import org.apache.ibatis.annotations.*;
import org.example.vaccine.model.Role;
import org.example.vaccine.model.request.RoleRequest;

import java.util.List;

@Mapper
public interface RoleMapper {
    @Insert("INSERT INTO role (name, code) VALUE (#{name},#{code})")
    int insertRole(RoleRequest request);
    @Update("UPDATE role SET name = #{name}, code = #{code} WHERE id = #{id} ")
    int updateRole (Role role);
    @Delete("DELETE FROM role WHERE id = #{id}")
    int deleteRole (String id);
    @Select("Select * FROM role")
    List<Role> selectAll();
    @Select("SELECT  * FROM role WHERE id =#{id}")
    Role selectById(String id);
}
