//package com.example.News.Response;
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.apache.tomcat.util.codec.binary.Base64;
//
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//public class NewsDtResponse {
//    private Long newsDtId;
//    private String newsDtTitle;
//    private String newsDtContent;
//    private String newsDtPhoto;
//    private NewsPaperResponse newsPage;
//
//    public NewsDtResponse(Long newsDtId, String newsDtTitle, String newsDtContent, byte[] photoBytes) {
//        this.newsDtId = newsDtId;
//        this.newsDtTitle = newsDtTitle;
//        this.newsDtContent = newsDtContent;
//        this.newsDtPhoto = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
//    }
//}
