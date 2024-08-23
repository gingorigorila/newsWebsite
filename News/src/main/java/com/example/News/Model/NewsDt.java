//package com.example.News.Model;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import java.sql.Blob;
//
//@Entity
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//public class NewsDt {
//    private Long newsDtId;
//    private String newsDtTitle;
//    private String newsDtContent;
//    @Lob
//    private Blob newsDtPhoto;
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "news_id")
//    private NewsPage newsPage;
//
//    public void setNewsPage(NewsPage newsPage) {
//        this.newsPage = newsPage;
//    }
//}
