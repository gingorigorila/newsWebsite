package com.example.News.Service;

import com.example.News.Exception.InternalServerException;
import com.example.News.Exception.ResourceNotFoundException;
import com.example.News.Model.NewsPage;
import com.example.News.Repository.NewsPaperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NewsPaperService implements INewsPaperService{
    private final NewsPaperRepository newsPaperRepository;

    @Override

    public NewsPage addNewsPaper(MultipartFile file, String newsTitle, String newsSummary, String newsCategory, LocalDate postedDate, LocalTime postedTime) throws IOException, SQLException {
        NewsPage newsPage = new NewsPage();
        newsPage.setNewsTitle(newsTitle);
        newsPage.setNewsSummary(newsSummary);
        newsPage.setNewsCategory(newsCategory);
        newsPage.setPostedDate(postedDate);
        newsPage.setPostedTime(postedTime);
        if(!file.isEmpty()){
            byte[] photoBytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            newsPage.setPhoto(photoBlob);
        }
        return newsPaperRepository.save(newsPage);
    }

    @Override
    public List<String> getAllCategory() {
        return newsPaperRepository.findDistinctCategory();
    }

    @Override
    public List<NewsPage> getAllNews() {
        return newsPaperRepository.findAll();
    }

    @Override
    public byte[] getNewsPhotoByNewsId(Long newsId) throws SQLException {
        Optional<NewsPage> theNews = newsPaperRepository.findById(newsId);
        if(theNews.isEmpty()){
            throw new ResourceNotFoundException("Xin loi, khong the tim thay phong");
        }
        Blob photoBlob = theNews.get().getPhoto();
        if(photoBlob !=null){
            return photoBlob.getBytes(1, (int) photoBlob.length());
        }
        return null;
    }

    @Override
    public void deleteNews(Long newsId) {
        newsPaperRepository.deleteById(newsId);
    }

    @Override
    public NewsPage updateNews(Long newsId, String newsTitle, String newsSummary, byte[] photoBytes, String newsCategory) throws InternalServerException {
        NewsPage newsPage = newsPaperRepository.findById(newsId).get();
        System.out.print(newsPage);
        if (newsTitle != null) newsPage.setNewsTitle(newsTitle);
        if (newsSummary != null) newsPage.setNewsSummary(newsSummary);
        if(newsCategory != null) newsPage.setNewsCategory(newsCategory);

        if (photoBytes != null && photoBytes.length > 0) {
            try {
                newsPage.setPhoto(new SerialBlob(photoBytes));
            } catch (SQLException ex) {
                throw new InternalServerException("Khong the cap nhap thong tin phong");
            }
        }
        return newsPaperRepository.save(newsPage);
    }

    @Override
    public Optional<NewsPage> getNewsByNewsId(Long newsId) {
        return Optional.of(newsPaperRepository.findById(newsId).get());
    }
}
