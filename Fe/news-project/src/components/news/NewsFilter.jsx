import React from 'react'

const NewsFilter = ({data,setFilteredData}) => {
    const [filter, setFilter] = useState("");

  const handleSelectChange = (e) => {
    const selectedCategory = e.target.value;
    setFilter(selectedCategory);
    const filteredNews = data.filter((news) =>
      news.newsCategory.toLowerCase().includes(selectedCategory.toLowerCase())
    );
    setFilteredData(filteredNews);
  };
  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };
  const newsCategories = ["", ...new Set(data.map((news) => news.newsCategory))];
  return (
    <div>NewsFilter</div>
  )
}

export default NewsFilter