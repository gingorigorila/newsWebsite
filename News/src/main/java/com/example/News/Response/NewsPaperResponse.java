package com.example.News.Response;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
public class NewsPaperResponse {
    private Long id;
    private String newsTitle;
    private String newsSummary;
    private String newsCategory;
    private LocalDate postedDate;
    private LocalTime postedTime;
    private String photo;

    public NewsPaperResponse(Long id, String newsTitle, String newsSummary, String newsCategory, LocalDate postedDate, LocalTime postedTime) {
        this.id = id;
        this.newsTitle = newsTitle;
        this.newsSummary = newsSummary;
        this.newsCategory = newsCategory;
        this.postedDate = postedDate;
        this.postedTime = postedTime;
    }



    public NewsPaperResponse(Long id, String newsTitle, String newsSummary,
                             String newsCategory, LocalDate postedDate,
                             LocalTime postedTime, byte[] photoBytes) {
        this.id = id;
        this.newsTitle = newsTitle;
        this.newsSummary = newsSummary;
        this.newsCategory = newsCategory;
        this.postedDate = postedDate;
        this.postedTime = postedTime;
        this.photo = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
    }


    public void add(List<NewsPaperResponse> newsPaperResponse){};
}
