import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import NewsCategorySelector from '../common/NewsCategorySelector';
import { getNewsByNewsId, updateNews } from '../utils/ApiFunctions';

const EditNews = () => {
    const [news,setNews] = useState({
        photo: null,
    newsTitle: "",
    newsSummary: "",
    newsCategory: "",
    })
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {newsId} = useParams();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNews({ ...news, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNews({ ...news, [name]: value });
  };
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await getNewsByNewsId(newsId);
        setNews(newsData);
        setImagePreview(newsData.photo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
  }, [newsId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateNews(newsId, news);
      if (response.status === 200) {
        setSuccessMessage("Cập nhập tin tuc thành công!");
        const updatedNewsData = await getNewsByNewsId(newsId);
        setNews(updatedNewsData);
        setImagePreview(updatedNewsData.photo);
        setErrorMessage("");
      } else {
        setErrorMessage("Lỗi cập nhập tin tuc");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };
  return (
    <>
    <section className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mt-5 mb-6">Sua tin tuc </h2>
          {successMessage && (
            <div className="alert alert-success fade show">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger fade show">{errorMessage}</div>
          )}
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="newsTitle" className="form-label">
                Tieu de bai viet
              </label>
              <input
                className="form-control"
                required
                id="newsTitle"
                type="text"
                name="newsTitle"
                value={news.newsTitle}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="newsSummary" className="form-label">
                Tom tat bai viet
              </label>
              <input
                className="form-control"
                required
                id="newsSummary"
                type="text"
                name="newsSummary"
                value={news.newsSummary}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="newsCategory" className="form-label">
                The loai tin tuc
              </label>
              <div>
                <NewsCategorySelector
                  handleNewsInputChange={handleInputChange}
                  newNews={news}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="roomPrice" className="form-label">
                Ảnh tieu de
              </label>
              <input
                className="form-control"
                id="photo"
                name="photo"
                type="file"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={`data:image/jpeg;base64,${imagePreview}`}
                  alt="Preview Room Photo"
                  style={{ maxWidth: "400px", maxHeight: "400px" }}
                  className="mb-3"
                />
              )}
            </div>
            <div className="d-grid gap-2 d-md-flex mt-2">
              <Link
                to={"/news-db"}
                className="btn btn-outline-info ml-5"
              >
                Trở lại
              </Link>
              <button type="submit" className="btn btn-outline-warning">
                Chỉnh sửa
              </button>
              
            </div>
          </form>
        </div>
      </div>
      
    </section>
    
  </>
  )
}

export default EditNews