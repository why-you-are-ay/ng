package com.ssafy.ng.api.controller;

import com.ssafy.ng.api.request.CompanyPermitReq;
import com.ssafy.ng.api.request.CompanyPostReq;
import com.ssafy.ng.api.response.CompanyGetRes;
import com.ssafy.ng.api.service.CompanyService;

import com.ssafy.ng.common.customObject.CompanyList;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "기업 API", tags = {"Company"})
@RestController
@RequestMapping("api/v1/company")
@CrossOrigin
public class CompanyController {

    @Autowired
    CompanyService companyService;

    // 기업정보 생성 =====================================================================================================
    @PostMapping("/create/")
    @ApiOperation(value = "기업정보 생성", notes = "주어진 양식에 맞게 기업 정보를 생성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = CompanyGetRes.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> registCom(
            @RequestBody @ApiParam(value = "기업정보", required = true) CompanyPostReq comInfo
//            @RequestPart(required = false) @ApiParam(value = "기업 로고 이미지 파일")MultipartFile file) throws IOException
    ){

        companyService.createCompany(comInfo);
        return new ResponseEntity<>("기업등록이 완료되었습니다", HttpStatus.valueOf(200));
    }

    // 단일기업 정보조회 ==================================================================================================
    @GetMapping("/{comWallet}")
    @ApiOperation(value = "기업정보 조회", notes = "해당하는 기업에 대한 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = CompanyGetRes.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getComInfo(
            @PathVariable @ApiParam(value = "해당 기업의 시퀀스", required = true) String comWallet) {
        return ResponseEntity.status(200).body(companyService.getCompanyByComWallet(comWallet));
    }

    // 승인 요청한 기업 리스트 조회 =========================================================================================
    @GetMapping("/list/")
    @ApiOperation(value = "기업 리스트", notes = "승인 요청한 기업 리스트를 페이지로 불러온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = CompanyList.class)
    })
    public ResponseEntity<?> companyList(
            @RequestBody @ApiParam(value = "기업정보", required = true) Pageable pageable) {
        return ResponseEntity.status(200).body(companyService.comList(pageable));
    }

    // 기업 승인 ========================================================================================================
    @PostMapping("/permit/{comWallet}")
    @ApiOperation(value = "기업 승인여부", notes = "기업 승인여부를 DB에 반영한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "존재하지 않는 지갑주소")
    })
    public ResponseEntity<?> judgePermit(
            @PathVariable @ApiParam(value = "기업 지갑주소", required = true) String comWallet,
            @RequestBody @ApiParam(value = "승인 여부", required = true) CompanyPermitReq permitReq) {
        boolean res = companyService.permitCompany(comWallet, permitReq);
        if (res == false) {
            return new ResponseEntity<>("존재하지 않는 기업입니다.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.valueOf(200));
    }
}
