import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { getNewsCategory } from '../utils/ApiFunctions';

const NewsCategorySelector = ({handleNewsInputChange,newNews}) => {
    const [newsCategory,setNewsCategory] = useState([""])
    const [showNewNewsCategoryInput,setShowNewNewsCategoryInput] = useState(false);
    const [newNewsCategory,setNewNewsCategory] = useState("");
    useEffect(()=>{
        getNewsCategory().then((data)=>{
            setNewsCategory(data);
        })
        console.log(showNewNewsCategoryInput);
    },[])
    
    const handleNewNewsCategoryInputChange = (e)=>{
        setNewNewsCategory(e.target.value);
    }

    const handleAddNewNewsCategory = () => {
        if (newNewsCategory !== "") {
          setNewsCategory([...newsCategory, newNewsCategory]);
          setNewNewsCategory("");
          setShowNewNewsCategoryInput(false);
        }
      };
  return (
    <>
      {newsCategory.length > 0 && (
        <div>
          <select
            required
            className="form-select"
            name="newsCategory"
            onChange={(e) => {
              if (e.target.value === "Thêm the loai bai viet moi") {
                setShowNewNewsCategoryInput(true);
              } else {
                handleNewsInputChange(e);
              }
            }}
            // eslint-disable-next-line react/prop-types
            value={newNews.newsCategory}
          >
            <option value={""}>Chọn the loai bai viet</option>
            
              
              <option value={"Thêm the loai bai viet moi"}> Thêm the loai</option>
            
            {newsCategory.map((type, index) => (
                <option key={index} value={type}>
                    {type}
                </option>
            ))}
          </select>
          {showNewNewsCategoryInput && (
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Ghi the loai"
                onChange={handleNewNewsCategoryInputChange}
              />
              <button
                
                type="button"
                onClick={handleAddNewNewsCategory}
              >
                Thêm
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default NewsCategorySelector
