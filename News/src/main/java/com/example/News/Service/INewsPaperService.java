package com.example.News.Service;

import com.example.News.Exception.InternalServerException;
import com.example.News.Model.NewsPage;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface INewsPaperService {
    NewsPage addNewsPaper(MultipartFile photo, String newsTitle, String newsSummary, String newsCategory, LocalDate postedDate, LocalTime postedTime) throws IOException, SQLException;

    List<String> getAllCategory();

    List<NewsPage> getAllNews();

    byte[] getNewsPhotoByNewsId(Long id) throws SQLException;

    void deleteNews(Long newsId);

    NewsPage updateNews(Long newsId, String newsTitle, String newsSummary, byte[] photoBytes, String newsCategory) throws InternalServerException;

    Optional<NewsPage> getNewsByNewsId(Long newsId);


}
