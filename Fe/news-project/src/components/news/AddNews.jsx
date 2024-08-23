import React from "react";
import { useState } from "react";
import NewsCategorySelector from "../common/NewsCategorySelector";
import { addNews } from "../utils/ApiFunctions";

const AddNews = () => {
  const [newNews, setNewNews] = useState({
    photo: null,
    newsTitle: "",
    newsSummary: "",
    newsCategory: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleNewsInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    setNewNews({ ...newNews, [name]: value });
  };

  const handleImgChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewNews({ ...newNews, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addNews(
        newNews.photo,
        newNews.newsTitle,
        newNews.newsSummary,
        newNews.newsCategory
      );
      if (success !== undefined) {
        setSuccessMsg("Bai bao mới được thêm vào database");
        setNewNews({
          photo: null,
          newsTitle: "",
          newsSummary: "",
          newsCategory: "",
        });
        setImagePreview("");
        setErrMsg("");
      } else {
        setErrMsg("Bai bao không được thêm vào database");
      }
    } catch (e) {
      setErrMsg(e.message);
    }
    setTimeout(() => {
      setSuccessMsg("");
      setErrMsg("");
    }, 3000);
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-6">Thêm tin tuc moi</h2>
            {successMsg && (
              <div className="alert alert-success fade show">{successMsg}</div>
            )}
            {errMsg && (
              <div className="alert alert-danger fade show">{errMsg}</div>
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
                  value={newNews.newsTitle}
                  onChange={handleNewsInputChange}
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
                  value={newNews.newsSummary}
                  onChange={handleNewsInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="newsCategory" className="form-label">
                  The loai tin tuc
                </label>
                <div>
                  <NewsCategorySelector
                    handleNewsInputChange={handleNewsInputChange}
                    newNews={newNews}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="roomPrice" className="form-label">
                  Ảnh tieu de
                </label>
                <input
                  required
                  className="form-control"
                  id="photo"
                  name="photo"
                  type="file"
                  onChange={handleImgChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview Room Photo"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mb-3"
                  />
                )}
              </div>
              <div className="d-grid d-md-flex mt-2">
                <button className="btn btn-outline-primary ml-5">
                  Lưu tin tức
                </button>
              </div>
            </form>
          </div>
        </div>
        
      </section>
      
    </>
  );
};

export default AddNews;
