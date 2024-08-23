package com.example.News.Exception;

public class PhotoRetrievalException extends RuntimeException {
    public PhotoRetrievalException(String loiTruyXuatHinhAnh) {
        super((loiTruyXuatHinhAnh));
    }
}
