import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTv, FaUtensils, FaWifi } from "react-icons/fa";
import { IoIosFitness } from "react-icons/io";
const NewsItem = ({ title, description, src }) => {
  return (
    <Col  className="mb-4" xs={12}>
      <Card>
        <Card.Body className="d-flex flex-wrap align-items-center">
          <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
            <Link to={`/book-room/${src}`} className="btn btn-hotel btn-sm">
              <Card.Img
                variant="top"
                alt="Card img"
                src={`data:image/png;base64,${src}`}
                style={{ width: "100%", height: "auto", maxWidth: "200px" }}
              />
            </Link>
          </div>
          <div className="flex-grow-1 ml-3 px-5">
            <Card.Title className="hotel-color">1</Card.Title>
            <Card.Text>Số lượng người ở:1</Card.Text>
            <Card.Text> ⭐ ⭐ ⭐ ⭐ ⭐</Card.Text>
            
            <ul className="list-unstyled sv-list">
              <li>
                <FaWifi />
                Wifi
              </li>
              <li>
                <FaTv />
                Xem phim
              </li>
              <li>
                <FaUtensils />
                Bữa sáng
              </li>
              <li>
                <IoIosFitness />
                Phòng tập
              </li>
            </ul>
            
          </div>
          <div className="pay">
            <Card.Title className="room-price">
              100đ/đêm
            </Card.Title>
            <Link to={`/book-room/${src}`} className="btn btn-hotel btn-sm">
              Book Now
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default NewsItem;
