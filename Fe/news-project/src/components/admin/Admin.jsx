import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../layout/Navbar'

const Admin = () => {
  return (
    <section className="container1 mt-5">
    <Navbar/>
      <h2>Trang Admin</h2>
      <hr />
      <div className="link-container">
        <div>Bai bao</div>
        <div className="link-row">
          <Link className="link-button" to={"/add-news"}>
            Thêm tin tuc
          </Link>
          <br />
          <Link className="link-button" to={"/news-db"}>
            Quản lý tin tuc
          </Link>
          <br />
         </div>
    </div>
    </section>
  )
}

export default Admin