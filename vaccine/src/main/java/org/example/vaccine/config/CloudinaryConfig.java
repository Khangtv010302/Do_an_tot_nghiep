package org.example.vaccine.config;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Value("${Cloudinary.cloud.name}")
    String cloudName;
    @Value("${Cloudinary.api.key}")
    String apiKey;
    @Value("${Cloudinary.api.secret}")
    String apiSecret;
    @Bean
    public Cloudinary getCloudinary(){
        Map<Object, Object> config = new HashMap<>();
        config.put( "cloud_name", cloudName);
        config.put(  "api_key", apiKey);
        config.put( "api_secret", apiSecret);
        config.put( "secure", true);
        return new Cloudinary(config);
    }
}
