package com.example.News.Controller;

import com.example.News.Exception.InternalServerException;
import com.example.News.Exception.PhotoRetrievalException;
import com.example.News.Exception.ResourceNotFoundException;
import com.example.News.Model.NewsPage;
import com.example.News.Response.NewsPaperResponse;
import com.example.News.Service.INewsPaperService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/news")

public class NewsPageController {
    private final INewsPaperService newsPaperService;
    @PostMapping("/add/new-news")

    public ResponseEntity<NewsPaperResponse> addNewsPaper(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("newsTitle") String newsTitle,
            @RequestParam("newsSummary") String newsSummary,
            @RequestParam("newsCategory") String newsCategory

            ) throws SQLException, IOException {
        LocalDate postedDate = LocalDate.now();
        LocalTime postedTime =LocalTime.now();


        NewsPage newsPageSaved = newsPaperService.addNewsPaper(photo,newsTitle,newsSummary,newsCategory,postedDate,postedTime);
        NewsPaperResponse newsPaperResponse = new NewsPaperResponse(newsPageSaved.getId(), newsPageSaved.getNewsTitle(),newsPageSaved.getNewsSummary(),newsPageSaved.getNewsCategory(),newsPageSaved.getPostedDate(),newsPageSaved.getPostedTime());
        return ResponseEntity.ok(newsPaperResponse);
    }
    @GetMapping("/category")

    public List<String> getCategory(){
        return newsPaperService.getAllCategory();
    }

    @GetMapping("/all-news")

    public ResponseEntity<List<NewsPaperResponse>> getAllNews() throws SQLException {
        List<NewsPage> newsPages = newsPaperService.getAllNews();
        List<NewsPaperResponse> newsPaperResponses = new ArrayList<>();
        for (NewsPage newsPage : newsPages){
            byte[] photoBytes = newsPaperService.getNewsPhotoByNewsId(newsPage.getId());
            if (photoBytes != null && photoBytes.length > 0) {
                String base64Photo = Base64.encodeBase64String(photoBytes);
                NewsPaperResponse newResponse = getNewResponse(newsPage);
                ;newResponse.setPhoto(base64Photo);
                newsPaperResponses.add(newResponse);
            }
        }
        return ResponseEntity.ok(newsPaperResponses);
    }

    @DeleteMapping("/delete/{newsId}")

    public ResponseEntity<Void> deleteRoom(@PathVariable Long newsId){
        newsPaperService.deleteNews(newsId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update/{newsId}")

    public ResponseEntity<NewsPaperResponse> updateNews(@PathVariable Long newsId,
                                                         MultipartFile photo,
                                                         String newsTitle,
                                                         String newsSummary,
                                                         String newsCategory
                                                        ) throws SQLException, IOException, InternalServerException, InternalServerException, InternalServerException {
        byte[] photoBytes = photo != null && !photo.isEmpty() ?
                photo.getBytes() : newsPaperService.getNewsPhotoByNewsId(newsId);
        Blob photoBlob = photoBytes != null && photoBytes.length >0 ? new SerialBlob(photoBytes): null;
        NewsPage theNews = newsPaperService.updateNews(newsId, newsTitle, newsSummary, photoBytes,newsCategory);
        theNews.setPhoto(photoBlob);
        NewsPaperResponse newsPaperResponse = getNewResponse(theNews);
        return ResponseEntity.ok(newsPaperResponse);
    }

    @GetMapping("/{newsId}")

    public ResponseEntity<Optional<NewsPaperResponse>> getRoomById(@PathVariable Long newsId){
        Optional<NewsPage> theNews = newsPaperService.getNewsByNewsId(newsId);
        return theNews.map(news -> {
            NewsPaperResponse roomResponse = getNewResponse(news);
            return  ResponseEntity.ok(Optional.of(roomResponse));
        }).orElseThrow(() -> new ResourceNotFoundException("Khong tim thay tin tuc"));
    }
    private NewsPaperResponse getNewResponse(NewsPage newsPage) {
        byte[] photoBytes = null;
        Blob photoBlob = newsPage.getPhoto();
        if (photoBlob != null) {
            try {
                photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());
            } catch (SQLException e) {
                throw new PhotoRetrievalException("Loi truy xuat hinh anh");
            }
        }
        return new NewsPaperResponse(newsPage.getId(), newsPage.getNewsTitle(),
                newsPage.getNewsSummary(),newsPage.getNewsCategory(),newsPage.getPostedDate(),newsPage.getPostedTime(),photoBytes);
    }
}
