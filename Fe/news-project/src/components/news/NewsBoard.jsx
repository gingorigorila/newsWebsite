import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../layout/Navbar";
import { getAllNews } from "../utils/ApiFunctions";

const NewsBoard = ({ category }) => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([{ id: "" }]);

  useEffect(() => {
    setIsLoading(true);
    getAllNews()
      .then((data) => {
        setData(data);
        
        setFilteredData(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setErr(e);
        setIsLoading(false);
      });
  }, []);

  
  if (isLoading) {
    return <div>Dang tai trang</div>;
  }
  if (err) {
    return <div classNameName="text-danger">Error :{err}</div>;
  }
  return (
    <>
    <Navbar data={data} setFilteredData={setFilteredData}/>
    <div className="container my-5">
      <div className="row text-center">
      {
        filteredData.map((news,index)=>{
           return (
          <div className="col my-3">
          <div className="card" style={{width: "18rem"}}>
          <img src={`data:image/png;base64,${news.photo}`} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{news.newsTitle}</h5>
            <p className="card-text">{news.newsSummary}</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
          </div>
         )})
      }
      </div>
    </div>
    </>
  );
};

export default NewsBoard;
