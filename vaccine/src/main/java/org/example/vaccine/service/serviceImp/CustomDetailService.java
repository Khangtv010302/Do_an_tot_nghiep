package org.example.vaccine.service.serviceImp;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.example.vaccine.mapper.HealthcareStaffMapper;
import org.example.vaccine.model.HealthcareStaff;
import org.example.vaccine.model.response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomDetailService implements UserDetailsService {
    final HealthcareStaffMapper healthcareStaffMapper;
    @Autowired

    public CustomDetailService(HealthcareStaffMapper healthcareStaffMapper) {
        this.healthcareStaffMapper = healthcareStaffMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserResponse userResponse =healthcareStaffMapper.selectUserByUsername(username);
        if (userResponse == null)
            throw new UsernameNotFoundException("Username Not Found");
        return User.builder()
                .username(userResponse.getUsername())
                .password(userResponse.getPassword())
                .roles(userResponse.getRoleCode()).build();
    }
}
