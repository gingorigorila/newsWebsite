import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9192",
});
export const api_chatBot = axios.create({
  baseURL: "http://localhost:8080",
});

export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};
//Ham them tin tuc
export async function addNews(
    photo,
    newsTitle,
    newsSummary,
    newsCategory,
    
  ) {
    console.log("photo", photo);
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("newsTitle", newsTitle);
    formData.append("newsSummary", newsSummary);
    formData.append("newsCategory", newsCategory);
   
    const response = await api.post("/news/add/new-news", formData);
    if (response.status === 201) {
      return true;
    } else {
      return false;
    }
  }
  // Ham lay the loai tin tuc
  export async function getNewsCategory() {
    try {
      const response = await api.get("/news/category");
      return response.data;
    } catch (error) {
      throw new Error("Loi truy xuat the loai tin tuc");
    }
  }

  //Ham lay toan bo tin tuc
export async function getAllNews() {
  try {
    const response = await api.get("/news/all-news");
    return response.data;
  } catch (error) {
    throw new Error("Loi lay toan bo tin tuc");
  }
}

//Ham lay tin tuc theo newsId
export async function getNewsByNewsId(newsId) {
  try {
    const result = await api.get(`/news/${newsId}`, {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Loi lay tin tuc ${error.message}`);
  }
}

//Ham sua thong tin tin tuc
export async function updateNews(newsId, newsData) {
  const formData = new FormData();
  formData.append("photo", newsData.photo);
    formData.append("newsTitle", newsData.newsTitle);
    formData.append("newsSummary", newsData.newsSummary);
    formData.append("newsCategory", newsData.newsCategory);
  const response = await api.put(`/news/update/${newsId}`, formData, {
    headers: getHeader(),
  });
  return response;
}

//Ham xoa tin tuc
export async function deleteNews(newsId) {
  try {
    const result = await api.delete(`/news/delete/${newsId}`, {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Loi xoa tin tuc ${error.message}`);
  }
}


//Ham register
export async function registerUser(registration) {
  try {
    console.log("register", registration);
    const response = await api.post("/auth/register-user", registration);
    return response.data;
  } catch (e) {
    if (e.response && e.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Loi dang ky : ${e.mesage}`);
    }
  }
}
//Ham login
export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login", login);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return "Khong co";
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}

// Ham lay thong tin nguoi dung
export async function getUserProfile(userId, token) {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.get(`users/profile/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

