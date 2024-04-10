import React, { useState, useEffect } from "react";
import './App.css';

const accessKey = process.env.UNSPLASH_API;

const ImageSearchApp = () => {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [showMoreBtnDisplay, setShowMoreBtnDisplay] = useState("none");

  const searchImage = async () => {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    const response = await fetch(url);
    const data = await response.json();
    if (page === 1) {
      setResults(data.results);
    } else {
      setResults((prevResults) => [...prevResults, ...data.results]);
    }
    setShowMoreBtnDisplay("block");
  };

  useEffect(() => {
    searchImage();
  }, [page, keyword]);  

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    searchImage();
  };

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h1>image search engine</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={keyword}
          placeholder="Search something...."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div id="search-result">
        {results.map((result, index) => (
          <img
            key={index}
            src={result.urls.small}
            alt={result.alt_description}
          />
        ))}
      </div>
      <button
        id="show-more-btn"
        style={{ display: showMoreBtnDisplay }}
        onClick={handleShowMore}
      >
        Show More
      </button>
    </div>
  );
};

export default ImageSearchApp;
