package com.example.News.Repository;

import com.example.News.Model.NewsPage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NewsPaperRepository extends JpaRepository<NewsPage,Long> {
    @Query("SELECT DISTINCT n.newsCategory from NewsPage n ")
    List<String> findDistinctCategory();
}
