import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Col, Row } from "react-bootstrap";
import Navbar from '../layout/Navbar';
import { deleteNews, getAllNews } from '../utils/ApiFunctions';
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const NewsDb = () => {
    const [news,setNews] = useState([{id:"",newsTitle:"",newsSummary:"",newsCategory:"",postedDate:"",postedTime:""}])
    const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredNews, setFilteredNews] = useState([
    { id:"",newsTitle:"",newsSummary:"",newsCategory:"",postedDate:"",postedTime:"" },
  ]);
  const [selectedNewsCategories, setSelectedNewsCategories] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  useEffect(()=>{
      fetchNews();
  },[])
  const fetchNews = async ()=>{
      setIsLoading(true)
      try{
        const results = await getAllNews();
        setNews(results);
        setIsLoading(false);
      } catch (error) {
        setErrMsg(error.message);
        setIsLoading(false);
      }
  }

  useEffect(() => {
    if (selectedNewsCategories === "") {
      setFilteredNews(news);
    } else {
      const filtered = news.filter(
        (newsItem) => newsItem.newsCategory === selectedNewsCategories
      );
      setFilteredNews(filtered);
    }
    setCurrentPage(1);
  }, [news, selectedNewsCategories]);

  const calculateTotalPages = (filteredNews, newsPerPage, news) => {
    const totalNews =
      filteredNews.length > 0 ? filteredNews.length : news.length;
    return Math.ceil(totalNews / newsPerPage);
  };
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteNews = async (newsId) => {
    try {
      const result = await deleteNews(newsId);
      if (result === "") {
        setSuccessMsg(`Tin tuc số ${newsId} đã được xóa`);
        fetchRooms();
      } else {
        console.log(`Lỗi xóa tin tuc : ${result.message}`);
      }
    } catch (e) {
      setErrMsg(e.message);
    }
    setTimeout(() => {
      setSuccessMsg("");
      setErrMsg("");
    }, 3000);
  };
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
  return (
    <>
      <div className="container col-md-8 col-lg-6">
        {successMsg && <p className="alert alert-success mt-5">{successMsg}</p>}

        {errMsg && <p className="alert alert-danger mt-5">{errMsg}</p>}
      </div>
      {isLoading ? (
        <p>Dang tai trang</p>
      ) : (
        <>
          <Navbar data={news} setFilteredData={setFilteredNews}/>
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-between mb-3 mt-5">
              <h2>Tin tuc hiện có</h2>
            </div>
            <Row>
              <Col md={6} className="mb-3 mb-md-0">
                
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <Link to={"/add-room"}>
                  <FaPlus />
                  Thêm tin tuc
                </Link>
              </Col>
            </Row>
            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Tieu de</th>
                  <th>Tom tat</th>
                  <th>The loai</th>
                  <th>Ngay dang</th>
                  <th>Gio dang</th>
                  <th>Sửa/Xóa</th>
                  

                </tr>
              </thead>
              <tbody>
                {currentNews.map((news) => (
                  <tr key={news.id} className="text-center">
                    <td>{news.id}</td>
                    <td>{news.newsTitle}</td>
                    <td>{news.newsSummary}</td>
                    <td>{news.newsCategory}</td>
                    <td>{news.postedDate}</td>
                    <td>{news.postedTime}</td>
                    <td className="gap-2">
                      <Link to={`/edit-news/${news.id}`} className="gap-2">
                        <span className="btn btn-warning btn-sm">
                          <FaEdit />
                        </span>
                      </Link>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteNews(news.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
            
          </section>
        </>
      )}
    </>
  )
}

export default NewsDb