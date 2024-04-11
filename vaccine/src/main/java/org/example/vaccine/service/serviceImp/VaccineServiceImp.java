package org.example.vaccine.service.serviceImp;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.example.vaccine.base.CommonResponseCode;
import org.example.vaccine.base.ResponseBase;
import org.example.vaccine.base.ResponseData;
import org.example.vaccine.base.ResponseHandle;
import org.example.vaccine.mapper.VaccineMapper;
import org.example.vaccine.model.Vaccine;
import org.example.vaccine.model.request.VaccineRequest;
import org.example.vaccine.model.request.VaccineSearchRequest;
import org.example.vaccine.service.VaccineService;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class VaccineServiceImp implements VaccineService {
    private final VaccineMapper vaccineMapper;
    private final ResponseHandle handle;
    private final Cloudinary cloudinary;
    @Override
    public ResponseEntity<ResponseBase> insert(VaccineRequest request,MultipartFile multipartFile) {
        try {
            if(vaccineMapper.selectByName(request.getName()) != null)
                return ResponseEntity.status(CommonResponseCode.EXISTING.getHttp()).body(new ResponseBase(CommonResponseCode.EXISTING));
            var data = cloudinary.uploader().upload(multipartFile.getBytes(),Map.of());
            String image = data.get("url").toString();
            request.setImage(image);
            CommonResponseCode code = handle.response(vaccineMapper.insert(request));
            return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase(2,"Upload images failed"));
        }
    }

    @Override
    public ResponseEntity<ResponseBase> updateById(Vaccine vaccine,MultipartFile file) {
        if(file == null || file.isEmpty()) {
            CommonResponseCode code = handle.response(vaccineMapper.updateById(vaccine));
            return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
        }
        try {
            delete(vaccine.getImage());
           var data = cloudinary.uploader().upload(file.getBytes(), Map.of());
           String image = data.get("url").toString();
           vaccine.setImage(image);
           CommonResponseCode code = handle.response(vaccineMapper.updateById(vaccine));
           return ResponseEntity.status(code.getHttp()).body(new ResponseBase(code));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase(2,"Upload images failed"));
        }
    }

    @Override
    public ResponseEntity<ResponseBase> deleteById(String id) {
        Vaccine vaccine= vaccineMapper.selectById(id);
        if (vaccine == null)
            return ResponseEntity.status(CommonResponseCode.NO_FOUND.getHttp()).body(new ResponseBase(CommonResponseCode.NO_FOUND));
        CommonResponseCode code = handle.response(vaccineMapper.deleteById(id));
        delete(vaccine.getImage());
        return ResponseEntity.ok(new ResponseBase(code));
    }

    @Override
    public ResponseEntity<ResponseBase> selectAll() {
        List<Vaccine> vaccineList = vaccineMapper.selectAll();
        if (vaccineList.isEmpty())
            return ResponseEntity.status(CommonResponseCode.NO_FOUND.getHttp()).body(new ResponseBase(CommonResponseCode.NO_FOUND));
        return ResponseEntity.ok().body(new ResponseData<>(vaccineList));
    }

    @Override
    public ResponseEntity<ResponseBase> selectByNameOrManufacturerId(VaccineSearchRequest request) {
        List<Vaccine> vaccineList = vaccineMapper.selectByNameOrManufacturerId(request);
        if (vaccineList.isEmpty())
            return ResponseEntity.status(CommonResponseCode.NO_FOUND.getHttp()).body(new ResponseBase(CommonResponseCode.NO_FOUND));
        return ResponseEntity.ok().body(new ResponseData<>(vaccineList));
    }

    @Override
    public ResponseEntity<ResponseBase> selectById(String id) {
        Vaccine vaccine = vaccineMapper.selectById(id);
        if (vaccine == null )
            return ResponseEntity.status(CommonResponseCode.NO_FOUND.getHttp()).body(new ResponseBase(CommonResponseCode.NO_FOUND));
        return ResponseEntity.ok().body(new ResponseData<>(vaccine));
    }
    public Object delete(String url) {
        try {
            String[] parts = url.split("/");
            String imageNameWithExtension = parts[parts.length - 1];
            String[] imageNameParts = imageNameWithExtension.split("\\.");
            String imageName = imageNameParts[0];
            var result = cloudinary.uploader().destroy(imageName, ObjectUtils.emptyMap());
            return result.get("result");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseBase(2,"Delete image failed"));
        }
    }
}
